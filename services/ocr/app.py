import os
import io
import base64
import logging
from typing import List, Dict, Any, Optional
from pathlib import Path

import uvicorn
import structlog
from fastapi import FastAPI, File, UploadFile, HTTPException, Form, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
import numpy as np
from PIL import Image
import cv2

from paddleocr import PaddleOCR, PPStructureV3
from utils.image_processor import ImageProcessor
from utils.text_analyzer import TechnicalTextAnalyzer

# Configure structured logging
structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.UnicodeDecoder(),
        structlog.processors.JSONRenderer()
    ],
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
    wrapper_class=structlog.stdlib.BoundLogger,
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger()

# Initialize FastAPI app
app = FastAPI(
    title="BoltDB OCR Service",
    description="PaddleOCR-powered text extraction service for technical drawings and component specifications",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OCR models
ocr_models = {}
image_processor = ImageProcessor()
text_analyzer = TechnicalTextAnalyzer()

def get_ocr_model(language: str = "en", use_gpu: bool = False) -> PaddleOCR:
    """Get or create OCR model for specified language."""
    key = f"{language}_{use_gpu}"
    if key not in ocr_models:
        logger.info("Initializing OCR model", language=language, use_gpu=use_gpu)
        ocr_models[key] = PaddleOCR(
            use_angle_cls=True,
            lang=language,
            use_gpu=use_gpu,
            show_log=False,
            use_doc_orientation_classify=True,
            use_doc_unwarping=True,
            use_textline_orientation=True
        )
    return ocr_models[key]

def get_structure_model(use_gpu: bool = False) -> PPStructureV3:
    """Get or create PP-StructureV3 model for document parsing."""
    key = f"structure_{use_gpu}"
    if key not in ocr_models:
        logger.info("Initializing PP-StructureV3 model", use_gpu=use_gpu)
        ocr_models[key] = PPStructureV3(
            use_doc_orientation_classify=True,
            use_doc_unwarping=True,
            use_gpu=use_gpu,
            show_log=False
        )
    return ocr_models[key]

# Pydantic models
class OCRRequest(BaseModel):
    image_base64: str = Field(..., description="Base64 encoded image")
    language: str = Field(default="en", description="OCR language")
    enhance_image: bool = Field(default=True, description="Apply image enhancement")
    extract_technical_info: bool = Field(default=True, description="Extract technical specifications")

class OCRResult(BaseModel):
    text: str = Field(..., description="Extracted text")
    confidence: float = Field(..., description="Average confidence score")
    bounding_boxes: List[Dict[str, Any]] = Field(..., description="Text bounding boxes with coordinates")
    technical_specs: Optional[Dict[str, Any]] = Field(None, description="Extracted technical specifications")
    processing_time: float = Field(..., description="Processing time in seconds")

class StructureResult(BaseModel):
    markdown: str = Field(..., description="Document structure as markdown")
    layout_elements: List[Dict[str, Any]] = Field(..., description="Detected layout elements")
    tables: List[Dict[str, Any]] = Field(default_factory=list, description="Extracted tables")
    processing_time: float = Field(..., description="Processing time in seconds")

class HealthResponse(BaseModel):
    status: str = Field(..., description="Service status")
    models_loaded: List[str] = Field(..., description="Loaded OCR models")
    version: str = Field(..., description="Service version")

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="healthy",
        models_loaded=list(ocr_models.keys()),
        version="1.0.0"
    )

@app.post("/ocr/extract", response_model=OCRResult)
async def extract_text(
    file: Optional[UploadFile] = File(None),
    image_base64: Optional[str] = Form(None),
    language: str = Form("en"),
    enhance_image: bool = Form(True),
    extract_technical_info: bool = Form(True),
    use_gpu: bool = Form(False)
):
    """Extract text from uploaded image or base64 data."""
    import time
    start_time = time.time()
    
    try:
        # Get image data
        if file:
            image_data = await file.read()
            image = Image.open(io.BytesIO(image_data))
        elif image_base64:
            # Remove data URL prefix if present
            if image_base64.startswith('data:image'):
                image_base64 = image_base64.split(',')[1]
            image_data = base64.b64decode(image_base64)
            image = Image.open(io.BytesIO(image_data))
        else:
            raise HTTPException(status_code=400, detail="No image provided")

        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Convert PIL image to numpy array
        img_array = np.array(image)
        
        # Apply image enhancement if requested
        if enhance_image:
            img_array = image_processor.enhance_technical_drawing(img_array)
        
        # Get OCR model
        ocr = get_ocr_model(language=language, use_gpu=use_gpu)
        
        # Perform OCR
        logger.info("Starting OCR processing", language=language, enhance_image=enhance_image)
        result = ocr.predict(img_array)
        
        # Process results
        extracted_text = []
        bounding_boxes = []
        confidences = []
        
        for res in result:
            if hasattr(res, 'rec_texts') and hasattr(res, 'rec_scores') and hasattr(res, 'dt_polys'):
                for text, score, poly in zip(res.rec_texts, res.rec_scores, res.dt_polys):
                    if text.strip():  # Only include non-empty text
                        extracted_text.append(text)
                        confidences.append(float(score))
                        
                        # Convert polygon to bounding box
                        x_coords = [point[0] for point in poly]
                        y_coords = [point[1] for point in poly]
                        bbox = {
                            "text": text,
                            "confidence": float(score),
                            "coordinates": {
                                "x_min": int(min(x_coords)),
                                "y_min": int(min(y_coords)),
                                "x_max": int(max(x_coords)),
                                "y_max": int(max(y_coords))
                            },
                            "polygon": [[int(point[0]), int(point[1])] for point in poly]
                        }
                        bounding_boxes.append(bbox)
        
        # Calculate average confidence
        avg_confidence = sum(confidences) / len(confidences) if confidences else 0.0
        
        # Join all text
        full_text = " ".join(extracted_text)
        
        # Extract technical specifications if requested
        technical_specs = None
        if extract_technical_info and full_text:
            technical_specs = text_analyzer.extract_technical_specifications(full_text)
        
        processing_time = time.time() - start_time
        
        logger.info(
            "OCR processing completed",
            text_length=len(full_text),
            confidence=avg_confidence,
            processing_time=processing_time
        )
        
        return OCRResult(
            text=full_text,
            confidence=avg_confidence,
            bounding_boxes=bounding_boxes,
            technical_specs=technical_specs,
            processing_time=processing_time
        )
        
    except Exception as e:
        logger.error("OCR processing failed", error=str(e), exc_info=True)
        raise HTTPException(status_code=500, detail=f"OCR processing failed: {str(e)}")

@app.post("/ocr/structure", response_model=StructureResult)
async def extract_structure(
    file: Optional[UploadFile] = File(None),
    image_base64: Optional[str] = Form(None),
    use_gpu: bool = Form(False)
):
    """Extract document structure using PP-StructureV3."""
    import time
    start_time = time.time()
    
    try:
        # Get image data
        if file:
            image_data = await file.read()
            image = Image.open(io.BytesIO(image_data))
        elif image_base64:
            if image_base64.startswith('data:image'):
                image_base64 = image_base64.split(',')[1]
            image_data = base64.b64decode(image_base64)
            image = Image.open(io.BytesIO(image_data))
        else:
            raise HTTPException(status_code=400, detail="No image provided")

        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Convert PIL image to numpy array
        img_array = np.array(image)
        
        # Get structure model
        structure_model = get_structure_model(use_gpu=use_gpu)
        
        # Perform structure analysis
        logger.info("Starting structure analysis")
        result = structure_model.predict(img_array)
        
        # Process results
        markdown_content = ""
        layout_elements = []
        tables = []
        
        for res in result:
            if hasattr(res, 'save_to_markdown'):
                # Save markdown to string
                import tempfile
                with tempfile.NamedTemporaryFile(mode='w', suffix='.md', delete=False) as tmp:
                    res.save_to_markdown(tmp.name)
                    with open(tmp.name, 'r', encoding='utf-8') as f:
                        markdown_content = f.read()
                    os.unlink(tmp.name)
            
            # Extract layout information if available
            if hasattr(res, 'layout_det_res') and res.layout_det_res:
                layout_info = res.layout_det_res
                if hasattr(layout_info, 'boxes'):
                    for box in layout_info.boxes:
                        element = {
                            "type": box.get("label", "unknown"),
                            "confidence": box.get("score", 0.0),
                            "coordinates": box.get("coordinate", [])
                        }
                        layout_elements.append(element)
        
        processing_time = time.time() - start_time
        
        logger.info(
            "Structure analysis completed",
            elements_found=len(layout_elements),
            processing_time=processing_time
        )
        
        return StructureResult(
            markdown=markdown_content,
            layout_elements=layout_elements,
            tables=tables,
            processing_time=processing_time
        )
        
    except Exception as e:
        logger.error("Structure analysis failed", error=str(e), exc_info=True)
        raise HTTPException(status_code=500, detail=f"Structure analysis failed: {str(e)}")

@app.post("/ocr/batch")
async def batch_process(
    files: List[UploadFile] = File(...),
    language: str = Form("en"),
    enhance_image: bool = Form(True),
    extract_technical_info: bool = Form(True),
    use_gpu: bool = Form(False)
):
    """Process multiple images in batch."""
    results = []
    
    for file in files:
        try:
            # Process each file
            image_data = await file.read()
            image = Image.open(io.BytesIO(image_data))
            
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            img_array = np.array(image)
            
            if enhance_image:
                img_array = image_processor.enhance_technical_drawing(img_array)
            
            ocr = get_ocr_model(language=language, use_gpu=use_gpu)
            result = ocr.predict(img_array)
            
            # Process results (simplified for batch)
            extracted_text = []
            confidences = []
            
            for res in result:
                if hasattr(res, 'rec_texts') and hasattr(res, 'rec_scores'):
                    for text, score in zip(res.rec_texts, res.rec_scores):
                        if text.strip():
                            extracted_text.append(text)
                            confidences.append(float(score))
            
            avg_confidence = sum(confidences) / len(confidences) if confidences else 0.0
            full_text = " ".join(extracted_text)
            
            technical_specs = None
            if extract_technical_info and full_text:
                technical_specs = text_analyzer.extract_technical_specifications(full_text)
            
            results.append({
                "filename": file.filename,
                "text": full_text,
                "confidence": avg_confidence,
                "technical_specs": technical_specs,
                "status": "success"
            })
            
        except Exception as e:
            logger.error("Batch processing failed for file", filename=file.filename, error=str(e))
            results.append({
                "filename": file.filename,
                "error": str(e),
                "status": "failed"
            })
    
    return {"results": results}

@app.get("/models/languages")
async def get_supported_languages():
    """Get list of supported OCR languages."""
    # This is a subset of languages supported by PaddleOCR
    languages = {
        "en": "English",
        "ch": "Chinese (Simplified)",
        "chinese_cht": "Chinese (Traditional)",
        "fr": "French",
        "german": "German",
        "japan": "Japanese",
        "korean": "Korean",
        "it": "Italian",
        "es": "Spanish",
        "pt": "Portuguese",
        "ru": "Russian",
        "ar": "Arabic",
        "hi": "Hindi"
    }
    return {"supported_languages": languages}

if __name__ == "__main__":
    # Configure logging
    logging.basicConfig(level=logging.INFO)
    
    # Run the application
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8080,
        log_level="info",
        access_log=True
    )
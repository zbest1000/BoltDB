import cv2
import numpy as np
from typing import Tuple, Optional
import logging

logger = logging.getLogger(__name__)

class ImageProcessor:
    """Image processing utilities for technical drawings and component images."""
    
    def __init__(self):
        self.logger = logger
    
    def enhance_technical_drawing(self, image: np.ndarray) -> np.ndarray:
        """
        Enhance technical drawings for better OCR accuracy.
        
        Args:
            image: Input image as numpy array
            
        Returns:
            Enhanced image as numpy array
        """
        try:
            # Convert to grayscale if needed
            if len(image.shape) == 3:
                gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
            else:
                gray = image.copy()
            
            # Apply noise reduction
            denoised = cv2.fastNlMeansDenoising(gray)
            
            # Enhance contrast using CLAHE
            clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
            enhanced = clahe.apply(denoised)
            
            # Apply morphological operations to clean up text
            kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 1))
            cleaned = cv2.morphologyEx(enhanced, cv2.MORPH_CLOSE, kernel)
            
            # Convert back to RGB for consistency
            if len(image.shape) == 3:
                result = cv2.cvtColor(cleaned, cv2.COLOR_GRAY2RGB)
            else:
                result = cleaned
                
            return result
            
        except Exception as e:
            self.logger.error(f"Image enhancement failed: {e}")
            return image
    
    def preprocess_for_text_detection(self, image: np.ndarray) -> np.ndarray:
        """
        Preprocess image specifically for text detection.
        
        Args:
            image: Input image as numpy array
            
        Returns:
            Preprocessed image
        """
        try:
            # Convert to grayscale
            if len(image.shape) == 3:
                gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
            else:
                gray = image.copy()
            
            # Apply Gaussian blur to reduce noise
            blurred = cv2.GaussianBlur(gray, (3, 3), 0)
            
            # Apply adaptive thresholding
            thresh = cv2.adaptiveThreshold(
                blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
            )
            
            # Convert back to RGB
            if len(image.shape) == 3:
                result = cv2.cvtColor(thresh, cv2.COLOR_GRAY2RGB)
            else:
                result = thresh
                
            return result
            
        except Exception as e:
            self.logger.error(f"Text detection preprocessing failed: {e}")
            return image
    
    def correct_skew(self, image: np.ndarray, max_skew: float = 10.0) -> np.ndarray:
        """
        Correct skew in scanned documents.
        
        Args:
            image: Input image
            max_skew: Maximum skew angle to correct (degrees)
            
        Returns:
            Skew-corrected image
        """
        try:
            # Convert to grayscale
            if len(image.shape) == 3:
                gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
            else:
                gray = image.copy()
            
            # Apply edge detection
            edges = cv2.Canny(gray, 50, 150, apertureSize=3)
            
            # Detect lines using Hough transform
            lines = cv2.HoughLines(edges, 1, np.pi/180, threshold=100)
            
            if lines is not None:
                # Calculate skew angle
                angles = []
                for rho, theta in lines[:10]:  # Use first 10 lines
                    angle = theta * 180 / np.pi - 90
                    if abs(angle) <= max_skew:
                        angles.append(angle)
                
                if angles:
                    skew_angle = np.median(angles)
                    
                    # Rotate image to correct skew
                    h, w = image.shape[:2]
                    center = (w // 2, h // 2)
                    rotation_matrix = cv2.getRotationMatrix2D(center, skew_angle, 1.0)
                    
                    corrected = cv2.warpAffine(
                        image, rotation_matrix, (w, h),
                        flags=cv2.INTER_CUBIC,
                        borderMode=cv2.BORDER_REPLICATE
                    )
                    
                    return corrected
            
            return image
            
        except Exception as e:
            self.logger.error(f"Skew correction failed: {e}")
            return image
    
    def enhance_contrast(self, image: np.ndarray, alpha: float = 1.5, beta: int = 10) -> np.ndarray:
        """
        Enhance image contrast and brightness.
        
        Args:
            image: Input image
            alpha: Contrast control (1.0-3.0)
            beta: Brightness control (0-100)
            
        Returns:
            Enhanced image
        """
        try:
            enhanced = cv2.convertScaleAbs(image, alpha=alpha, beta=beta)
            return enhanced
            
        except Exception as e:
            self.logger.error(f"Contrast enhancement failed: {e}")
            return image
    
    def remove_noise(self, image: np.ndarray, kernel_size: int = 3) -> np.ndarray:
        """
        Remove noise from image using morphological operations.
        
        Args:
            image: Input image
            kernel_size: Size of morphological kernel
            
        Returns:
            Denoised image
        """
        try:
            # Convert to grayscale if needed
            if len(image.shape) == 3:
                gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
            else:
                gray = image.copy()
            
            # Create morphological kernel
            kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (kernel_size, kernel_size))
            
            # Apply opening to remove noise
            opened = cv2.morphologyEx(gray, cv2.MORPH_OPEN, kernel)
            
            # Apply closing to fill gaps
            closed = cv2.morphologyEx(opened, cv2.MORPH_CLOSE, kernel)
            
            # Convert back to original format
            if len(image.shape) == 3:
                result = cv2.cvtColor(closed, cv2.COLOR_GRAY2RGB)
            else:
                result = closed
                
            return result
            
        except Exception as e:
            self.logger.error(f"Noise removal failed: {e}")
            return image
    
    def resize_for_ocr(self, image: np.ndarray, target_height: int = 1024) -> np.ndarray:
        """
        Resize image to optimal size for OCR processing.
        
        Args:
            image: Input image
            target_height: Target height in pixels
            
        Returns:
            Resized image
        """
        try:
            h, w = image.shape[:2]
            
            # Calculate new dimensions maintaining aspect ratio
            if h > target_height:
                ratio = target_height / h
                new_w = int(w * ratio)
                new_h = target_height
                
                resized = cv2.resize(image, (new_w, new_h), interpolation=cv2.INTER_AREA)
                return resized
            
            return image
            
        except Exception as e:
            self.logger.error(f"Image resizing failed: {e}")
            return image
    
    def sharpen_image(self, image: np.ndarray) -> np.ndarray:
        """
        Sharpen image to improve text clarity.
        
        Args:
            image: Input image
            
        Returns:
            Sharpened image
        """
        try:
            # Define sharpening kernel
            kernel = np.array([[-1, -1, -1],
                             [-1,  9, -1],
                             [-1, -1, -1]])
            
            sharpened = cv2.filter2D(image, -1, kernel)
            return sharpened
            
        except Exception as e:
            self.logger.error(f"Image sharpening failed: {e}")
            return image
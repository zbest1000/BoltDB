import re
import logging
from typing import Dict, List, Any, Optional, Tuple
from dataclasses import dataclass

logger = logging.getLogger(__name__)

@dataclass
class TechnicalSpec:
    """Data class for technical specifications."""
    name: str
    value: str
    unit: Optional[str] = None
    confidence: float = 0.0

class TechnicalTextAnalyzer:
    """Analyzer for extracting technical specifications from OCR text."""
    
    def __init__(self):
        self.logger = logger
        self._init_patterns()
    
    def _init_patterns(self):
        """Initialize regex patterns for technical specification extraction."""
        
        # Fastener thread patterns
        self.thread_patterns = [
            r'M(\d+(?:\.\d+)?)\s*[xX×]\s*(\d+(?:\.\d+)?)',  # M8 x 25, M10×30
            r'(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)\s*UNC',        # 1/4-20 UNC
            r'(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)\s*UNF',        # 1/4-28 UNF
            r'#(\d+)-(\d+(?:\.\d+)?)',                       # #8-32
            r'(\d+(?:\.\d+)?)\s*mm\s*[xX×]\s*(\d+(?:\.\d+)?)', # 8mm x 25
        ]
        
        # Material patterns
        self.material_patterns = [
            r'stainless\s+steel\s*(\d+)?',
            r'carbon\s+steel',
            r'alloy\s+steel',
            r'brass',
            r'aluminum',
            r'zinc\s+plated?',
            r'galvanized',
            r'titanium',
            r'inconel',
            r'hastelloy',
        ]
        
        # Dimension patterns
        self.dimension_patterns = [
            r'(\d+(?:\.\d+)?)\s*mm',           # 25mm
            r'(\d+(?:\.\d+)?)\s*cm',           # 2.5cm
            r'(\d+(?:\.\d+)?)\s*in(?:ch)?',    # 1in, 1inch
            r'(\d+(?:\.\d+)?)\s*"',            # 1"
            r'(\d+(?:\.\d+)?)\s*\'',           # 1'
            r'Ø\s*(\d+(?:\.\d+)?)',            # Ø8
            r'diameter\s*[:\-]?\s*(\d+(?:\.\d+)?)', # diameter: 8
            r'length\s*[:\-]?\s*(\d+(?:\.\d+)?)',   # length: 25
        ]
        
        # Standard patterns
        self.standard_patterns = [
            r'ISO\s*(\d+)',
            r'DIN\s*(\d+)',
            r'ANSI\s*[\w\-\.]+',
            r'ASME\s*[\w\-\.]+',
            r'JIS\s*[\w\-\.]+',
            r'BS\s*(\d+)',
            r'EN\s*(\d+)',
        ]
        
        # Head type patterns
        self.head_type_patterns = [
            r'hex\s+head',
            r'socket\s+head',
            r'cap\s+head',
            r'button\s+head',
            r'flat\s+head',
            r'pan\s+head',
            r'round\s+head',
            r'countersunk',
            r'fillister',
        ]
        
        # Drive type patterns
        self.drive_patterns = [
            r'phillips',
            r'slotted',
            r'torx',
            r'hex\s+socket',
            r'allen',
            r'robertson',
            r'pozidriv',
        ]
        
        # Strength/grade patterns
        self.strength_patterns = [
            r'grade\s*(\d+(?:\.\d+)?)',
            r'class\s*(\d+(?:\.\d+)?)',
            r'(\d+(?:\.\d+)?)\s*mpa',
            r'(\d+(?:\.\d+)?)\s*ksi',
            r'proof\s+load\s*[:\-]?\s*(\d+(?:\.\d+)?)',
        ]
    
    def extract_technical_specifications(self, text: str) -> Dict[str, Any]:
        """
        Extract technical specifications from OCR text.
        
        Args:
            text: Input text from OCR
            
        Returns:
            Dictionary containing extracted specifications
        """
        if not text or not text.strip():
            return {}
        
        # Normalize text
        normalized_text = self._normalize_text(text)
        
        specs = {
            'threads': self._extract_threads(normalized_text),
            'materials': self._extract_materials(normalized_text),
            'dimensions': self._extract_dimensions(normalized_text),
            'standards': self._extract_standards(normalized_text),
            'head_types': self._extract_head_types(normalized_text),
            'drive_types': self._extract_drive_types(normalized_text),
            'strength_grades': self._extract_strength_grades(normalized_text),
            'part_numbers': self._extract_part_numbers(normalized_text),
            'quantities': self._extract_quantities(normalized_text),
        }
        
        # Remove empty categories
        specs = {k: v for k, v in specs.items() if v}
        
        # Add confidence score
        specs['confidence'] = self._calculate_confidence(specs)
        
        return specs
    
    def _normalize_text(self, text: str) -> str:
        """Normalize text for better pattern matching."""
        # Convert to lowercase for case-insensitive matching
        normalized = text.lower()
        
        # Replace common OCR errors
        replacements = {
            '0': 'o',  # Sometimes O is read as 0
            'l': '1',  # Sometimes 1 is read as l
            '×': 'x',  # Normalize multiplication symbols
            '–': '-',  # Normalize dashes
            '—': '-',
        }
        
        for old, new in replacements.items():
            normalized = normalized.replace(old, new)
        
        # Clean up whitespace
        normalized = re.sub(r'\s+', ' ', normalized).strip()
        
        return normalized
    
    def _extract_threads(self, text: str) -> List[Dict[str, Any]]:
        """Extract thread specifications."""
        threads = []
        
        for pattern in self.thread_patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                if 'M' in pattern:  # Metric thread
                    diameter = match.group(1)
                    pitch_or_length = match.group(2)
                    threads.append({
                        'type': 'metric',
                        'diameter': f"M{diameter}",
                        'pitch_or_length': pitch_or_length,
                        'full_spec': match.group(0)
                    })
                elif 'UNC' in pattern or 'UNF' in pattern:  # Imperial thread
                    diameter = match.group(1)
                    pitch = match.group(2)
                    thread_type = 'UNC' if 'UNC' in match.group(0) else 'UNF'
                    threads.append({
                        'type': 'imperial',
                        'diameter': diameter,
                        'pitch': pitch,
                        'thread_class': thread_type,
                        'full_spec': match.group(0)
                    })
        
        return threads
    
    def _extract_materials(self, text: str) -> List[str]:
        """Extract material specifications."""
        materials = []
        
        for pattern in self.material_patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                material = match.group(0).strip()
                if material not in materials:
                    materials.append(material)
        
        return materials
    
    def _extract_dimensions(self, text: str) -> List[Dict[str, Any]]:
        """Extract dimensional specifications."""
        dimensions = []
        
        for pattern in self.dimension_patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                value = match.group(1) if match.lastindex >= 1 else match.group(0)
                unit = self._extract_unit_from_match(match.group(0))
                
                dimensions.append({
                    'value': float(value) if value.replace('.', '').isdigit() else value,
                    'unit': unit,
                    'full_spec': match.group(0)
                })
        
        return dimensions
    
    def _extract_standards(self, text: str) -> List[str]:
        """Extract standard specifications."""
        standards = []
        
        for pattern in self.standard_patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                standard = match.group(0).strip()
                if standard not in standards:
                    standards.append(standard)
        
        return standards
    
    def _extract_head_types(self, text: str) -> List[str]:
        """Extract head type specifications."""
        head_types = []
        
        for pattern in self.head_type_patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                head_type = match.group(0).strip()
                if head_type not in head_types:
                    head_types.append(head_type)
        
        return head_types
    
    def _extract_drive_types(self, text: str) -> List[str]:
        """Extract drive type specifications."""
        drive_types = []
        
        for pattern in self.drive_patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                drive_type = match.group(0).strip()
                if drive_type not in drive_types:
                    drive_types.append(drive_type)
        
        return drive_types
    
    def _extract_strength_grades(self, text: str) -> List[Dict[str, Any]]:
        """Extract strength/grade specifications."""
        grades = []
        
        for pattern in self.strength_patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                if match.lastindex >= 1:
                    value = match.group(1)
                    grade_type = self._determine_grade_type(match.group(0))
                    grades.append({
                        'value': value,
                        'type': grade_type,
                        'full_spec': match.group(0)
                    })
        
        return grades
    
    def _extract_part_numbers(self, text: str) -> List[str]:
        """Extract part numbers."""
        # Pattern for common part number formats
        part_patterns = [
            r'[A-Z]{2,}\d+[A-Z]*\d*',  # ABC123, ABC123D4
            r'\d{3,}-\d{3,}',          # 123-456
            r'[A-Z]\d{4,}',            # A1234
        ]
        
        part_numbers = []
        for pattern in part_patterns:
            matches = re.finditer(pattern, text)
            for match in matches:
                part_num = match.group(0).strip()
                if len(part_num) >= 4 and part_num not in part_numbers:
                    part_numbers.append(part_num)
        
        return part_numbers
    
    def _extract_quantities(self, text: str) -> List[Dict[str, Any]]:
        """Extract quantity specifications."""
        quantity_patterns = [
            r'qty\s*[:\-]?\s*(\d+)',
            r'quantity\s*[:\-]?\s*(\d+)',
            r'(\d+)\s*pcs?',
            r'(\d+)\s*pieces?',
            r'pack\s+of\s+(\d+)',
        ]
        
        quantities = []
        for pattern in quantity_patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                qty = match.group(1)
                quantities.append({
                    'value': int(qty),
                    'unit': 'pieces',
                    'full_spec': match.group(0)
                })
        
        return quantities
    
    def _extract_unit_from_match(self, match_text: str) -> str:
        """Extract unit from matched text."""
        if 'mm' in match_text:
            return 'mm'
        elif 'cm' in match_text:
            return 'cm'
        elif 'in' in match_text or '"' in match_text:
            return 'inches'
        elif "'" in match_text:
            return 'feet'
        return ''
    
    def _determine_grade_type(self, match_text: str) -> str:
        """Determine the type of grade/strength specification."""
        text_lower = match_text.lower()
        if 'grade' in text_lower:
            return 'grade'
        elif 'class' in text_lower:
            return 'class'
        elif 'mpa' in text_lower:
            return 'tensile_strength_mpa'
        elif 'ksi' in text_lower:
            return 'tensile_strength_ksi'
        elif 'proof' in text_lower:
            return 'proof_load'
        return 'unknown'
    
    def _calculate_confidence(self, specs: Dict[str, Any]) -> float:
        """Calculate confidence score based on extracted specifications."""
        # Simple confidence calculation based on number of extracted specs
        total_categories = 8  # Number of main categories
        filled_categories = sum(1 for v in specs.values() if v and v != [])
        
        base_confidence = filled_categories / total_categories
        
        # Boost confidence if we found thread specifications (most important for fasteners)
        if specs.get('threads'):
            base_confidence += 0.2
        
        # Boost confidence if we found materials
        if specs.get('materials'):
            base_confidence += 0.1
        
        # Cap at 1.0
        return min(1.0, base_confidence)
    
    def format_specifications(self, specs: Dict[str, Any]) -> str:
        """Format specifications into human-readable text."""
        if not specs:
            return "No technical specifications extracted."
        
        formatted = []
        
        if specs.get('threads'):
            thread_info = specs['threads'][0]  # Take first thread spec
            formatted.append(f"Thread: {thread_info.get('full_spec', 'Unknown')}")
        
        if specs.get('materials'):
            formatted.append(f"Material: {', '.join(specs['materials'])}")
        
        if specs.get('dimensions'):
            dims = [f"{d['value']}{d['unit']}" for d in specs['dimensions']]
            formatted.append(f"Dimensions: {', '.join(dims)}")
        
        if specs.get('standards'):
            formatted.append(f"Standards: {', '.join(specs['standards'])}")
        
        if specs.get('head_types'):
            formatted.append(f"Head Type: {', '.join(specs['head_types'])}")
        
        if specs.get('drive_types'):
            formatted.append(f"Drive Type: {', '.join(specs['drive_types'])}")
        
        return '\n'.join(formatted) if formatted else "No technical specifications extracted."
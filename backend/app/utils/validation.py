"""
Validation utility functions for SOBRE - Premium Healthy Cocktails
"""

import re
from typing import Optional


def validate_email(email: str) -> bool:
    """Validate email format using regex"""
    if not email or not isinstance(email, str):
        return False
    
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_pattern, email.strip()) is not None


def validate_phone(phone: str) -> bool:
    """Validate phone number format (flexible for international numbers)"""
    if not phone or not isinstance(phone, str):
        return False
    
    # Remove all non-digit characters except + for international prefix
    cleaned_phone = re.sub(r'[^\d+]', '', phone.strip())
    
    # Check if it's a valid length (7-15 digits, optionally starting with +)
    phone_pattern = r'^\+?[\d]{7,15}$'
    return re.match(phone_pattern, cleaned_phone) is not None


def validate_required_fields(data: dict, required_fields: list) -> Optional[str]:
    """Validate that all required fields are present and not empty"""
    for field in required_fields:
        if field not in data or not data[field] or (isinstance(data[field], str) and not data[field].strip()):
            return f'Missing or empty required field: {field}'
    return None


def sanitize_string(text: str, max_length: Optional[int] = None) -> str:
    """Sanitize string input by stripping whitespace and limiting length"""
    if not text or not isinstance(text, str):
        return ''
    
    sanitized = text.strip()
    
    if max_length and len(sanitized) > max_length:
        sanitized = sanitized[:max_length]
    
    return sanitized


def validate_date_format(date_string: str) -> bool:
    """Validate date format (YYYY-MM-DD)"""
    if not date_string or not isinstance(date_string, str):
        return False
    
    date_pattern = r'^\d{4}-\d{2}-\d{2}$'
    return re.match(date_pattern, date_string.strip()) is not None


def validate_time_format(time_string: str) -> bool:
    """Validate time format (HH:MM)"""
    if not time_string or not isinstance(time_string, str):
        return False
    
    time_pattern = r'^([01]?[0-9]|2[0-3]):[0-5][0-9]$'
    return re.match(time_pattern, time_string.strip()) is not None


def validate_positive_integer(value) -> bool:
    """Validate that a value is a positive integer"""
    try:
        int_value = int(value)
        return int_value > 0
    except (ValueError, TypeError):
        return False


def validate_slug(slug: str) -> bool:
    """Validate slug format (lowercase letters, numbers, hyphens only)"""
    if not slug or not isinstance(slug, str):
        return False
    
    slug_pattern = r'^[a-z0-9-]+$'
    return re.match(slug_pattern, slug.strip()) is not None


def validate_coordinates(latitude: float, longitude: float) -> bool:
    """Validate geographic coordinates"""
    try:
        lat = float(latitude)
        lng = float(longitude)
        return -90 <= lat <= 90 and -180 <= lng <= 180
    except (ValueError, TypeError):
        return False


def validate_rating(rating) -> bool:
    """Validate rating is between 1 and 5"""
    try:
        rating_value = int(rating)
        return 1 <= rating_value <= 5
    except (ValueError, TypeError):
        return False

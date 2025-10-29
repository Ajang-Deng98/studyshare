from django.core.exceptions import ValidationError
import os

def validate_file_size(file):
    """Validate file size - max 10MB"""
    max_size = 10 * 1024 * 1024  # 10MB
    if file.size > max_size:
        raise ValidationError(f'File size cannot exceed 10MB. Current size: {file.size / (1024*1024):.1f}MB')

def validate_file_extension(file):
    """Validate file extension"""
    allowed_extensions = ['.pdf', '.docx', '.doc', '.txt', '.jpg', '.jpeg', '.png', '.gif', '.mp4', '.avi', '.mov']
    ext = os.path.splitext(file.name)[1].lower()
    if ext not in allowed_extensions:
        raise ValidationError(f'File type {ext} not allowed. Allowed types: {", ".join(allowed_extensions)}')
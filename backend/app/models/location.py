"""
Location and Contact models for SOBRE - Premium Healthy Cocktails
"""

from datetime import datetime
from app import db
from sqlalchemy.dialects.postgresql import JSON


class Location(db.Model):
    """Model for business location information"""
    __tablename__ = 'locations'
    
    id = db.Column(db.Integer, primary_key=True)
    
    # Basic information
    name = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.Text)
    
    # Address information
    street_address = db.Column(db.String(200), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    postal_code = db.Column(db.String(20), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    
    # Geographic coordinates
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    
    # Contact information
    phone = db.Column(db.String(20))
    email = db.Column(db.String(120))
    website = db.Column(db.String(200))
    
    # Business hours (JSON format for flexibility)
    business_hours = db.Column(JSON)  # e.g., {"monday": {"open": "10:00", "close": "22:00", "closed": false}}
    
    # Social media links
    social_media = db.Column(JSON)  # e.g., {"facebook": "url", "instagram": "url", "twitter": "url"}
    
    # Additional information
    parking_info = db.Column(db.Text)
    public_transport_info = db.Column(db.Text)
    driving_directions = db.Column(db.Text)
    
    # Status
    is_active = db.Column(db.Boolean, default=True)
    is_primary = db.Column(db.Boolean, default=False)
    
    # Metadata
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Location {self.name} - {self.city}>'
    
    def to_dict(self):
        """Convert model to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'description': self.description,
            'street_address': self.street_address,
            'city': self.city,
            'postal_code': self.postal_code,
            'country': self.country,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'phone': self.phone,
            'email': self.email,
            'website': self.website,
            'business_hours': self.business_hours,
            'social_media': self.social_media,
            'parking_info': self.parking_info,
            'public_transport_info': self.public_transport_info,
            'driving_directions': self.driving_directions,
            'is_active': self.is_active,
            'is_primary': self.is_primary,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class ContactInquiry(db.Model):
    """Model for general contact form inquiries"""
    __tablename__ = 'contact_inquiries'
    
    id = db.Column(db.Integer, primary_key=True)
    
    # Contact information
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    
    # Inquiry details
    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    inquiry_type = db.Column(db.String(50), default='general')  # general, support, partnership, media, etc.
    
    # Status tracking
    status = db.Column(db.String(20), default='new')  # new, read, responded, resolved, archived
    priority = db.Column(db.String(10), default='normal')  # low, normal, high, urgent
    
    # Location reference (if inquiry is location-specific)
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'), nullable=True)
    location = db.relationship('Location', backref=db.backref('inquiries', lazy=True))
    
    # Admin response
    admin_response = db.Column(db.Text)
    responded_at = db.Column(db.DateTime)
    responded_by = db.Column(db.String(100))
    
    # Metadata
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # User agent and IP for tracking (optional)
    user_agent = db.Column(db.String(500))
    ip_address = db.Column(db.String(45))
    
    def __repr__(self):
        return f'<ContactInquiry {self.name} - {self.subject}>'
    
    def to_dict(self):
        """Convert model to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'subject': self.subject,
            'message': self.message,
            'inquiry_type': self.inquiry_type,
            'status': self.status,
            'priority': self.priority,
            'location_id': self.location_id,
            'admin_response': self.admin_response,
            'responded_at': self.responded_at.isoformat() if self.responded_at else None,
            'responded_by': self.responded_by,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

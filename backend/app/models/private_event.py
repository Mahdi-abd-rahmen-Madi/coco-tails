"""
Private Event models for SOBRE - Premium Healthy Cocktails
"""

from datetime import datetime
from app import db
from sqlalchemy.dialects.postgresql import JSON


class PrivateEventInquiry(db.Model):
    """Model for private event inquiries"""
    __tablename__ = 'private_event_inquiries'
    
    id = db.Column(db.Integer, primary_key=True)
    
    # Event details
    event_type = db.Column(db.String(50), nullable=False)
    event_date = db.Column(db.Date, nullable=False)
    event_time = db.Column(db.Time, nullable=False)
    number_of_guests = db.Column(db.Integer, nullable=False)
    drink_categories = db.Column(JSON)  # Array of selected drink categories
    dietary_requirements = db.Column(db.Text)
    
    # Contact information
    contact_name = db.Column(db.String(100), nullable=False)
    contact_email = db.Column(db.String(120), nullable=False)
    contact_phone = db.Column(db.String(20), nullable=False)
    message = db.Column(db.Text)
    
    # Status tracking
    status = db.Column(db.String(20), default='pending')  # pending, contacted, quoted, booked, completed, cancelled
    priority = db.Column(db.String(10), default='normal')  # low, normal, high, urgent
    
    # Metadata
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Admin notes
    admin_notes = db.Column(db.Text)
    estimated_quote = db.Column(db.Decimal(10, 2))
    
    def __repr__(self):
        return f'<PrivateEventInquiry {self.contact_name} - {self.event_type} on {self.event_date}>'
    
    def to_dict(self):
        """Convert model to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'event_type': self.event_type,
            'event_date': self.event_date.isoformat() if self.event_date else None,
            'event_time': self.event_time.strftime('%H:%M') if self.event_time else None,
            'number_of_guests': self.number_of_guests,
            'drink_categories': self.drink_categories,
            'dietary_requirements': self.dietary_requirements,
            'contact_name': self.contact_name,
            'contact_email': self.contact_email,
            'contact_phone': self.contact_phone,
            'message': self.message,
            'status': self.status,
            'priority': self.priority,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'admin_notes': self.admin_notes,
            'estimated_quote': float(self.estimated_quote) if self.estimated_quote else None
        }


class EventPackage(db.Model):
    """Model for event packages and pricing"""
    __tablename__ = 'event_packages'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    slug = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.Text)
    price_per_person = db.Column(db.Decimal(10, 2), nullable=False)
    
    # Package features
    features = db.Column(JSON)  # Array of features included
    max_guests = db.Column(db.Integer)
    min_guests = db.Column(db.Integer, default=1)
    service_hours = db.Column(db.Integer, default=2)
    
    # Package details
    cocktail_count = db.Column(db.Integer)
    includes_bartender = db.Column(db.Boolean, default=True)
    includes_ingredients = db.Column(db.Boolean, default=True)
    includes_equipment = db.Column(db.Boolean, default=True)
    custom_menu_design = db.Column(db.Boolean, default=False)
    
    # Status and ordering
    is_active = db.Column(db.Boolean, default=True)
    is_featured = db.Column(db.Boolean, default=False)
    sort_order = db.Column(db.Integer, default=0)
    
    # Metadata
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<EventPackage {self.name} - €{self.price_per_person}/person>'
    
    def to_dict(self):
        """Convert model to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'description': self.description,
            'price_per_person': float(self.price_per_person),
            'features': self.features,
            'max_guests': self.max_guests,
            'min_guests': self.min_guests,
            'service_hours': self.service_hours,
            'cocktail_count': self.cocktail_count,
            'includes_bartender': self.includes_bartender,
            'includes_ingredients': self.includes_ingredients,
            'includes_equipment': self.includes_equipment,
            'custom_menu_design': self.custom_menu_design,
            'is_active': self.is_active,
            'is_featured': self.is_featured,
            'sort_order': self.sort_order,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class EventTestimonial(db.Model):
    """Model for event testimonials"""
    __tablename__ = 'event_testimonials'
    
    id = db.Column(db.Integer, primary_key=True)
    client_name = db.Column(db.String(100), nullable=False)
    client_role = db.Column(db.String(100))
    client_company = db.Column(db.String(100))
    
    # Testimonial content
    content = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, default=5)  # 1-5 stars
    event_type = db.Column(db.String(50))
    event_date = db.Column(db.Date)
    
    # Display settings
    is_featured = db.Column(db.Boolean, default=False)
    is_approved = db.Column(db.Boolean, default=False)
    display_order = db.Column(db.Integer, default=0)
    
    # Metadata
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<EventTestimonial {self.client_name} - {self.rating} stars>'
    
    def to_dict(self):
        """Convert model to dictionary for JSON serialization"""
        return {
            'id': self.id,
            'client_name': self.client_name,
            'client_role': self.client_role,
            'client_company': self.client_company,
            'content': self.content,
            'rating': self.rating,
            'event_type': self.event_type,
            'event_date': self.event_date.isoformat() if self.event_date else None,
            'is_featured': self.is_featured,
            'is_approved': self.is_approved,
            'display_order': self.display_order,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

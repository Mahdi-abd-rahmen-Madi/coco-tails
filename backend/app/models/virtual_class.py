from datetime import datetime
from app import db

class VirtualClass(db.Model):
    """Virtual mixology class model"""
    __tablename__ = 'virtual_classes'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    
    # Class details
    instructor_name = db.Column(db.String(100), nullable=False)
    instructor_bio = db.Column(db.Text)
    instructor_image_url = db.Column(db.String(255))
    
    # Scheduling
    scheduled_datetime = db.Column(db.DateTime, nullable=False)
    duration_minutes = db.Column(db.Integer, nullable=False, default=60)
    timezone = db.Column(db.String(50), default='UTC')
    
    # Capacity and pricing
    max_participants = db.Column(db.Integer, default=20)
    price = db.Column(db.Float, default=0.0)  # 0 for free classes
    currency = db.Column(db.String(3), default='USD')
    
    # Class content
    difficulty_level = db.Column(db.String(20), default='beginner')
    cocktails_featured = db.Column(db.JSON)  # Array of cocktail IDs
    ingredients_needed = db.Column(db.JSON)  # Array of ingredient IDs
    equipment_needed = db.Column(db.JSON)  # Array of equipment items
    
    # Virtual meeting details
    meeting_platform = db.Column(db.String(50), default='zoom')  # zoom, teams, etc.
    meeting_url = db.Column(db.String(500))
    meeting_id = db.Column(db.String(100))
    meeting_password = db.Column(db.String(50))
    
    # Content and media
    image_url = db.Column(db.String(255))
    promo_video_url = db.Column(db.String(255))
    class_recording_url = db.Column(db.String(255))
    
    # Class materials
    recipe_pdf_url = db.Column(db.String(255))
    shopping_list_url = db.Column(db.String(255))
    preparation_notes = db.Column(db.Text)
    
    # Status and settings
    status = db.Column(db.String(20), default='scheduled')  # scheduled, live, completed, cancelled
    is_premium = db.Column(db.Boolean, default=False)
    is_recorded = db.Column(db.Boolean, default=True)
    is_featured = db.Column(db.Boolean, default=False)
    
    # SEO and marketing
    meta_title = db.Column(db.String(60))
    meta_description = db.Column(db.String(160))
    tags = db.Column(db.JSON)  # Array of tags for categorization
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    bookings = db.relationship('ClassBooking', backref='virtual_class', lazy='dynamic')
    
    def to_dict(self, include_meeting_details=False):
        """Convert virtual class to dictionary"""
        data = {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'instructor_name': self.instructor_name,
            'instructor_bio': self.instructor_bio,
            'instructor_image_url': self.instructor_image_url,
            'scheduled_datetime': self.scheduled_datetime.isoformat() if self.scheduled_datetime else None,
            'duration_minutes': self.duration_minutes,
            'timezone': self.timezone,
            'max_participants': self.max_participants,
            'price': self.price,
            'currency': self.currency,
            'difficulty_level': self.difficulty_level,
            'cocktails_featured': self.cocktails_featured or [],
            'ingredients_needed': self.ingredients_needed or [],
            'equipment_needed': self.equipment_needed or [],
            'image_url': self.image_url,
            'promo_video_url': self.promo_video_url,
            'status': self.status,
            'is_premium': self.is_premium,
            'is_recorded': self.is_recorded,
            'is_featured': self.is_featured,
            'tags': self.tags or [],
            'current_participants': self.bookings.filter_by(status='confirmed').count(),
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
        
        if include_meeting_details:
            data.update({
                'meeting_platform': self.meeting_platform,
                'meeting_url': self.meeting_url,
                'meeting_id': self.meeting_id,
                'meeting_password': self.meeting_password,
                'recipe_pdf_url': self.recipe_pdf_url,
                'shopping_list_url': self.shopping_list_url,
                'preparation_notes': self.preparation_notes
            })
            
        return data
    
    def is_full(self):
        """Check if class is at capacity"""
        confirmed_bookings = self.bookings.filter_by(status='confirmed').count()
        return confirmed_bookings >= self.max_participants
    
    def spots_remaining(self):
        """Calculate remaining spots"""
        confirmed_bookings = self.bookings.filter_by(status='confirmed').count()
        return max(0, self.max_participants - confirmed_bookings)
    
    def __repr__(self):
        return f'<VirtualClass {self.title}>'

class ClassBooking(db.Model):
    """Model for user bookings of virtual classes"""
    __tablename__ = 'class_bookings'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    virtual_class_id = db.Column(db.Integer, db.ForeignKey('virtual_classes.id'), nullable=False)
    
    # Booking details
    status = db.Column(db.String(20), default='pending')  # pending, confirmed, cancelled, completed
    booking_reference = db.Column(db.String(20), unique=True, nullable=False)
    
    # Payment information
    stripe_payment_intent_id = db.Column(db.String(100))
    amount_paid = db.Column(db.Float, default=0.0)
    currency = db.Column(db.String(3), default='USD')
    
    # Attendance tracking
    attended = db.Column(db.Boolean, default=False)
    attendance_duration_minutes = db.Column(db.Integer)
    
    # Feedback
    rating = db.Column(db.Integer)  # 1-5 stars
    feedback = db.Column(db.Text)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    cancelled_at = db.Column(db.DateTime)
    
    def to_dict(self):
        """Convert booking to dictionary"""
        return {
            'id': self.id,
            'booking_reference': self.booking_reference,
            'status': self.status,
            'amount_paid': self.amount_paid,
            'currency': self.currency,
            'attended': self.attended,
            'attendance_duration_minutes': self.attendance_duration_minutes,
            'rating': self.rating,
            'feedback': self.feedback,
            'virtual_class': self.virtual_class.to_dict() if self.virtual_class else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def generate_booking_reference(self):
        """Generate unique booking reference"""
        import string
        import random
        
        chars = string.ascii_uppercase + string.digits
        while True:
            ref = ''.join(random.choice(chars) for _ in range(8))
            if not ClassBooking.query.filter_by(booking_reference=ref).first():
                return ref
    
    def __repr__(self):
        return f'<ClassBooking {self.booking_reference}>'

from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token
from app import db

class User(db.Model):
    """User model for authentication and profile management"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    
    # Profile information
    phone = db.Column(db.String(20))
    date_of_birth = db.Column(db.Date)
    dietary_preferences = db.Column(db.JSON)  # Store as JSON array
    health_goals = db.Column(db.JSON)  # Store wellness goals
    
    # Account status
    is_active = db.Column(db.Boolean, default=True)
    is_verified = db.Column(db.Boolean, default=False)
    is_premium = db.Column(db.Boolean, default=False)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    
    # Relationships
    subscriptions = db.relationship('Subscription', backref='user', lazy='dynamic')
    favorite_cocktails = db.relationship('Cocktail', secondary='user_favorite_cocktails', 
                                       backref=db.backref('favorited_by', lazy='dynamic'))
    class_bookings = db.relationship('ClassBooking', backref='user', lazy='dynamic')
    
    def set_password(self, password):
        """Hash and set password"""
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        """Check if provided password matches hash"""
        return check_password_hash(self.password_hash, password)
    
    def generate_tokens(self):
        """Generate JWT access and refresh tokens"""
        access_token = create_access_token(identity=self.id)
        refresh_token = create_refresh_token(identity=self.id)
        return {
            'access_token': access_token,
            'refresh_token': refresh_token
        }
    
    def to_dict(self, include_sensitive=False):
        """Convert user to dictionary"""
        data = {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'dietary_preferences': self.dietary_preferences or [],
            'health_goals': self.health_goals or [],
            'is_active': self.is_active,
            'is_verified': self.is_verified,
            'is_premium': self.is_premium,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None
        }
        
        if include_sensitive:
            data['date_of_birth'] = self.date_of_birth.isoformat() if self.date_of_birth else None
            
        return data
    
    def __repr__(self):
        return f'<User {self.username}>'

# Association table for user favorite cocktails
user_favorite_cocktails = db.Table('user_favorite_cocktails',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('cocktail_id', db.Integer, db.ForeignKey('cocktails.id'), primary_key=True),
    db.Column('created_at', db.DateTime, default=datetime.utcnow)
)

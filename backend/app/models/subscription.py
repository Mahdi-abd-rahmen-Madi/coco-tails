from datetime import datetime, timedelta
from app import db

class Subscription(db.Model):
    """Subscription model for premium service plans"""
    __tablename__ = 'subscriptions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Subscription details
    plan_type = db.Column(db.String(20), nullable=False)  # basic, premium, elite
    status = db.Column(db.String(20), default='active')  # active, paused, cancelled, expired
    
    # Billing information
    stripe_subscription_id = db.Column(db.String(100), unique=True)
    stripe_customer_id = db.Column(db.String(100))
    monthly_price = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(3), default='USD')
    
    # Subscription period
    start_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end_date = db.Column(db.DateTime)
    next_billing_date = db.Column(db.DateTime)
    trial_end_date = db.Column(db.DateTime)
    
    # Subscription features
    monthly_ingredient_credits = db.Column(db.Integer, default=0)
    virtual_class_credits = db.Column(db.Integer, default=0)
    premium_recipes_access = db.Column(db.Boolean, default=False)
    personal_mixologist_access = db.Column(db.Boolean, default=False)
    
    # Usage tracking
    ingredients_used_this_month = db.Column(db.Integer, default=0)
    classes_attended_this_month = db.Column(db.Integer, default=0)
    last_reset_date = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    cancelled_at = db.Column(db.DateTime)
    
    # Relationships
    deliveries = db.relationship('SubscriptionDelivery', backref='subscription', lazy='dynamic')
    
    def to_dict(self):
        """Convert subscription to dictionary"""
        return {
            'id': self.id,
            'plan_type': self.plan_type,
            'status': self.status,
            'monthly_price': self.monthly_price,
            'currency': self.currency,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'next_billing_date': self.next_billing_date.isoformat() if self.next_billing_date else None,
            'trial_end_date': self.trial_end_date.isoformat() if self.trial_end_date else None,
            'monthly_ingredient_credits': self.monthly_ingredient_credits,
            'virtual_class_credits': self.virtual_class_credits,
            'premium_recipes_access': self.premium_recipes_access,
            'personal_mixologist_access': self.personal_mixologist_access,
            'ingredients_used_this_month': self.ingredients_used_this_month,
            'classes_attended_this_month': self.classes_attended_this_month,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def is_active(self):
        """Check if subscription is currently active"""
        return self.status == 'active' and (not self.end_date or self.end_date > datetime.utcnow())
    
    def days_remaining(self):
        """Calculate days remaining in subscription"""
        if not self.end_date:
            return None
        delta = self.end_date - datetime.utcnow()
        return max(0, delta.days)
    
    def reset_monthly_usage(self):
        """Reset monthly usage counters"""
        self.ingredients_used_this_month = 0
        self.classes_attended_this_month = 0
        self.last_reset_date = datetime.utcnow()
    
    def __repr__(self):
        return f'<Subscription {self.user_id}:{self.plan_type}>'

class SubscriptionDelivery(db.Model):
    """Model for tracking subscription deliveries"""
    __tablename__ = 'subscription_deliveries'
    
    id = db.Column(db.Integer, primary_key=True)
    subscription_id = db.Column(db.Integer, db.ForeignKey('subscriptions.id'), nullable=False)
    
    # Delivery details
    delivery_date = db.Column(db.DateTime, nullable=False)
    tracking_number = db.Column(db.String(100))
    status = db.Column(db.String(20), default='pending')  # pending, shipped, delivered, failed
    
    # Contents
    ingredients_included = db.Column(db.JSON)  # Array of ingredient IDs and quantities
    recipes_included = db.Column(db.JSON)  # Array of cocktail IDs
    total_value = db.Column(db.Float)
    
    # Shipping information
    shipping_address = db.Column(db.JSON)
    carrier = db.Column(db.String(50))
    estimated_delivery = db.Column(db.DateTime)
    actual_delivery = db.Column(db.DateTime)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convert delivery to dictionary"""
        return {
            'id': self.id,
            'delivery_date': self.delivery_date.isoformat() if self.delivery_date else None,
            'tracking_number': self.tracking_number,
            'status': self.status,
            'ingredients_included': self.ingredients_included or [],
            'recipes_included': self.recipes_included or [],
            'total_value': self.total_value,
            'carrier': self.carrier,
            'estimated_delivery': self.estimated_delivery.isoformat() if self.estimated_delivery else None,
            'actual_delivery': self.actual_delivery.isoformat() if self.actual_delivery else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<SubscriptionDelivery {self.id}>'

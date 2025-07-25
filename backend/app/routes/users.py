from flask import request, jsonify
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import Schema, fields as ma_fields, validate, ValidationError
from app import db
from app.models.user import User
from app.models.cocktail import Cocktail

# Create namespace for users
users_ns = Namespace('users', description='User profile operations')

# Marshmallow schemas for validation
class UserUpdateSchema(Schema):
    first_name = ma_fields.Str(validate=validate.Length(min=1, max=50))
    last_name = ma_fields.Str(validate=validate.Length(min=1, max=50))
    phone = ma_fields.Str(validate=validate.Length(max=20))
    dietary_preferences = ma_fields.List(ma_fields.Str())
    health_goals = ma_fields.List(ma_fields.Str())

# Flask-RESTX models for Swagger documentation
user_update_model = users_ns.model('UserUpdate', {
    'first_name': fields.String(description='First name'),
    'last_name': fields.String(description='Last name'),
    'phone': fields.String(description='Phone number'),
    'dietary_preferences': fields.List(fields.String, description='Dietary preferences'),
    'health_goals': fields.List(fields.String, description='Health and wellness goals')
})

user_profile_model = users_ns.model('UserProfile', {
    'id': fields.Integer(description='User ID'),
    'email': fields.String(description='Email address'),
    'username': fields.String(description='Username'),
    'first_name': fields.String(description='First name'),
    'last_name': fields.String(description='Last name'),
    'phone': fields.String(description='Phone number'),
    'dietary_preferences': fields.List(fields.String, description='Dietary preferences'),
    'health_goals': fields.List(fields.String, description='Health goals'),
    'is_premium': fields.Boolean(description='Premium subscription status'),
    'created_at': fields.String(description='Account creation date')
})

@users_ns.route('/profile')
class UserProfile(Resource):
    @jwt_required()
    @users_ns.doc('get_user_profile')
    @users_ns.marshal_with(user_profile_model)
    def get(self):
        """Get current user's profile"""
        try:
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            
            if not user:
                users_ns.abort(404, 'User not found')
            
            return user.to_dict(include_sensitive=True)
            
        except Exception as e:
            users_ns.abort(500, 'Failed to fetch user profile')
    
    @jwt_required()
    @users_ns.expect(user_update_model)
    @users_ns.marshal_with(user_profile_model)
    @users_ns.doc('update_user_profile')
    def put(self):
        """Update current user's profile"""
        try:
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            
            if not user:
                users_ns.abort(404, 'User not found')
            
            # Validate input data
            schema = UserUpdateSchema()
            data = schema.load(request.get_json())
            
            # Update user fields
            for field, value in data.items():
                if hasattr(user, field):
                    setattr(user, field, value)
            
            db.session.commit()
            
            return user.to_dict(include_sensitive=True)
            
        except ValidationError as e:
            users_ns.abort(400, str(e.messages))
        except Exception as e:
            db.session.rollback()
            users_ns.abort(500, 'Failed to update profile')

@users_ns.route('/favorites')
class UserFavorites(Resource):
    @jwt_required()
    @users_ns.doc('get_user_favorites')
    def get(self):
        """Get current user's favorite cocktails"""
        try:
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            
            if not user:
                users_ns.abort(404, 'User not found')
            
            favorites = [cocktail.to_dict(include_ingredients=False) 
                        for cocktail in user.favorite_cocktails]
            
            return {
                'favorites': favorites,
                'total': len(favorites)
            }
            
        except Exception as e:
            users_ns.abort(500, 'Failed to fetch favorites')

@users_ns.route('/dashboard')
class UserDashboard(Resource):
    @jwt_required()
    @users_ns.doc('get_user_dashboard')
    def get(self):
        """Get user dashboard data"""
        try:
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            
            if not user:
                users_ns.abort(404, 'User not found')
            
            # Get user statistics
            favorites_count = len(user.favorite_cocktails)
            reviews_count = user.cocktail_reviews.count()
            bookings_count = user.class_bookings.count()
            active_subscriptions = user.subscriptions.filter_by(status='active').count()
            
            # Get recent activity (last 5 favorite cocktails)
            recent_favorites = [cocktail.to_dict(include_ingredients=False) 
                              for cocktail in user.favorite_cocktails[-5:]]
            
            # Get upcoming class bookings
            upcoming_classes = [booking.to_dict() 
                              for booking in user.class_bookings.filter_by(status='confirmed').limit(3)]
            
            return {
                'user': user.to_dict(),
                'statistics': {
                    'favorites_count': favorites_count,
                    'reviews_count': reviews_count,
                    'bookings_count': bookings_count,
                    'active_subscriptions': active_subscriptions
                },
                'recent_favorites': recent_favorites,
                'upcoming_classes': upcoming_classes
            }
            
        except Exception as e:
            users_ns.abort(500, 'Failed to fetch dashboard data')

@users_ns.route('/preferences')
class UserPreferences(Resource):
    @jwt_required()
    @users_ns.doc('get_user_preferences')
    def get(self):
        """Get available dietary preferences and health goals"""
        try:
            dietary_preferences = [
                'Vegan', 'Vegetarian', 'Gluten-Free', 'Keto', 'Paleo',
                'Low-Carb', 'Low-Sugar', 'Dairy-Free', 'Nut-Free', 'Organic-Only'
            ]
            
            health_goals = [
                'Weight Management', 'Energy Boost', 'Immune Support',
                'Stress Relief', 'Better Sleep', 'Digestive Health',
                'Skin Health', 'Heart Health', 'Mental Clarity', 'Detox'
            ]
            
            return {
                'dietary_preferences': dietary_preferences,
                'health_goals': health_goals
            }
            
        except Exception as e:
            users_ns.abort(500, 'Failed to fetch preferences')

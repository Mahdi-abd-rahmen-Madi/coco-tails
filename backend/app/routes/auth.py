from flask import request, jsonify
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from marshmallow import Schema, fields as ma_fields, validate, ValidationError
from datetime import datetime
from app import db
from app.models.user import User

# Create namespace for authentication
auth_ns = Namespace('auth', description='Authentication operations')

# Marshmallow schemas for validation
class UserRegistrationSchema(Schema):
    email = ma_fields.Email(required=True)
    username = ma_fields.Str(required=True, validate=validate.Length(min=3, max=80))
    password = ma_fields.Str(required=True, validate=validate.Length(min=8))
    first_name = ma_fields.Str(required=True, validate=validate.Length(min=1, max=50))
    last_name = ma_fields.Str(required=True, validate=validate.Length(min=1, max=50))
    phone = ma_fields.Str(validate=validate.Length(max=20))
    dietary_preferences = ma_fields.List(ma_fields.Str())
    health_goals = ma_fields.List(ma_fields.Str())

class UserLoginSchema(Schema):
    email = ma_fields.Email(required=True)
    password = ma_fields.Str(required=True)

# Flask-RESTX models for Swagger documentation
user_registration_model = auth_ns.model('UserRegistration', {
    'email': fields.String(required=True, description='User email address'),
    'username': fields.String(required=True, description='Unique username'),
    'password': fields.String(required=True, description='Password (min 8 characters)'),
    'first_name': fields.String(required=True, description='First name'),
    'last_name': fields.String(required=True, description='Last name'),
    'phone': fields.String(description='Phone number'),
    'dietary_preferences': fields.List(fields.String, description='Dietary preferences'),
    'health_goals': fields.List(fields.String, description='Health and wellness goals')
})

user_login_model = auth_ns.model('UserLogin', {
    'email': fields.String(required=True, description='User email address'),
    'password': fields.String(required=True, description='User password')
})

user_response_model = auth_ns.model('UserResponse', {
    'id': fields.Integer(description='User ID'),
    'email': fields.String(description='Email address'),
    'username': fields.String(description='Username'),
    'first_name': fields.String(description='First name'),
    'last_name': fields.String(description='Last name'),
    'is_premium': fields.Boolean(description='Premium subscription status'),
    'created_at': fields.String(description='Account creation date')
})

token_response_model = auth_ns.model('TokenResponse', {
    'access_token': fields.String(description='JWT access token'),
    'refresh_token': fields.String(description='JWT refresh token'),
    'user': fields.Nested(user_response_model, description='User information')
})

@auth_ns.route('/register')
class UserRegistration(Resource):
    @auth_ns.expect(user_registration_model)
    @auth_ns.marshal_with(token_response_model, code=201)
    @auth_ns.doc('register_user')
    def post(self):
        """Register a new user"""
        try:
            # Validate input data
            schema = UserRegistrationSchema()
            data = schema.load(request.get_json())
            
            # Check if user already exists
            if User.query.filter_by(email=data['email']).first():
                auth_ns.abort(400, 'Email already registered')
            
            if User.query.filter_by(username=data['username']).first():
                auth_ns.abort(400, 'Username already taken')
            
            # Create new user
            user = User(
                email=data['email'],
                username=data['username'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                phone=data.get('phone'),
                dietary_preferences=data.get('dietary_preferences', []),
                health_goals=data.get('health_goals', [])
            )
            user.set_password(data['password'])
            
            db.session.add(user)
            db.session.commit()
            
            # Generate tokens
            tokens = user.generate_tokens()
            
            return {
                'access_token': tokens['access_token'],
                'refresh_token': tokens['refresh_token'],
                'user': user.to_dict()
            }, 201
            
        except ValidationError as e:
            auth_ns.abort(400, str(e.messages))
        except Exception as e:
            db.session.rollback()
            auth_ns.abort(500, 'Registration failed')

@auth_ns.route('/login')
class UserLogin(Resource):
    @auth_ns.expect(user_login_model)
    @auth_ns.marshal_with(token_response_model)
    @auth_ns.doc('login_user')
    def post(self):
        """Authenticate user and return tokens"""
        try:
            # Validate input data
            schema = UserLoginSchema()
            data = schema.load(request.get_json())
            
            # Find user by email
            user = User.query.filter_by(email=data['email']).first()
            
            if not user or not user.check_password(data['password']):
                auth_ns.abort(401, 'Invalid email or password')
            
            if not user.is_active:
                auth_ns.abort(401, 'Account is deactivated')
            
            # Update last login
            user.last_login = datetime.utcnow()
            db.session.commit()
            
            # Generate tokens
            tokens = user.generate_tokens()
            
            return {
                'access_token': tokens['access_token'],
                'refresh_token': tokens['refresh_token'],
                'user': user.to_dict()
            }
            
        except ValidationError as e:
            auth_ns.abort(400, str(e.messages))
        except Exception as e:
            auth_ns.abort(500, 'Login failed')

@auth_ns.route('/refresh')
class TokenRefresh(Resource):
    @jwt_required(refresh=True)
    @auth_ns.doc('refresh_token')
    def post(self):
        """Refresh access token using refresh token"""
        try:
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            
            if not user or not user.is_active:
                auth_ns.abort(401, 'Invalid user')
            
            # Generate new access token
            access_token = create_access_token(identity=user.id)
            
            return {
                'access_token': access_token
            }
            
        except Exception as e:
            auth_ns.abort(500, 'Token refresh failed')

@auth_ns.route('/me')
class UserProfile(Resource):
    @jwt_required()
    @auth_ns.marshal_with(user_response_model)
    @auth_ns.doc('get_current_user')
    def get(self):
        """Get current user profile"""
        try:
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            
            if not user:
                auth_ns.abort(404, 'User not found')
            
            return user.to_dict()
            
        except Exception as e:
            auth_ns.abort(500, 'Failed to fetch user profile')

@auth_ns.route('/logout')
class UserLogout(Resource):
    @jwt_required()
    @auth_ns.doc('logout_user')
    def post(self):
        """Logout user (client should discard tokens)"""
        # In a production app, you might want to blacklist the token
        # For now, we'll just return a success message
        return {
            'message': 'Successfully logged out'
        }

@auth_ns.route('/verify-email')
class EmailVerification(Resource):
    @auth_ns.doc('verify_email')
    def post(self):
        """Verify user email address"""
        # This would typically involve sending an email with a verification link
        # For now, we'll return a placeholder response
        return {
            'message': 'Email verification feature coming soon'
        }

@auth_ns.route('/forgot-password')
class ForgotPassword(Resource):
    @auth_ns.doc('forgot_password')
    def post(self):
        """Request password reset"""
        # This would typically involve sending a password reset email
        # For now, we'll return a placeholder response
        return {
            'message': 'Password reset feature coming soon'
        }

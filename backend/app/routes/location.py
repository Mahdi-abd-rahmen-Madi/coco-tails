"""
Location and Contact API routes for SOBRE - Premium Healthy Cocktails
"""

from datetime import datetime
from flask import Blueprint, request, jsonify, current_app
from app import db
from app.models.location import Location, ContactInquiry
from app.utils.email import send_contact_inquiry_email, send_contact_confirmation_email
from app.utils.validation import validate_email, validate_phone
import logging

location_bp = Blueprint('location', __name__, url_prefix='/api/location')

@location_bp.route('/info', methods=['GET'])
def get_location_info():
    """Get primary location information"""
    try:
        location = Location.query.filter_by(is_primary=True, is_active=True).first()
        
        if not location:
            # Fallback to any active location
            location = Location.query.filter_by(is_active=True).first()
        
        if not location:
            return jsonify({'error': 'No location information available'}), 404
        
        return jsonify({'location': location.to_dict()}), 200
        
    except Exception as e:
        current_app.logger.error(f'Error fetching location info: {e}')
        return jsonify({'error': 'Internal server error'}), 500


@location_bp.route('/all', methods=['GET'])
def get_all_locations():
    """Get all active locations"""
    try:
        locations = Location.query.filter_by(is_active=True).all()
        return jsonify({
            'locations': [location.to_dict() for location in locations]
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'Error fetching locations: {e}')
        return jsonify({'error': 'Internal server error'}), 500


@location_bp.route('/<slug>', methods=['GET'])
def get_location_by_slug(slug):
    """Get a specific location by slug"""
    try:
        location = Location.query.filter_by(slug=slug, is_active=True).first()
        if not location:
            return jsonify({'error': 'Location not found'}), 404
        
        return jsonify({'location': location.to_dict()}), 200
        
    except Exception as e:
        current_app.logger.error(f'Error fetching location: {e}')
        return jsonify({'error': 'Internal server error'}), 500


@location_bp.route('/contact', methods=['POST'])
def submit_contact_inquiry():
    """Submit a general contact inquiry"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Validate email format
        if not validate_email(data['email']):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Validate phone format if provided
        if data.get('phone') and not validate_phone(data['phone']):
            return jsonify({'error': 'Invalid phone format'}), 400
        
        # Get user agent and IP for tracking (optional)
        user_agent = request.headers.get('User-Agent', '')
        ip_address = request.remote_addr
        
        # Create new contact inquiry
        inquiry = ContactInquiry(
            name=data['name'],
            email=data['email'],
            phone=data.get('phone', ''),
            subject=data['subject'],
            message=data['message'],
            inquiry_type=data.get('inquiryType', 'general'),
            location_id=data.get('locationId'),
            user_agent=user_agent,
            ip_address=ip_address,
            status='new'
        )
        
        db.session.add(inquiry)
        db.session.commit()
        
        # Send confirmation email to client
        try:
            send_contact_confirmation_email(inquiry)
        except Exception as e:
            current_app.logger.warning(f'Failed to send confirmation email: {e}')
        
        # Send notification email to admin
        try:
            send_contact_inquiry_email(inquiry)
        except Exception as e:
            current_app.logger.warning(f'Failed to send admin notification email: {e}')
        
        return jsonify({
            'message': 'Contact inquiry submitted successfully',
            'inquiry_id': inquiry.id,
            'status': 'received'
        }), 201
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f'Error submitting contact inquiry: {e}')
        return jsonify({'error': 'Internal server error'}), 500


@location_bp.route('/business-hours', methods=['GET'])
def get_business_hours():
    """Get business hours for the primary location"""
    try:
        location = Location.query.filter_by(is_primary=True, is_active=True).first()
        
        if not location:
            location = Location.query.filter_by(is_active=True).first()
        
        if not location or not location.business_hours:
            # Return default business hours
            default_hours = {
                'monday': {'open': '10:00', 'close': '22:00', 'closed': False},
                'tuesday': {'open': '10:00', 'close': '22:00', 'closed': False},
                'wednesday': {'open': '10:00', 'close': '22:00', 'closed': False},
                'thursday': {'open': '10:00', 'close': '22:00', 'closed': False},
                'friday': {'open': '10:00', 'close': '22:00', 'closed': False},
                'saturday': {'open': '10:00', 'close': '22:00', 'closed': False},
                'sunday': {'open': '12:00', 'close': '20:00', 'closed': False}
            }
            return jsonify({'business_hours': default_hours}), 200
        
        return jsonify({'business_hours': location.business_hours}), 200
        
    except Exception as e:
        current_app.logger.error(f'Error fetching business hours: {e}')
        return jsonify({'error': 'Internal server error'}), 500


@location_bp.route('/directions', methods=['GET'])
def get_directions():
    """Get directions and transport information"""
    try:
        location = Location.query.filter_by(is_primary=True, is_active=True).first()
        
        if not location:
            location = Location.query.filter_by(is_active=True).first()
        
        if not location:
            return jsonify({'error': 'No location information available'}), 404
        
        directions_info = {
            'address': {
                'street': location.street_address,
                'city': location.city,
                'postal_code': location.postal_code,
                'country': location.country
            },
            'coordinates': {
                'latitude': location.latitude,
                'longitude': location.longitude
            },
            'parking_info': location.parking_info,
            'public_transport_info': location.public_transport_info,
            'driving_directions': location.driving_directions
        }
        
        return jsonify({'directions': directions_info}), 200
        
    except Exception as e:
        current_app.logger.error(f'Error fetching directions: {e}')
        return jsonify({'error': 'Internal server error'}), 500


# Admin routes (would typically require authentication)
@location_bp.route('/admin/inquiries', methods=['GET'])
def get_all_contact_inquiries():
    """Get all contact inquiries (admin only)"""
    try:
        # In a real application, add authentication check here
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        status = request.args.get('status')
        inquiry_type = request.args.get('type')
        
        query = ContactInquiry.query
        
        if status:
            query = query.filter_by(status=status)
        if inquiry_type:
            query = query.filter_by(inquiry_type=inquiry_type)
        
        inquiries = query.order_by(ContactInquiry.created_at.desc()).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'inquiries': [inquiry.to_dict() for inquiry in inquiries.items],
            'total': inquiries.total,
            'pages': inquiries.pages,
            'current_page': page,
            'per_page': per_page
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'Error fetching contact inquiries: {e}')
        return jsonify({'error': 'Internal server error'}), 500


@location_bp.route('/admin/inquiries/<int:inquiry_id>', methods=['PUT'])
def update_contact_inquiry(inquiry_id):
    """Update contact inquiry status and add admin response (admin only)"""
    try:
        # In a real application, add authentication check here
        inquiry = ContactInquiry.query.get(inquiry_id)
        if not inquiry:
            return jsonify({'error': 'Inquiry not found'}), 404
        
        data = request.get_json()
        
        if 'status' in data:
            inquiry.status = data['status']
        if 'admin_response' in data:
            inquiry.admin_response = data['admin_response']
            inquiry.responded_at = datetime.utcnow()
            inquiry.responded_by = data.get('responded_by', 'Admin')
        if 'priority' in data:
            inquiry.priority = data['priority']
        
        inquiry.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'message': 'Contact inquiry updated successfully',
            'inquiry': inquiry.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f'Error updating contact inquiry: {e}')
        return jsonify({'error': 'Internal server error'}), 500


@location_bp.route('/admin/locations', methods=['POST'])
def create_location():
    """Create a new location (admin only)"""
    try:
        # In a real application, add authentication check here
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'slug', 'street_address', 'city', 'postal_code', 'country', 'latitude', 'longitude']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Check if slug is unique
        existing = Location.query.filter_by(slug=data['slug']).first()
        if existing:
            return jsonify({'error': 'Location slug already exists'}), 400
        
        location = Location(
            name=data['name'],
            slug=data['slug'],
            description=data.get('description', ''),
            street_address=data['street_address'],
            city=data['city'],
            postal_code=data['postal_code'],
            country=data['country'],
            latitude=float(data['latitude']),
            longitude=float(data['longitude']),
            phone=data.get('phone', ''),
            email=data.get('email', ''),
            website=data.get('website', ''),
            business_hours=data.get('business_hours', {}),
            social_media=data.get('social_media', {}),
            parking_info=data.get('parking_info', ''),
            public_transport_info=data.get('public_transport_info', ''),
            driving_directions=data.get('driving_directions', ''),
            is_active=data.get('is_active', True),
            is_primary=data.get('is_primary', False)
        )
        
        db.session.add(location)
        db.session.commit()
        
        return jsonify({
            'message': 'Location created successfully',
            'location': location.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f'Error creating location: {e}')
        return jsonify({'error': 'Internal server error'}), 500

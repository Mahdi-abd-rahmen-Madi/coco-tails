"""
Private Events API routes for SOBRE - Premium Healthy Cocktails
"""

from datetime import datetime, date, time
from flask import Blueprint, request, jsonify, current_app
from app import db
from app.models.private_event import PrivateEventInquiry, EventPackage, EventTestimonial
from app.utils.email import send_event_inquiry_email, send_event_confirmation_email
from app.utils.validation import validate_email, validate_phone
import logging

private_events_bp = Blueprint('private_events', __name__, url_prefix='/api/private-events')

@private_events_bp.route('/inquiry', methods=['POST'])
def submit_event_inquiry():
    """Submit a new private event inquiry"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['eventType', 'date', 'time', 'guests', 'name', 'email', 'phone']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Validate email format
        if not validate_email(data['email']):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Validate phone format
        if not validate_phone(data['phone']):
            return jsonify({'error': 'Invalid phone format'}), 400
        
        # Parse date and time
        try:
            event_date = datetime.strptime(data['date'], '%Y-%m-%d').date()
            event_time = datetime.strptime(data['time'], '%H:%M').time()
        except ValueError:
            return jsonify({'error': 'Invalid date or time format'}), 400
        
        # Validate that event is in the future
        event_datetime = datetime.combine(event_date, event_time)
        if event_datetime <= datetime.now():
            return jsonify({'error': 'Event date must be in the future'}), 400
        
        # Create new inquiry
        inquiry = PrivateEventInquiry(
            event_type=data['eventType'],
            event_date=event_date,
            event_time=event_time,
            number_of_guests=int(data['guests']),
            drink_categories=data.get('drinkCategories', []),
            dietary_requirements=data.get('dietaryRequirements', ''),
            contact_name=data['name'],
            contact_email=data['email'],
            contact_phone=data['phone'],
            message=data.get('message', ''),
            status='pending'
        )
        
        db.session.add(inquiry)
        db.session.commit()
        
        # Send confirmation email to client
        try:
            send_event_confirmation_email(inquiry)
        except Exception as e:
            current_app.logger.warning(f'Failed to send confirmation email: {e}')
        
        # Send notification email to admin
        try:
            send_event_inquiry_email(inquiry)
        except Exception as e:
            current_app.logger.warning(f'Failed to send admin notification email: {e}')
        
        return jsonify({
            'message': 'Event inquiry submitted successfully',
            'inquiry_id': inquiry.id,
            'status': 'pending'
        }), 201
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f'Error submitting event inquiry: {e}')
        return jsonify({'error': 'Internal server error'}), 500


@private_events_bp.route('/packages', methods=['GET'])
def get_event_packages():
    """Get all active event packages"""
    try:
        packages = EventPackage.query.filter_by(is_active=True).order_by(EventPackage.sort_order).all()
        return jsonify({
            'packages': [package.to_dict() for package in packages]
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'Error fetching event packages: {e}')
        return jsonify({'error': 'Internal server error'}), 500


@private_events_bp.route('/packages/<slug>', methods=['GET'])
def get_event_package(slug):
    """Get a specific event package by slug"""
    try:
        package = EventPackage.query.filter_by(slug=slug, is_active=True).first()
        if not package:
            return jsonify({'error': 'Package not found'}), 404
        
        return jsonify({'package': package.to_dict()}), 200
        
    except Exception as e:
        current_app.logger.error(f'Error fetching event package: {e}')
        return jsonify({'error': 'Internal server error'}), 500


@private_events_bp.route('/testimonials', methods=['GET'])
def get_event_testimonials():
    """Get approved event testimonials"""
    try:
        testimonials = EventTestimonial.query.filter_by(
            is_approved=True
        ).order_by(EventTestimonial.display_order, EventTestimonial.created_at.desc()).all()
        
        return jsonify({
            'testimonials': [testimonial.to_dict() for testimonial in testimonials]
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'Error fetching event testimonials: {e}')
        return jsonify({'error': 'Internal server error'}), 500


@private_events_bp.route('/featured-testimonials', methods=['GET'])
def get_featured_testimonials():
    """Get featured event testimonials"""
    try:
        testimonials = EventTestimonial.query.filter_by(
            is_approved=True,
            is_featured=True
        ).order_by(EventTestimonial.display_order, EventTestimonial.created_at.desc()).all()
        
        return jsonify({
            'testimonials': [testimonial.to_dict() for testimonial in testimonials]
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'Error fetching featured testimonials: {e}')
        return jsonify({'error': 'Internal server error'}), 500


@private_events_bp.route('/inquiry/<int:inquiry_id>/status', methods=['GET'])
def get_inquiry_status(inquiry_id):
    """Get the status of a specific inquiry (for client tracking)"""
    try:
        inquiry = PrivateEventInquiry.query.get(inquiry_id)
        if not inquiry:
            return jsonify({'error': 'Inquiry not found'}), 404
        
        # Return limited information for privacy
        return jsonify({
            'inquiry_id': inquiry.id,
            'status': inquiry.status,
            'created_at': inquiry.created_at.isoformat(),
            'event_date': inquiry.event_date.isoformat(),
            'event_type': inquiry.event_type
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'Error fetching inquiry status: {e}')
        return jsonify({'error': 'Internal server error'}), 500


# Admin routes (would typically require authentication)
@private_events_bp.route('/admin/inquiries', methods=['GET'])
def get_all_inquiries():
    """Get all event inquiries (admin only)"""
    try:
        # In a real application, add authentication check here
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        status = request.args.get('status')
        
        query = PrivateEventInquiry.query
        
        if status:
            query = query.filter_by(status=status)
        
        inquiries = query.order_by(PrivateEventInquiry.created_at.desc()).paginate(
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
        current_app.logger.error(f'Error fetching inquiries: {e}')
        return jsonify({'error': 'Internal server error'}), 500


@private_events_bp.route('/admin/inquiries/<int:inquiry_id>', methods=['PUT'])
def update_inquiry_status(inquiry_id):
    """Update inquiry status and add admin notes (admin only)"""
    try:
        # In a real application, add authentication check here
        inquiry = PrivateEventInquiry.query.get(inquiry_id)
        if not inquiry:
            return jsonify({'error': 'Inquiry not found'}), 404
        
        data = request.get_json()
        
        if 'status' in data:
            inquiry.status = data['status']
        if 'admin_notes' in data:
            inquiry.admin_notes = data['admin_notes']
        if 'estimated_quote' in data:
            inquiry.estimated_quote = data['estimated_quote']
        if 'priority' in data:
            inquiry.priority = data['priority']
        
        inquiry.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'message': 'Inquiry updated successfully',
            'inquiry': inquiry.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f'Error updating inquiry: {e}')
        return jsonify({'error': 'Internal server error'}), 500

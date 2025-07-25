from flask import request, jsonify
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from app import db
from app.models.virtual_class import VirtualClass, ClassBooking
from app.models.user import User

# Create namespace for virtual classes
classes_ns = Namespace('classes', description='Virtual mixology class operations')

# Flask-RESTX models for Swagger documentation
virtual_class_model = classes_ns.model('VirtualClass', {
    'id': fields.Integer(description='Class ID'),
    'title': fields.String(description='Class title'),
    'description': fields.String(description='Class description'),
    'instructor_name': fields.String(description='Instructor name'),
    'scheduled_datetime': fields.String(description='Scheduled date and time'),
    'duration_minutes': fields.Integer(description='Duration in minutes'),
    'max_participants': fields.Integer(description='Maximum participants'),
    'current_participants': fields.Integer(description='Current participants'),
    'price': fields.Float(description='Class price'),
    'difficulty_level': fields.String(description='Difficulty level'),
    'is_premium': fields.Boolean(description='Premium class'),
    'image_url': fields.String(description='Class image URL')
})

class_booking_model = classes_ns.model('ClassBooking', {
    'id': fields.Integer(description='Booking ID'),
    'booking_reference': fields.String(description='Booking reference'),
    'status': fields.String(description='Booking status'),
    'virtual_class': fields.Nested(virtual_class_model, description='Class details')
})

@classes_ns.route('/')
class VirtualClassList(Resource):
    @classes_ns.doc('list_virtual_classes')
    @classes_ns.marshal_list_with(virtual_class_model)
    def get(self):
        """Get list of upcoming virtual classes"""
        try:
            page = request.args.get('page', 1, type=int)
            per_page = min(request.args.get('per_page', 10, type=int), 50)
            difficulty = request.args.get('difficulty')
            is_premium = request.args.get('premium', type=bool)
            
            # Only show future classes
            query = VirtualClass.query.filter(
                VirtualClass.scheduled_datetime > datetime.utcnow(),
                VirtualClass.status == 'scheduled'
            )
            
            if difficulty:
                query = query.filter_by(difficulty_level=difficulty)
            if is_premium is not None:
                query = query.filter_by(is_premium=is_premium)
            
            query = query.order_by(VirtualClass.scheduled_datetime)
            classes = query.paginate(page=page, per_page=per_page, error_out=False)
            
            return {
                'classes': [cls.to_dict() for cls in classes.items],
                'pagination': {
                    'page': page,
                    'pages': classes.pages,
                    'total': classes.total
                }
            }
        except Exception as e:
            classes_ns.abort(500, 'Failed to fetch classes')

@classes_ns.route('/<int:class_id>')
class VirtualClassDetail(Resource):
    @classes_ns.doc('get_virtual_class')
    def get(self, class_id):
        """Get detailed virtual class information"""
        try:
            virtual_class = VirtualClass.query.get_or_404(class_id)
            return virtual_class.to_dict()
        except Exception as e:
            classes_ns.abort(500, 'Failed to fetch class details')

@classes_ns.route('/<int:class_id>/book')
class ClassBookingResource(Resource):
    @jwt_required()
    @classes_ns.doc('book_virtual_class')
    def post(self, class_id):
        """Book a virtual class"""
        try:
            current_user_id = get_jwt_identity()
            virtual_class = VirtualClass.query.get_or_404(class_id)
            
            # Check if class is full
            if virtual_class.is_full():
                classes_ns.abort(400, 'Class is fully booked')
            
            # Check if user already booked this class
            existing_booking = ClassBooking.query.filter_by(
                user_id=current_user_id,
                virtual_class_id=class_id
            ).first()
            
            if existing_booking:
                classes_ns.abort(400, 'You have already booked this class')
            
            # Create booking
            booking = ClassBooking(
                user_id=current_user_id,
                virtual_class_id=class_id,
                booking_reference=ClassBooking().generate_booking_reference(),
                amount_paid=virtual_class.price,
                status='confirmed'  # In production, this would be 'pending' until payment
            )
            
            db.session.add(booking)
            db.session.commit()
            
            return {
                'message': 'Class booked successfully',
                'booking': booking.to_dict()
            }, 201
            
        except Exception as e:
            db.session.rollback()
            classes_ns.abort(500, 'Failed to book class')

@classes_ns.route('/my-bookings')
class UserBookings(Resource):
    @jwt_required()
    @classes_ns.doc('get_user_bookings')
    @classes_ns.marshal_list_with(class_booking_model)
    def get(self):
        """Get current user's class bookings"""
        try:
            current_user_id = get_jwt_identity()
            bookings = ClassBooking.query.filter_by(user_id=current_user_id).order_by(
                ClassBooking.created_at.desc()
            ).all()
            
            return [booking.to_dict() for booking in bookings]
        except Exception as e:
            classes_ns.abort(500, 'Failed to fetch bookings')

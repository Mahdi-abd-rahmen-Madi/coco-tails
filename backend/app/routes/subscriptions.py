from flask import request, jsonify
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.subscription import Subscription, SubscriptionDelivery
from app.models.user import User

# Create namespace for subscriptions
subscriptions_ns = Namespace('subscriptions', description='Subscription operations')

# Flask-RESTX models for Swagger documentation
subscription_model = subscriptions_ns.model('Subscription', {
    'id': fields.Integer(description='Subscription ID'),
    'plan_type': fields.String(description='Subscription plan type'),
    'status': fields.String(description='Subscription status'),
    'monthly_price': fields.Float(description='Monthly price'),
    'next_billing_date': fields.String(description='Next billing date'),
    'monthly_ingredient_credits': fields.Integer(description='Monthly ingredient credits'),
    'virtual_class_credits': fields.Integer(description='Virtual class credits'),
    'premium_recipes_access': fields.Boolean(description='Premium recipes access')
})

@subscriptions_ns.route('/')
class SubscriptionList(Resource):
    @jwt_required()
    @subscriptions_ns.doc('get_user_subscriptions')
    @subscriptions_ns.marshal_list_with(subscription_model)
    def get(self):
        """Get current user's subscriptions"""
        try:
            current_user_id = get_jwt_identity()
            subscriptions = Subscription.query.filter_by(user_id=current_user_id).all()
            return [sub.to_dict() for sub in subscriptions]
        except Exception as e:
            subscriptions_ns.abort(500, 'Failed to fetch subscriptions')

@subscriptions_ns.route('/plans')
class SubscriptionPlans(Resource):
    @subscriptions_ns.doc('get_subscription_plans')
    def get(self):
        """Get available subscription plans"""
        plans = [
            {
                'plan_type': 'basic',
                'name': 'Wellness Explorer',
                'monthly_price': 29.99,
                'features': [
                    '3 premium ingredient deliveries per month',
                    '5 exclusive healthy cocktail recipes',
                    'Basic nutritional guidance',
                    'Community forum access'
                ]
            },
            {
                'plan_type': 'premium',
                'name': 'Mixology Master',
                'monthly_price': 59.99,
                'features': [
                    '6 premium ingredient deliveries per month',
                    'Unlimited healthy cocktail recipes',
                    '2 virtual mixology classes per month',
                    'Personal nutrition consultation',
                    'Priority customer support'
                ]
            },
            {
                'plan_type': 'elite',
                'name': 'Wellness Connoisseur',
                'monthly_price': 99.99,
                'features': [
                    'Unlimited premium ingredient deliveries',
                    'All premium recipes and content',
                    'Unlimited virtual mixology classes',
                    'Personal mixologist consultation',
                    '24/7 concierge support',
                    'Exclusive seasonal collections'
                ]
            }
        ]
        return plans

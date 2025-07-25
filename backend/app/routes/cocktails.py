from flask import request, jsonify
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from marshmallow import Schema, fields as ma_fields, validate, ValidationError
from app import db
from app.models.cocktail import Cocktail, CocktailIngredient, CocktailReview
from app.models.ingredient import Ingredient
from app.models.user import User

# Create namespace for cocktails
cocktails_ns = Namespace('cocktails', description='Cocktail operations')

# Flask-RESTX models for Swagger documentation
cocktail_model = cocktails_ns.model('Cocktail', {
    'id': fields.Integer(description='Cocktail ID'),
    'name': fields.String(description='Cocktail name'),
    'slug': fields.String(description='URL-friendly slug'),
    'description': fields.String(description='Cocktail description'),
    'instructions': fields.String(description='Preparation instructions'),
    'calories_per_serving': fields.Integer(description='Calories per serving'),
    'prep_time_minutes': fields.Integer(description='Preparation time in minutes'),
    'health_benefits': fields.List(fields.String, description='Health benefits'),
    'dietary_tags': fields.List(fields.String, description='Dietary tags'),
    'wellness_category': fields.String(description='Wellness category'),
    'difficulty_level': fields.String(description='Difficulty level'),
    'is_featured': fields.Boolean(description='Featured cocktail'),
    'is_premium': fields.Boolean(description='Premium cocktail'),
    'image_url': fields.String(description='Image URL')
})

cocktail_ingredient_model = cocktails_ns.model('CocktailIngredient', {
    'ingredient': fields.Raw(description='Ingredient details'),
    'quantity': fields.Float(description='Quantity needed'),
    'unit': fields.String(description='Unit of measurement'),
    'preparation_note': fields.String(description='Preparation notes'),
    'is_garnish': fields.Boolean(description='Is garnish ingredient')
})

cocktail_review_model = cocktails_ns.model('CocktailReview', {
    'id': fields.Integer(description='Review ID'),
    'rating': fields.Integer(description='Rating (1-5 stars)'),
    'title': fields.String(description='Review title'),
    'comment': fields.String(description='Review comment'),
    'user': fields.Raw(description='User information'),
    'created_at': fields.String(description='Review date')
})

@cocktails_ns.route('/')
class CocktailList(Resource):
    @cocktails_ns.doc('list_cocktails')
    @cocktails_ns.marshal_list_with(cocktail_model)
    def get(self):
        """Get list of cocktails with filtering options"""
        try:
            # Get query parameters
            page = request.args.get('page', 1, type=int)
            per_page = min(request.args.get('per_page', 12, type=int), 50)
            category = request.args.get('category')
            difficulty = request.args.get('difficulty')
            dietary_tags = request.args.getlist('dietary_tags')
            is_featured = request.args.get('featured', type=bool)
            is_premium = request.args.get('premium', type=bool)
            search = request.args.get('search')
            
            # Build query
            query = Cocktail.query.filter_by(is_active=True)
            
            if category:
                query = query.filter_by(wellness_category=category)
            
            if difficulty:
                query = query.filter_by(difficulty_level=difficulty)
            
            if dietary_tags:
                for tag in dietary_tags:
                    query = query.filter(Cocktail.dietary_tags.contains([tag]))
            
            if is_featured is not None:
                query = query.filter_by(is_featured=is_featured)
            
            if is_premium is not None:
                query = query.filter_by(is_premium=is_premium)
            
            if search:
                search_term = f"%{search}%"
                query = query.filter(
                    db.or_(
                        Cocktail.name.ilike(search_term),
                        Cocktail.description.ilike(search_term)
                    )
                )
            
            # Order by featured first, then by creation date
            query = query.order_by(Cocktail.is_featured.desc(), Cocktail.created_at.desc())
            
            # Paginate results
            cocktails = query.paginate(
                page=page, per_page=per_page, error_out=False
            )
            
            return {
                'cocktails': [cocktail.to_dict(include_ingredients=False) for cocktail in cocktails.items],
                'pagination': {
                    'page': page,
                    'pages': cocktails.pages,
                    'per_page': per_page,
                    'total': cocktails.total,
                    'has_next': cocktails.has_next,
                    'has_prev': cocktails.has_prev
                }
            }
            
        except Exception as e:
            cocktails_ns.abort(500, 'Failed to fetch cocktails')

@cocktails_ns.route('/<int:cocktail_id>')
class CocktailDetail(Resource):
    @cocktails_ns.doc('get_cocktail')
    @cocktails_ns.marshal_with(cocktail_model)
    def get(self, cocktail_id):
        """Get detailed cocktail information"""
        try:
            cocktail = Cocktail.query.filter_by(id=cocktail_id, is_active=True).first()
            
            if not cocktail:
                cocktails_ns.abort(404, 'Cocktail not found')
            
            return cocktail.to_dict(include_ingredients=True)
            
        except Exception as e:
            cocktails_ns.abort(500, 'Failed to fetch cocktail')

@cocktails_ns.route('/<int:cocktail_id>/reviews')
class CocktailReviews(Resource):
    @cocktails_ns.doc('get_cocktail_reviews')
    @cocktails_ns.marshal_list_with(cocktail_review_model)
    def get(self, cocktail_id):
        """Get reviews for a cocktail"""
        try:
            cocktail = Cocktail.query.get_or_404(cocktail_id)
            
            page = request.args.get('page', 1, type=int)
            per_page = min(request.args.get('per_page', 10, type=int), 50)
            
            reviews = CocktailReview.query.filter_by(
                cocktail_id=cocktail_id,
                is_approved=True
            ).order_by(CocktailReview.created_at.desc()).paginate(
                page=page, per_page=per_page, error_out=False
            )
            
            return {
                'reviews': [review.to_dict() for review in reviews.items],
                'pagination': {
                    'page': page,
                    'pages': reviews.pages,
                    'per_page': per_page,
                    'total': reviews.total
                },
                'average_rating': cocktail.get_average_rating()
            }
            
        except Exception as e:
            cocktails_ns.abort(500, 'Failed to fetch reviews')
    
    @jwt_required()
    @cocktails_ns.doc('create_cocktail_review')
    def post(self, cocktail_id):
        """Create a review for a cocktail"""
        try:
            current_user_id = get_jwt_identity()
            cocktail = Cocktail.query.get_or_404(cocktail_id)
            
            data = request.get_json()
            
            # Validate required fields
            if not data.get('rating') or not isinstance(data['rating'], int) or data['rating'] < 1 or data['rating'] > 5:
                cocktails_ns.abort(400, 'Rating must be between 1 and 5')
            
            # Check if user already reviewed this cocktail
            existing_review = CocktailReview.query.filter_by(
                cocktail_id=cocktail_id,
                user_id=current_user_id
            ).first()
            
            if existing_review:
                cocktails_ns.abort(400, 'You have already reviewed this cocktail')
            
            # Create new review
            review = CocktailReview(
                cocktail_id=cocktail_id,
                user_id=current_user_id,
                rating=data['rating'],
                title=data.get('title', '').strip(),
                comment=data.get('comment', '').strip()
            )
            
            db.session.add(review)
            db.session.commit()
            
            return {
                'message': 'Review submitted successfully',
                'review': review.to_dict()
            }, 201
            
        except Exception as e:
            db.session.rollback()
            cocktails_ns.abort(500, 'Failed to create review')

@cocktails_ns.route('/<int:cocktail_id>/favorite')
class CocktailFavorite(Resource):
    @jwt_required()
    @cocktails_ns.doc('toggle_favorite')
    def post(self, cocktail_id):
        """Add or remove cocktail from favorites"""
        try:
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            cocktail = Cocktail.query.get_or_404(cocktail_id)
            
            if cocktail in user.favorite_cocktails:
                # Remove from favorites
                user.favorite_cocktails.remove(cocktail)
                message = 'Removed from favorites'
                is_favorite = False
            else:
                # Add to favorites
                user.favorite_cocktails.append(cocktail)
                message = 'Added to favorites'
                is_favorite = True
            
            db.session.commit()
            
            return {
                'message': message,
                'is_favorite': is_favorite
            }
            
        except Exception as e:
            db.session.rollback()
            cocktails_ns.abort(500, 'Failed to update favorites')

@cocktails_ns.route('/featured')
class FeaturedCocktails(Resource):
    @cocktails_ns.doc('get_featured_cocktails')
    @cocktails_ns.marshal_list_with(cocktail_model)
    def get(self):
        """Get featured cocktails"""
        try:
            limit = min(request.args.get('limit', 6, type=int), 20)
            
            cocktails = Cocktail.query.filter_by(
                is_featured=True,
                is_active=True
            ).order_by(Cocktail.created_at.desc()).limit(limit).all()
            
            return [cocktail.to_dict(include_ingredients=False) for cocktail in cocktails]
            
        except Exception as e:
            cocktails_ns.abort(500, 'Failed to fetch featured cocktails')

@cocktails_ns.route('/categories')
class CocktailCategories(Resource):
    @cocktails_ns.doc('get_cocktail_categories')
    def get(self):
        """Get available cocktail categories"""
        try:
            categories = db.session.query(Cocktail.wellness_category).filter(
                Cocktail.wellness_category.isnot(None),
                Cocktail.is_active == True
            ).distinct().all()
            
            return [category[0] for category in categories if category[0]]
            
        except Exception as e:
            cocktails_ns.abort(500, 'Failed to fetch categories')

@cocktails_ns.route('/search')
class CocktailSearch(Resource):
    @cocktails_ns.doc('search_cocktails')
    def get(self):
        """Search cocktails by name, ingredients, or health benefits"""
        try:
            query_param = request.args.get('q', '').strip()
            if not query_param:
                cocktails_ns.abort(400, 'Search query is required')
            
            search_term = f"%{query_param}%"
            
            # Search in cocktail names, descriptions, and health benefits
            cocktails = Cocktail.query.filter(
                db.and_(
                    Cocktail.is_active == True,
                    db.or_(
                        Cocktail.name.ilike(search_term),
                        Cocktail.description.ilike(search_term),
                        Cocktail.health_benefits.contains([query_param])
                    )
                )
            ).limit(20).all()
            
            return [cocktail.to_dict(include_ingredients=False) for cocktail in cocktails]
            
        except Exception as e:
            cocktails_ns.abort(500, 'Search failed')

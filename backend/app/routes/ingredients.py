from flask import request, jsonify
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.ingredient import Ingredient, IngredientInteraction

# Create namespace for ingredients
ingredients_ns = Namespace('ingredients', description='Ingredient operations')

# Flask-RESTX models for Swagger documentation
ingredient_model = ingredients_ns.model('Ingredient', {
    'id': fields.Integer(description='Ingredient ID'),
    'name': fields.String(description='Ingredient name'),
    'slug': fields.String(description='URL-friendly slug'),
    'description': fields.String(description='Ingredient description'),
    'category': fields.String(description='Ingredient category'),
    'health_benefits': fields.List(fields.String, description='Health benefits'),
    'is_organic': fields.Boolean(description='Organic certification'),
    'is_seasonal': fields.Boolean(description='Seasonal availability'),
    'image_url': fields.String(description='Image URL')
})

@ingredients_ns.route('/')
class IngredientList(Resource):
    @ingredients_ns.doc('list_ingredients')
    @ingredients_ns.marshal_list_with(ingredient_model)
    def get(self):
        """Get list of ingredients with filtering options"""
        try:
            page = request.args.get('page', 1, type=int)
            per_page = min(request.args.get('per_page', 20, type=int), 50)
            category = request.args.get('category')
            is_organic = request.args.get('organic', type=bool)
            is_seasonal = request.args.get('seasonal', type=bool)
            search = request.args.get('search')
            
            query = Ingredient.query.filter_by(is_active=True)
            
            if category:
                query = query.filter_by(category=category)
            if is_organic is not None:
                query = query.filter_by(is_organic=is_organic)
            if is_seasonal is not None:
                query = query.filter_by(is_seasonal=is_seasonal)
            if search:
                search_term = f"%{search}%"
                query = query.filter(Ingredient.name.ilike(search_term))
            
            query = query.order_by(Ingredient.name)
            ingredients = query.paginate(page=page, per_page=per_page, error_out=False)
            
            return {
                'ingredients': [ing.to_dict() for ing in ingredients.items],
                'pagination': {
                    'page': page,
                    'pages': ingredients.pages,
                    'total': ingredients.total
                }
            }
        except Exception as e:
            ingredients_ns.abort(500, 'Failed to fetch ingredients')

@ingredients_ns.route('/<int:ingredient_id>')
class IngredientDetail(Resource):
    @ingredients_ns.doc('get_ingredient')
    def get(self, ingredient_id):
        """Get detailed ingredient information"""
        try:
            ingredient = Ingredient.query.filter_by(id=ingredient_id, is_active=True).first()
            if not ingredient:
                ingredients_ns.abort(404, 'Ingredient not found')
            return ingredient.to_dict(include_detailed=True)
        except Exception as e:
            ingredients_ns.abort(500, 'Failed to fetch ingredient')

@ingredients_ns.route('/categories')
class IngredientCategories(Resource):
    @ingredients_ns.doc('get_ingredient_categories')
    def get(self):
        """Get available ingredient categories"""
        try:
            categories = db.session.query(Ingredient.category).filter(
                Ingredient.is_active == True
            ).distinct().all()
            return [cat[0] for cat in categories if cat[0]]
        except Exception as e:
            ingredients_ns.abort(500, 'Failed to fetch categories')

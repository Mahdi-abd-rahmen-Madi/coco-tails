from datetime import datetime
from app import db

class Cocktail(db.Model):
    """Cocktail model for healthy cocktail recipes"""
    __tablename__ = 'cocktails'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, index=True)
    slug = db.Column(db.String(120), unique=True, nullable=False, index=True)
    description = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    
    # Nutritional information
    calories_per_serving = db.Column(db.Integer, nullable=False)
    servings = db.Column(db.Integer, default=1)
    prep_time_minutes = db.Column(db.Integer, nullable=False)
    
    # Health and wellness attributes
    health_benefits = db.Column(db.JSON)  # Array of health benefits
    dietary_tags = db.Column(db.JSON)  # vegan, gluten-free, keto, etc.
    wellness_category = db.Column(db.String(50))  # detox, energy, immunity, etc.
    
    # Recipe details
    difficulty_level = db.Column(db.String(20), default='beginner')  # beginner, intermediate, advanced
    flavor_profile = db.Column(db.JSON)  # sweet, sour, bitter, umami, etc.
    color_hex = db.Column(db.String(7))  # Hex color code for visual representation
    
    # Media
    image_url = db.Column(db.String(255))
    video_url = db.Column(db.String(255))
    
    # Status and visibility
    is_featured = db.Column(db.Boolean, default=False)
    is_seasonal = db.Column(db.Boolean, default=False)
    is_premium = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    
    # SEO and content
    meta_title = db.Column(db.String(60))
    meta_description = db.Column(db.String(160))
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    ingredients = db.relationship('CocktailIngredient', backref='cocktail', lazy='dynamic', cascade='all, delete-orphan')
    reviews = db.relationship('CocktailReview', backref='cocktail', lazy='dynamic')
    
    def to_dict(self, include_ingredients=True):
        """Convert cocktail to dictionary"""
        data = {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'description': self.description,
            'instructions': self.instructions,
            'calories_per_serving': self.calories_per_serving,
            'servings': self.servings,
            'prep_time_minutes': self.prep_time_minutes,
            'health_benefits': self.health_benefits or [],
            'dietary_tags': self.dietary_tags or [],
            'wellness_category': self.wellness_category,
            'difficulty_level': self.difficulty_level,
            'flavor_profile': self.flavor_profile or [],
            'color_hex': self.color_hex,
            'image_url': self.image_url,
            'video_url': self.video_url,
            'is_featured': self.is_featured,
            'is_seasonal': self.is_seasonal,
            'is_premium': self.is_premium,
            'meta_title': self.meta_title,
            'meta_description': self.meta_description,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        
        if include_ingredients:
            data['ingredients'] = [ing.to_dict() for ing in self.ingredients]
            
        return data
    
    def get_average_rating(self):
        """Calculate average rating from reviews"""
        reviews = self.reviews.filter_by(is_approved=True).all()
        if not reviews:
            return 0
        return sum(review.rating for review in reviews) / len(reviews)
    
    def __repr__(self):
        return f'<Cocktail {self.name}>'

class CocktailIngredient(db.Model):
    """Association model for cocktail ingredients with quantities"""
    __tablename__ = 'cocktail_ingredients'
    
    id = db.Column(db.Integer, primary_key=True)
    cocktail_id = db.Column(db.Integer, db.ForeignKey('cocktails.id'), nullable=False)
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'), nullable=False)
    
    # Quantity and measurement
    quantity = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(20), nullable=False)  # oz, ml, tsp, tbsp, etc.
    preparation_note = db.Column(db.String(100))  # "freshly squeezed", "muddled", etc.
    
    # Order in recipe
    order_index = db.Column(db.Integer, default=0)
    is_garnish = db.Column(db.Boolean, default=False)
    is_optional = db.Column(db.Boolean, default=False)
    
    # Relationship to ingredient
    ingredient = db.relationship('Ingredient', backref='cocktail_uses')
    
    def to_dict(self):
        """Convert cocktail ingredient to dictionary"""
        return {
            'id': self.id,
            'ingredient': self.ingredient.to_dict() if self.ingredient else None,
            'quantity': self.quantity,
            'unit': self.unit,
            'preparation_note': self.preparation_note,
            'order_index': self.order_index,
            'is_garnish': self.is_garnish,
            'is_optional': self.is_optional
        }

class CocktailReview(db.Model):
    """User reviews for cocktails"""
    __tablename__ = 'cocktail_reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    cocktail_id = db.Column(db.Integer, db.ForeignKey('cocktails.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    rating = db.Column(db.Integer, nullable=False)  # 1-5 stars
    title = db.Column(db.String(100))
    comment = db.Column(db.Text)
    
    # Moderation
    is_approved = db.Column(db.Boolean, default=False)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', backref='cocktail_reviews')
    
    def to_dict(self):
        """Convert review to dictionary"""
        return {
            'id': self.id,
            'rating': self.rating,
            'title': self.title,
            'comment': self.comment,
            'user': {
                'username': self.user.username,
                'first_name': self.user.first_name
            } if self.user else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<CocktailReview {self.cocktail_id}:{self.user_id}>'

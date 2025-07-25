from datetime import datetime
from app import db

class Ingredient(db.Model):
    """Ingredient model for healthy cocktail components"""
    __tablename__ = 'ingredients'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, index=True)
    slug = db.Column(db.String(120), unique=True, nullable=False, index=True)
    description = db.Column(db.Text)
    
    # Categorization
    category = db.Column(db.String(50), nullable=False)  # fruit, herb, spirit, superfood, etc.
    subcategory = db.Column(db.String(50))
    origin = db.Column(db.String(100))  # Geographic origin
    
    # Nutritional information (per 100g or standard serving)
    calories_per_100g = db.Column(db.Integer)
    protein_g = db.Column(db.Float)
    carbs_g = db.Column(db.Float)
    fiber_g = db.Column(db.Float)
    sugar_g = db.Column(db.Float)
    fat_g = db.Column(db.Float)
    sodium_mg = db.Column(db.Float)
    
    # Vitamins and minerals (as JSON for flexibility)
    vitamins = db.Column(db.JSON)  # {"vitamin_c": 50, "vitamin_a": 20}
    minerals = db.Column(db.JSON)  # {"potassium": 300, "magnesium": 25}
    
    # Health and wellness attributes
    health_benefits = db.Column(db.JSON)  # Array of health benefits
    antioxidant_level = db.Column(db.String(20))  # low, medium, high, very_high
    glycemic_index = db.Column(db.Integer)
    
    # Flavor and sensory attributes
    flavor_profile = db.Column(db.JSON)  # sweet, bitter, sour, umami, etc.
    aroma_notes = db.Column(db.JSON)  # citrus, floral, earthy, etc.
    color_hex = db.Column(db.String(7))  # Hex color code
    
    # Sourcing and sustainability
    is_organic = db.Column(db.Boolean, default=False)
    is_fair_trade = db.Column(db.Boolean, default=False)
    is_local = db.Column(db.Boolean, default=False)
    sustainability_score = db.Column(db.Integer)  # 1-10 scale
    
    # Availability and seasonality
    is_seasonal = db.Column(db.Boolean, default=False)
    peak_season_months = db.Column(db.JSON)  # Array of month numbers
    availability_regions = db.Column(db.JSON)  # Array of regions
    
    # Preparation and storage
    preparation_methods = db.Column(db.JSON)  # juice, muddle, infuse, etc.
    storage_instructions = db.Column(db.Text)
    shelf_life_days = db.Column(db.Integer)
    
    # Pricing and sourcing
    cost_per_unit = db.Column(db.Float)
    unit_type = db.Column(db.String(20))  # lb, kg, bottle, etc.
    supplier_info = db.Column(db.JSON)
    
    # Media and content
    image_url = db.Column(db.String(255))
    
    # Status
    is_active = db.Column(db.Boolean, default=True)
    is_premium = db.Column(db.Boolean, default=False)
    
    # SEO
    meta_title = db.Column(db.String(60))
    meta_description = db.Column(db.String(160))
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self, include_detailed=False):
        """Convert ingredient to dictionary"""
        data = {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'description': self.description,
            'category': self.category,
            'subcategory': self.subcategory,
            'origin': self.origin,
            'health_benefits': self.health_benefits or [],
            'flavor_profile': self.flavor_profile or [],
            'color_hex': self.color_hex,
            'is_organic': self.is_organic,
            'is_fair_trade': self.is_fair_trade,
            'is_local': self.is_local,
            'is_seasonal': self.is_seasonal,
            'image_url': self.image_url,
            'is_premium': self.is_premium
        }
        
        if include_detailed:
            data.update({
                'calories_per_100g': self.calories_per_100g,
                'protein_g': self.protein_g,
                'carbs_g': self.carbs_g,
                'fiber_g': self.fiber_g,
                'sugar_g': self.sugar_g,
                'fat_g': self.fat_g,
                'sodium_mg': self.sodium_mg,
                'vitamins': self.vitamins or {},
                'minerals': self.minerals or {},
                'antioxidant_level': self.antioxidant_level,
                'glycemic_index': self.glycemic_index,
                'aroma_notes': self.aroma_notes or [],
                'sustainability_score': self.sustainability_score,
                'peak_season_months': self.peak_season_months or [],
                'preparation_methods': self.preparation_methods or [],
                'storage_instructions': self.storage_instructions,
                'shelf_life_days': self.shelf_life_days,
                'meta_title': self.meta_title,
                'meta_description': self.meta_description,
                'created_at': self.created_at.isoformat() if self.created_at else None,
                'updated_at': self.updated_at.isoformat() if self.updated_at else None
            })
            
        return data
    
    def get_nutritional_summary(self):
        """Get a summary of key nutritional information"""
        return {
            'calories_per_100g': self.calories_per_100g,
            'protein_g': self.protein_g,
            'carbs_g': self.carbs_g,
            'fiber_g': self.fiber_g,
            'antioxidant_level': self.antioxidant_level,
            'health_benefits': self.health_benefits or []
        }
    
    def __repr__(self):
        return f'<Ingredient {self.name}>'

class IngredientInteraction(db.Model):
    """Model for ingredient interactions and compatibility"""
    __tablename__ = 'ingredient_interactions'
    
    id = db.Column(db.Integer, primary_key=True)
    ingredient1_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'), nullable=False)
    ingredient2_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'), nullable=False)
    
    # Interaction type
    interaction_type = db.Column(db.String(20), nullable=False)  # synergy, complement, avoid
    compatibility_score = db.Column(db.Integer)  # 1-10 scale
    
    # Description of the interaction
    description = db.Column(db.Text)
    flavor_impact = db.Column(db.String(100))
    health_impact = db.Column(db.String(100))
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    ingredient1 = db.relationship('Ingredient', foreign_keys=[ingredient1_id])
    ingredient2 = db.relationship('Ingredient', foreign_keys=[ingredient2_id])
    
    def to_dict(self):
        """Convert interaction to dictionary"""
        return {
            'id': self.id,
            'ingredient1': self.ingredient1.to_dict() if self.ingredient1 else None,
            'ingredient2': self.ingredient2.to_dict() if self.ingredient2 else None,
            'interaction_type': self.interaction_type,
            'compatibility_score': self.compatibility_score,
            'description': self.description,
            'flavor_impact': self.flavor_impact,
            'health_impact': self.health_impact
        }
    
    def __repr__(self):
        return f'<IngredientInteraction {self.ingredient1_id}:{self.ingredient2_id}>'

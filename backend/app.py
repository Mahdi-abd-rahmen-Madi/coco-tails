#!/usr/bin/env python3
"""
Coco Tails - Premium Healthy Cocktails API
Main Flask application entry point
"""

import os
from flask import Flask
from app import create_app, db

# Create Flask application
app = create_app(os.getenv('FLASK_CONFIG') or 'development')

@app.shell_context_processor
def make_shell_context():
    """Make database models available in Flask shell"""
    from app.models.user import User
    from app.models.cocktail import Cocktail, CocktailIngredient, CocktailReview
    from app.models.ingredient import Ingredient, IngredientInteraction
    from app.models.subscription import Subscription, SubscriptionDelivery
    from app.models.virtual_class import VirtualClass, ClassBooking
    
    return {
        'db': db,
        'User': User,
        'Cocktail': Cocktail,
        'CocktailIngredient': CocktailIngredient,
        'CocktailReview': CocktailReview,
        'Ingredient': Ingredient,
        'IngredientInteraction': IngredientInteraction,
        'Subscription': Subscription,
        'SubscriptionDelivery': SubscriptionDelivery,
        'VirtualClass': VirtualClass,
        'ClassBooking': ClassBooking
    }

@app.cli.command()
def init_db():
    """Initialize the database with tables"""
    db.create_all()
    print("Database tables created successfully!")

@app.cli.command()
def seed_db():
    """Seed the database with sample data"""
    from datetime import datetime, timedelta
    
    # Create sample ingredients
    ingredients_data = [
        {
            'name': 'Organic Spinach',
            'slug': 'organic-spinach',
            'description': 'Fresh organic spinach leaves packed with iron and vitamins',
            'category': 'leafy_greens',
            'health_benefits': ['High in iron', 'Rich in vitamins', 'Antioxidant properties'],
            'is_organic': True,
            'color_hex': '#228B22'
        },
        {
            'name': 'Fresh Ginger',
            'slug': 'fresh-ginger',
            'description': 'Organic ginger root with anti-inflammatory properties',
            'category': 'herbs_spices',
            'health_benefits': ['Anti-inflammatory', 'Digestive aid', 'Immune support'],
            'is_organic': True,
            'color_hex': '#DAA520'
        },
        {
            'name': 'Blueberries',
            'slug': 'blueberries',
            'description': 'Antioxidant-rich organic blueberries',
            'category': 'berries',
            'health_benefits': ['High antioxidants', 'Brain health', 'Anti-aging'],
            'is_organic': True,
            'color_hex': '#4169E1'
        }
    ]
    
    for ing_data in ingredients_data:
        ingredient = Ingredient(**ing_data)
        db.session.add(ingredient)
    
    # Create sample cocktails
    cocktails_data = [
        {
            'name': 'Green Goddess',
            'slug': 'green-goddess',
            'description': 'A refreshing blend of spinach, cucumber, and mint',
            'instructions': 'Muddle mint leaves, add spinach juice, cucumber, and ice. Shake well.',
            'calories_per_serving': 85,
            'prep_time_minutes': 5,
            'health_benefits': ['Detoxifying', 'Energy boosting', 'Vitamin rich'],
            'wellness_category': 'detox',
            'difficulty_level': 'beginner',
            'is_featured': True,
            'color_hex': '#22c55e'
        },
        {
            'name': 'Golden Elixir',
            'slug': 'golden-elixir',
            'description': 'Turmeric and ginger wellness cocktail',
            'instructions': 'Combine turmeric, ginger, honey, and citrus. Shake with ice.',
            'calories_per_serving': 92,
            'prep_time_minutes': 7,
            'health_benefits': ['Anti-inflammatory', 'Immune support', 'Digestive aid'],
            'wellness_category': 'immunity',
            'difficulty_level': 'intermediate',
            'is_featured': True,
            'color_hex': '#f59e0b'
        }
    ]
    
    for cocktail_data in cocktails_data:
        cocktail = Cocktail(**cocktail_data)
        db.session.add(cocktail)
    
    # Create sample virtual classes
    future_date = datetime.utcnow() + timedelta(days=7)
    virtual_class = VirtualClass(
        title='Healthy Cocktail Fundamentals',
        description='Learn the basics of creating nutritious and delicious cocktails',
        instructor_name='Chef Maria Rodriguez',
        scheduled_datetime=future_date,
        duration_minutes=60,
        max_participants=20,
        price=29.99,
        difficulty_level='beginner',
        is_featured=True
    )
    db.session.add(virtual_class)
    
    try:
        db.session.commit()
        print("Database seeded successfully!")
    except Exception as e:
        db.session.rollback()
        print(f"Error seeding database: {e}")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

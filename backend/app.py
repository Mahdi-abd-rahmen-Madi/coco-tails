#!/usr/bin/env python3
"""
SOBRE - Premium Healthy Cocktails API
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
    from app.models.private_event import PrivateEventInquiry, EventPackage, EventTestimonial
    from app.models.location import Location, ContactInquiry
    
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
        'ClassBooking': ClassBooking,
        'PrivateEventInquiry': PrivateEventInquiry,
        'EventPackage': EventPackage,
        'EventTestimonial': EventTestimonial,
        'Location': Location,
        'ContactInquiry': ContactInquiry
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
    
    # Create location data
    from app.models.location import Location
    location = Location(
        name='SOBRE Arcachon',
        slug='sobre-arcachon',
        description='Our flagship location in the beautiful coastal town of Arcachon',
        street_address='Boulevard de la Plage',
        city='Arcachon',
        postal_code='33120',
        country='France',
        latitude=44.6667,
        longitude=-1.1667,
        phone='+33 5 56 83 01 69',
        email='hello@sobre.com',
        website='https://sobre.com',
        business_hours={
            'monday': {'open': '10:00', 'close': '22:00', 'closed': False},
            'tuesday': {'open': '10:00', 'close': '22:00', 'closed': False},
            'wednesday': {'open': '10:00', 'close': '22:00', 'closed': False},
            'thursday': {'open': '10:00', 'close': '22:00', 'closed': False},
            'friday': {'open': '10:00', 'close': '22:00', 'closed': False},
            'saturday': {'open': '10:00', 'close': '22:00', 'closed': False},
            'sunday': {'open': '12:00', 'close': '20:00', 'closed': False}
        },
        social_media={
            'facebook': 'https://facebook.com/sobre',
            'instagram': 'https://instagram.com/sobre',
            'twitter': 'https://twitter.com/sobre'
        },
        parking_info='Free street parking available on Boulevard de la Plage. Public parking at Parking de la Plage (2 minutes walk).',
        public_transport_info='Direct train from Bordeaux Saint-Jean (50 minutes). Bus line 601 from Bordeaux city center.',
        driving_directions='From Bordeaux: Take A63 towards Arcachon (45 minutes). From Paris: A10 to Bordeaux, then A63 to Arcachon (6 hours).',
        is_active=True,
        is_primary=True
    )
    db.session.add(location)
    
    # Create event packages
    from app.models.private_event import EventPackage, EventTestimonial
    packages_data = [
        {
            'name': 'Essential',
            'slug': 'essential',
            'description': 'Perfect for intimate gatherings and small events',
            'price_per_person': 25.00,
            'features': ['3 signature cocktails', 'Basic garnish selection', '2-hour service', 'Professional bartender'],
            'max_guests': 50,
            'min_guests': 10,
            'service_hours': 2,
            'cocktail_count': 3,
            'includes_bartender': True,
            'includes_ingredients': True,
            'includes_equipment': True,
            'custom_menu_design': False,
            'is_active': True,
            'is_featured': False,
            'sort_order': 1
        },
        {
            'name': 'Premium',
            'slug': 'premium',
            'description': 'Our most popular package with enhanced features',
            'price_per_person': 45.00,
            'features': ['5 signature cocktails', 'Premium garnish & ingredients', '4-hour service', 'Professional bartender', 'Custom menu design'],
            'max_guests': 100,
            'min_guests': 15,
            'service_hours': 4,
            'cocktail_count': 5,
            'includes_bartender': True,
            'includes_ingredients': True,
            'includes_equipment': True,
            'custom_menu_design': True,
            'is_active': True,
            'is_featured': True,
            'sort_order': 2
        },
        {
            'name': 'Luxury',
            'slug': 'luxury',
            'description': 'The ultimate wellness cocktail experience',
            'price_per_person': 75.00,
            'features': ['Unlimited cocktail selection', 'Premium organic ingredients', 'Full-day service', '2 professional bartenders', 'Custom menu design', 'Event coordination'],
            'max_guests': 200,
            'min_guests': 25,
            'service_hours': 8,
            'cocktail_count': 10,
            'includes_bartender': True,
            'includes_ingredients': True,
            'includes_equipment': True,
            'custom_menu_design': True,
            'is_active': True,
            'is_featured': False,
            'sort_order': 3
        }
    ]
    
    for pkg_data in packages_data:
        package = EventPackage(**pkg_data)
        db.session.add(package)
    
    # Create event testimonials
    testimonials_data = [
        {
            'client_name': 'Marie Dubois',
            'client_role': 'Wedding Coordinator',
            'client_company': 'Elegant Events Bordeaux',
            'content': 'SOBRE transformed our wedding reception into an unforgettable wellness experience. The healthy cocktails were a hit with all our guests!',
            'rating': 5,
            'event_type': 'wedding',
            'is_featured': True,
            'is_approved': True,
            'display_order': 1
        },
        {
            'client_name': 'Jean-Luc Martin',
            'client_role': 'Corporate Event Manager',
            'client_company': 'TechStart Bordeaux',
            'content': 'Our company retreat was elevated by SOBRE\'s professional service and innovative healthy drink options. Highly recommended!',
            'rating': 5,
            'event_type': 'corporate',
            'is_featured': True,
            'is_approved': True,
            'display_order': 2
        }
    ]
    
    for test_data in testimonials_data:
        testimonial = EventTestimonial(**test_data)
        db.session.add(testimonial)
    
    try:
        db.session.commit()
        print("Database seeded successfully with SOBRE data!")
    except Exception as e:
        db.session.rollback()
        print(f"Error seeding database: {e}")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

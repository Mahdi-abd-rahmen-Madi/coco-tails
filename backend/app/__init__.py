from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_restx import Api
from config import config

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()

def create_app(config_name='default'):
    """Application factory pattern"""
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Initialize API with Swagger documentation
    api = Api(
        app,
        version='1.0',
        title='Coco Tails API',
        description='Premium Healthy Cocktails API - Wellness meets mixology',
        doc='/api/docs/',
        prefix='/api'
    )
    
    # Register blueprints and namespaces
    from app.routes.auth import auth_ns
    from app.routes.cocktails import cocktails_ns
    from app.routes.ingredients import ingredients_ns
    from app.routes.subscriptions import subscriptions_ns
    from app.routes.classes import classes_ns
    from app.routes.users import users_ns
    
    api.add_namespace(auth_ns, path='/auth')
    api.add_namespace(cocktails_ns, path='/cocktails')
    api.add_namespace(ingredients_ns, path='/ingredients')
    api.add_namespace(subscriptions_ns, path='/subscriptions')
    api.add_namespace(classes_ns, path='/classes')
    api.add_namespace(users_ns, path='/users')
    
    # Import models to ensure they are registered with SQLAlchemy
    from app.models import user, cocktail, ingredient, subscription, virtual_class
    
    return app

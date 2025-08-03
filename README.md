# Coco Tails - Premium Healthy Cocktails Website

🍃 **Revolutionizing the cocktail industry with wellness-focused, natural ingredients and mindful drinking experiences.**

## Project Overview

Coco Tails is a premium healthy cocktails service that combines luxurious design with wellness-first principles. Our platform offers:

- **Interactive Cocktail Builder** with health metrics tracking
- **Premium Ingredient Glossary** with nutritional benefits
- **Virtual Mixology Classes** with world-class experts
- **Subscription Service** for curated wellness ingredients
- **Health-Conscious Community** for mindful drinking enthusiasts

## 🎨 Brand Identity

- **Voice**: Sophisticated, health-conscious, celebratory, knowledgeable
- **Personality**: Premium wellness brand meets craft cocktail expertise
- **Values**: Health-first, sustainability, quality ingredients, mindful consumption
- **Target Audience**: Health-conscious millennials and Gen-Z, wellness enthusiasts, premium cocktail lovers

## 🛠 Technology Stack

### Frontend (React + Vite)
- **Framework**: React 18+ with Vite for fast development
- **Styling**: Tailwind CSS with custom wellness-inspired color palette
- **Animations**: Framer Motion for smooth, performant animations
- **State Management**: Zustand for global state
- **HTTP Client**: Axios for API communication
- **Routing**: React Router for SPA navigation

### Backend (Flask)
- **Framework**: Flask with Flask-RESTful for API endpoints
- **Database**: SQLAlchemy ORM with SQLite (dev) / PostgreSQL (prod)
- **Authentication**: Flask-JWT-Extended for user authentication
- **API Documentation**: Flask-RESTX with Swagger UI
- **CORS**: Flask-CORS for cross-origin requests
- **Validation**: Marshmallow for request/response serialization

## 🚀 Quick Start

### Vercel Deployment

SOBRE frontend is configured for easy deployment on Vercel. Follow these steps to deploy:

1. Push your code to a GitHub, GitLab, or Bitbucket repository
2. Sign in to [Vercel](https://vercel.com)
3. Click "Add New..." → "Project"
4. Import your repository
5. Configure the project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Add environment variables if needed (e.g., API endpoints)
7. Click "Deploy"

Vercel will automatically deploy your site and provide you with a production URL. It will also set up automatic deployments on every push to your repository.

For custom domain setup, refer to [Vercel's documentation](https://vercel.com/docs/concepts/deployments/configure-deployments#configure-domains).

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Git

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Initialize database
flask init-db

# Seed with sample data
flask seed-db

# Start development server
python app.py
```

The backend API will be available at `http://localhost:5000`
API documentation at `http://localhost:5000/api/docs/`

## 📁 Project Structure

```
coco-tails/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── styles/         # Global styles and Tailwind config
│   │   └── assets/         # Images, icons, videos
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
│
├── backend/                 # Flask backend
│   ├── app/
│   │   ├── models/         # SQLAlchemy models
│   │   ├── routes/         # API route handlers
│   │   └── __init__.py     # Flask app factory
│   ├── requirements.txt    # Python dependencies
│   ├── config.py           # Configuration settings
│   └── app.py              # Main application entry point
│
└── README.md              # Project documentation
```

## 🎯 Key Features

### ✨ Hero Section with Animations
- **Animated liquid effects** simulating cocktail mixing
- **Interactive ingredient particles** floating across screen
- **Gradient backgrounds** shifting between wellness colors
- **Smooth scroll-triggered animations** for premium feel
- **Mouse-following interactive elements**

### 🍹 Core Functionality
- **User Authentication** with JWT tokens
- **Cocktail Database** with detailed nutritional information
- **Ingredient Glossary** with health benefits and sourcing
- **Virtual Classes** booking and management system
- **Subscription Plans** with different tiers
- **User Profiles** with preferences and favorites

### 🎨 Design System
- **Color Palette**: Vibrant greens, sophisticated golds, deep purples
- **Typography**: Modern clean fonts with elegant serif accents
- **Components**: Premium cards, glass morphism effects, gradient buttons
- **Animations**: Floating particles, liquid blobs, smooth transitions

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user profile

### Cocktails
- `GET /api/cocktails/` - List cocktails with filtering
- `GET /api/cocktails/{id}` - Get cocktail details
- `GET /api/cocktails/featured` - Get featured cocktails
- `POST /api/cocktails/{id}/reviews` - Create cocktail review
- `POST /api/cocktails/{id}/favorite` - Toggle favorite

### Ingredients
- `GET /api/ingredients/` - List ingredients
- `GET /api/ingredients/{id}` - Get ingredient details
- `GET /api/ingredients/categories` - Get categories

### Virtual Classes
- `GET /api/classes/` - List upcoming classes
- `GET /api/classes/{id}` - Get class details
- `POST /api/classes/{id}/book` - Book a class
- `GET /api/classes/my-bookings` - Get user bookings

### Subscriptions
- `GET /api/subscriptions/` - Get user subscriptions
- `GET /api/subscriptions/plans` - Get available plans

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/favorites` - Get favorite cocktails
- `GET /api/users/dashboard` - Get dashboard data

## 🌟 Premium Features

### Health-First Approach
- Detailed nutritional information for every cocktail
- Health benefits tracking and recommendations
- Dietary preference filtering (vegan, keto, gluten-free, etc.)
- Wellness category organization (detox, immunity, energy, etc.)

### Subscription Tiers
1. **Wellness Explorer** ($29.99/month)
   - 3 premium ingredient deliveries
   - 5 exclusive recipes
   - Basic nutritional guidance

2. **Mixology Master** ($59.99/month)
   - 6 premium ingredient deliveries
   - Unlimited recipes
   - 2 virtual classes per month
   - Personal nutrition consultation

3. **Wellness Connoisseur** ($99.99/month)
   - Unlimited ingredient deliveries
   - All premium content
   - Unlimited virtual classes
   - Personal mixologist consultation

## 🎓 Virtual Mixology Classes
- Live interactive sessions with expert mixologists
- Beginner to advanced difficulty levels
- Ingredient education and health benefits
- Recipe customization based on dietary needs
- Recording access for premium subscribers

## 🔒 Security Features
- JWT-based authentication with refresh tokens
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration for secure API access
- Environment-based configuration management

## 📱 Responsive Design
- Mobile-first responsive design
- Optimized for tablets and desktop
- Touch-friendly interactions
- Fast loading with optimized animations
- Accessible design following WCAG guidelines

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend Deployment
```bash
cd backend
# Set FLASK_CONFIG=production
# Configure production database
# Deploy using gunicorn or similar WSGI server
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from premium wellness brands
- Health and nutrition data from certified sources
- Cocktail recipes developed by professional mixologists
- Community feedback from wellness enthusiasts

---

**Built with ❤️ for the health-conscious cocktail community**

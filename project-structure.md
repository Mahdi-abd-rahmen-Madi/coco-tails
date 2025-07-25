# Coco Tails - Premium Healthy Cocktails Website

## Project Structure

```
coco-tails/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   ├── styles/         # Global styles and Tailwind config
│   │   ├── assets/         # Images, icons, videos
│   │   └── api/            # API service functions
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
│
├── backend/                 # Flask backend
│   ├── app/
│   │   ├── models/         # SQLAlchemy models
│   │   ├── routes/         # API route handlers
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utility functions
│   │   └── __init__.py     # Flask app factory
│   ├── migrations/         # Database migrations
│   ├── requirements.txt    # Python dependencies
│   └── config.py           # Configuration settings
│
├── docker/                 # Docker configuration
├── docs/                   # Documentation
└── README.md              # Project documentation
```

## Technology Stack

### Frontend
- React 18+ with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- Zustand for state management
- Axios for API calls
- React Router for navigation

### Backend
- Flask with Flask-RESTful
- SQLAlchemy ORM
- Flask-JWT-Extended for auth
- Flask-CORS for cross-origin requests
- Marshmallow for serialization
- PostgreSQL database

## Brand Guidelines
- Colors: Vibrant greens, sophisticated golds, deep purples, clean whites
- Typography: Modern clean fonts with elegant serif accents
- Style: Minimalist luxury with organic, flowing elements

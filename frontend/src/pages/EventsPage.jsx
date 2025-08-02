import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, Clock, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const EventsPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingEvents = [
    {
      id: 1,
      title: 'Mixology Masterclass',
      date: '2023-11-15',
      time: '18:00 - 20:00',
      location: 'SOBRE Bar, Paris',
      description: 'Learn the art of crafting healthy cocktails from our expert mixologists.',
      price: '€45',
      image: '/images/events/masterclass.jpg',
      featured: true
    },
    {
      id: 2,
      title: 'Live Jazz & Mocktails',
      date: '2023-11-20',
      time: '19:00 - 23:00',
      location: 'SOBRE Bar, Paris',
      description: 'An evening of smooth jazz and crafted non-alcoholic cocktails.',
      price: '€25',
      image: '/images/events/jazz-night.jpg'
    },
    {
      id: 3,
      title: 'Wellness Workshop',
      date: '2023-12-05',
      time: '17:00 - 19:00',
      location: 'SOBRE Bar, Paris',
      description: 'Discover the health benefits of mindful drinking and botanical ingredients.',
      price: '€35',
      image: '/images/events/wellness-workshop.jpg'
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: 'Summer Garden Party',
      date: '2023-07-22',
      time: '14:00 - 20:00',
      location: 'SOBRE Bar, Paris',
      description: 'A celebration of summer with refreshing botanical drinks and live music.',
      price: '€30',
      image: '/images/events/summer-party.jpg'
    },
    {
      id: 5,
      title: 'Spring Equinox Tasting',
      date: '2023-03-20',
      time: '18:00 - 21:00',
      location: 'SOBRE Bar, Paris',
      description: 'Seasonal ingredients and fresh flavors to welcome spring.',
      price: '€40',
      image: '/images/events/spring-tasting.jpg'
    }
  ];

  const handleRSVP = (eventId) => {
    // Handle RSVP logic here
    console.log('RSVP for event:', eventId);
    // This would typically open a modal or redirect to a booking page
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderEventCard = (event) => (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ${
        event.featured ? 'ring-2 ring-primary-500' : ''
      }`}
    >
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {event.featured && (
          <div className="absolute top-4 right-4 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-wellness-charcoal mb-1">{event.title}</h3>
            <p className="text-wellness-sage">{event.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">{event.price}</div>
            <div className="text-sm text-gray-500">per person</div>
          </div>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600 mb-6">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-primary-500" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-primary-500" />
            {event.time}
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-primary-500" />
            {event.location}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleRSVP(event.id)}
          className="w-full bg-gradient-to-r from-wellness-gold-500 to-wellness-gold-600 hover:from-wellness-gold-600 hover:to-wellness-gold-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
        >
          RSVP Now
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-50 to-gold-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-wellness-charcoal mb-6">
              Upcoming <span className="gradient-text">Events</span>
            </h1>
            <p className="text-xl text-wellness-sage mb-8 max-w-3xl mx-auto">
              Join us for exclusive mixology classes, tasting events, and wellness workshops.
              Discover the art of mindful drinking in a vibrant, social atmosphere.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex justify-center mb-12 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 font-medium text-lg ${
                activeTab === 'upcoming'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-3 font-medium text-lg ${
                activeTab === 'past'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Past Events
            </button>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeTab === 'upcoming' 
              ? upcomingEvents.map(renderEventCard)
              : pastEvents.map(renderEventCard)
            }
          </div>

          {activeTab === 'past' && pastEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No past events to display.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-gold-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-wellness-charcoal mb-6">
            Never Miss an Event
          </h2>
          <p className="text-xl text-wellness-sage mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about upcoming events,
            special offers, and new menu items.
          </p>
          
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-l-lg border border-r-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button className="bg-gradient-to-r from-wellness-gold-500 to-wellness-gold-600 hover:from-wellness-gold-600 hover:to-wellness-gold-700 text-white font-semibold px-6 rounded-r-lg transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;

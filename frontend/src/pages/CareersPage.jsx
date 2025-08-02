import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Award, Heart, Send } from 'lucide-react';

const CareersPage = () => {
  const openPositions = [
    {
      id: 1,
      title: 'Mixologist',
      type: 'Full-time',
      location: 'Paris, France',
      department: 'Beverage',
      description: 'Join our team of expert mixologists to create innovative, health-conscious cocktail recipes using premium ingredients.'
    },
    {
      id: 2,
      title: 'Nutrition Specialist',
      type: 'Part-time',
      location: 'Remote',
      department: 'Research & Development',
      description: 'Help us analyze and improve the nutritional profile of our cocktails while maintaining exceptional taste.'
    },
    {
      id: 3,
      title: 'Brand Ambassador',
      type: 'Contract',
      location: 'Multiple Locations',
      department: 'Marketing',
      description: 'Represent SOBRE at events, tastings, and demos to spread the word about our healthy cocktail movement.'
    }
  ];

  const benefits = [
    {
      icon: <Award className="w-8 h-8 text-primary-600" />,
      title: 'Competitive Pay',
      description: 'We offer competitive salaries and performance-based bonuses.'
    },
    {
      icon: <Heart className="w-8 h-8 text-primary-600" />,
      title: 'Health & Wellness',
      description: 'Comprehensive health benefits and wellness programs.'
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: 'Great Team',
      description: 'Work with passionate, like-minded individuals.'
    },
    {
      icon: <Briefcase className="w-8 h-8 text-primary-600" />,
      title: 'Growth Opportunities',
      description: 'Professional development and career advancement.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-wellness-cream pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-wellness-mint rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-wellness-charcoal mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-wellness-sage max-w-3xl mx-auto">
            Help us revolutionize the cocktail industry with wellness-focused, natural ingredients.
          </p>
        </div>

        {/* Why Work With Us */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-serif font-bold text-center text-wellness-charcoal mb-12">
            Why Work at SOBRE?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-wellness-charcoal mb-2">
                  {benefit.title}
                </h3>
                <p className="text-wellness-sage">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center text-wellness-charcoal mb-12">
            Open Positions
          </h2>
          
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-wellness-charcoal">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          {position.type}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {position.location}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {position.department}
                        </span>
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
                      Apply Now
                    </button>
                  </div>
                  <p className="mt-4 text-wellness-sage">
                    {position.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Join Our Talent Network */}
          <div className="mt-16 bg-gradient-to-r from-primary-50 to-wellness-cream p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-serif font-semibold text-wellness-charcoal mb-4">
              Don't See Your Dream Job?
            </h3>
            <p className="text-wellness-sage mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. Send us your resume and tell us why you'd be a great fit for SOBRE.
            </p>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
              <Send className="w-5 h-5 mr-2" />
              Submit Your Resume
            </button>
          </div>
        </div>

        {/* Company Culture */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center text-wellness-charcoal mb-8">
            Our Culture
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="prose max-w-none text-wellness-sage">
              <p className="text-lg">
                At SOBRE, we believe that what you drink should be as nourishing as it is delicious. Our team is passionate about creating premium, health-conscious cocktails that don't compromise on taste or quality.
              </p>
              <p>
                We value innovation, sustainability, and a commitment to wellness. Our work environment is collaborative, inclusive, and encourages continuous learning and growth. If you're passionate about mixology, health, and creating exceptional experiences, we'd love to hear from you.
              </p>
              <p>
                Join us in our mission to revolutionize the cocktail industry, one healthy sip at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;

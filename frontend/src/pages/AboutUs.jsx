import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Image from '../components/ui/Image';

const AboutUs = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Alex Rivera',
      role: 'Master Mixologist',
      bio: 'With over 15 years of experience in crafting exceptional cocktails, Alex brings innovation and expertise to every creation.',
      image: '/images/team/alex-rivera.jpg'
    },
    {
      id: 2,
      name: 'Sophia Chen',
      role: 'Nutrition Specialist',
      bio: 'Sophia ensures that every ingredient we use not only tastes amazing but also provides maximum health benefits.',
      image: '/images/team/sophia-chen.jpg'
    },
    {
      id: 3,
      name: 'Marcus Johnson',
      role: 'Botanical Expert',
      bio: 'Marcus sources the finest organic and sustainable ingredients from around the world for our unique flavor profiles.',
      image: '/images/team/marcus-johnson.jpg'
    }
  ];

  // Placeholder component for team member images
  const TeamMemberPlaceholder = ({ bgColor }) => (
    <div className={`w-full h-full ${bgColor} flex items-center justify-center`}>
      <div className="text-4xl text-white">👥</div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-wellness-cream to-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="/images/about/hero-about.jpg"
          alt="Our Story"
          className="w-full h-full object-cover"
          containerClassName="w-full h-full"
          placeholder={
            <div className="w-full h-full bg-gradient-to-r from-wellness-charcoal/90 to-wellness-sage/90 flex items-center justify-center">
              <h1 className="text-5xl md:text-6xl text-white font-serif font-bold">Our Story</h1>
            </div>
          }
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-serif font-bold text-wellness-charcoal mb-6">Crafting Wellness, One Sip at a Time</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-wellness-gold-400 to-transparent mx-auto mb-8"></div>
          <p className="text-lg text-wellness-sage max-w-3xl mx-auto">
            At SOBRE, we believe that what you drink should be as nourishing as it is delicious. 
            Our journey began with a simple idea: to create cocktails that not only taste incredible 
            but also support your wellbeing.
          </p>
        </motion.div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-96 rounded-xl overflow-hidden shadow-xl"
          >
            <Image
              src="/images/about/our-mission.jpg"
              alt="Our Mission"
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
              placeholder={
                <div className="w-full h-full bg-gradient-to-r from-primary-100 to-primary-200 flex items-center justify-center">
                  <div className="text-4xl">🌱</div>
                </div>
              }
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-serif font-bold text-wellness-charcoal mb-4">Our Mission</h3>
            <p className="text-lg text-wellness-sage mb-6">
              To revolutionize the cocktail experience by combining premium spirits with functional, 
              health-supporting ingredients that enhance your wellbeing without compromising on taste.
            </p>
            <ul className="space-y-4">
              {[
                { icon: '✨', text: 'Crafting with intention and purpose' },
                { icon: '🌿', text: 'Sourcing sustainable, organic ingredients' },
                { icon: '💫', text: 'Innovating the future of mindful drinking' },
                { icon: '❤️', text: 'Supporting your wellness journey' }
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-wellness-charcoal">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Team Section */}
        <section className="py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-wellness-charcoal mb-6">Meet Our Team</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-wellness-gold-400 to-transparent mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="aspect-square rounded-full overflow-hidden mb-6 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    containerClassName="w-full h-full"
                    placeholder={
                      <TeamMemberPlaceholder 
                        bgColor={['from-primary-200 to-primary-300', 'from-gold-200 to-gold-300', 'from-purple-200 to-purple-300'][index % 3]}
                      />
                    }
                  />
                </div>
                <h3 className="text-2xl font-serif font-bold text-wellness-charcoal mb-1">{member.name}</h3>
                <p className="text-wellness-gold-600 font-medium mb-3">{member.role}</p>
                <p className="text-wellness-sage">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-gradient-to-r from-wellness-charcoal to-wellness-sage text-white rounded-2xl p-12 text-center"
        >
          <h3 className="text-3xl font-serif font-bold mb-4">Ready to Experience SOBRE?</h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join us in redefining what a cocktail can be. Discover our menu, book a class, or visit our bar to experience the SOBRE difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/menu" 
              className="bg-white text-wellness-charcoal font-semibold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 text-center"
            >
              View Our Menu
            </Link>
            <Link 
              to="/virtual-classes" 
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-300 text-center"
            >
              Book a Class
            </Link>
          </div>
        </motion.section>
      </section>
    </div>
  );
};

export default AboutUs;

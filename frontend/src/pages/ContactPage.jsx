import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ContactPage = () => {
  const position = [44.6585, -1.1694]; // Arcachon, France coordinates

  useEffect(() => {
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  const contactInfo = [
    { icon: <MapPin className="w-6 h-6 text-primary-600" />, title: 'Address', content: '123 Avenue de la Plage, 33120 Arcachon, France', link: 'https://maps.app.goo.gl/example', isLink: true },
    { icon: <Phone className="w-6 h-6 text-primary-600" />, title: 'Phone', content: '+33 5 56 83 01 23', link: 'tel:+33556830123', isLink: true },
    { icon: <Mail className="w-6 h-6 text-primary-600" />, title: 'Email', content: 'contact@sobre-arcachon.com', link: 'mailto:contact@sobre-arcachon.com', isLink: true },
    { icon: <Clock className="w-6 h-6 text-primary-600" />, title: 'Opening Hours', content: 'Monday - Sunday: 11:00 AM - 11:00 PM', isLink: false }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-wellness-cream min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto h-full flex flex-col justify-center px-4">
          <motion.h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Visit Us
          </motion.h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-2xl">
            We'd love to welcome you to our bar in beautiful Arcachon, France
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-96 w-full">
              <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                  <Popup>
                    <div className="font-sans">
                      <h3 className="font-bold text-lg">SOBRE Arcachon</h3>
                      <p className="text-sm">123 Avenue de la Plage</p>
                      <p className="text-sm">33120 Arcachon, France</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-wellness-charcoal mb-4">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-wellness-gold-400 to-transparent mx-auto mb-6"></div>
            <p className="text-lg text-wellness-sage max-w-2xl mx-auto">
              Have questions or want to make a reservation? We're here to help!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-wellness-cream p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-wellness-charcoal mb-2">
                  {item.title}
                </h3>
                {item.isLink ? (
                  <a 
                    href={item.link} 
                    className="text-wellness-sage hover:text-primary-600 transition-colors"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-wellness-sage">{item.content}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

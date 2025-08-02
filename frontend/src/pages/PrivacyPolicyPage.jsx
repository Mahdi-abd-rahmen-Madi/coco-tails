import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';

const PrivacyPolicyPage = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content: 'We collect personal information you provide (name, email, address, payment details) and automatically collect usage data through cookies.'
    },
    {
      title: 'How We Use Your Information',
      content: 'To process orders, improve our services, communicate with you, and comply with legal obligations.'
    },
    {
      title: 'Data Sharing',
      content: 'We only share your information with service providers, legal authorities when required, or with your consent.'
    },
    {
      title: 'Your Rights',
      content: 'You have the right to access, update, or delete your information, and to opt-out of marketing communications.'
    },
    {
      title: 'Security',
      content: 'We implement security measures to protect your data, though no method is 100% secure.'
    },
    {
      title: 'Contact Us',
      content: 'For privacy concerns, contact us at privacy@sobredrinks.com. Last Updated: July 31, 2024.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-wellness-cream pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-wellness-mint rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-wellness-charcoal mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-wellness-sage max-w-3xl mx-auto">
            Last Updated: July 31, 2024
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
          <div className="prose max-w-none text-wellness-sage">
            <p className="text-lg mb-8">
              At SOBRE, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.
            </p>
            
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                >
                  <h3 className="text-xl font-semibold text-wellness-charcoal mb-3 flex items-center">
                    {section.title === 'Security' || section.title === 'Contact Us' ? (
                      <Lock className="w-5 h-5 mr-2 text-primary-600" />
                    ) : (
                      <Shield className="w-5 h-5 mr-2 text-primary-600" />
                    )}
                    {section.title}
                  </h3>
                  <p className="text-wellness-sage">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                By using our website, you consent to our Privacy Policy and agree to its terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

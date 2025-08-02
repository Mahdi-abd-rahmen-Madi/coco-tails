import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const FAQPage = () => {
  const faqs = [
    {
      question: 'What makes SOBRE cocktails different?',
      answer: 'Our cocktails are crafted with premium, organic ingredients that are free from artificial additives and refined sugars. We focus on functional ingredients that provide health benefits without compromising on taste.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Currently, we ship within France and to select European countries. Please check our Shipping & Returns page for the full list of countries we serve.'
    },
    {
      question: 'Are your cocktails alcoholic?',
      answer: 'We offer both non-alcoholic and low-ABV options. All our drinks are clearly labeled with their alcohol content so you can make informed choices.'
    },
    {
      question: 'How should I store my SOBRE cocktails?',
      answer: 'For optimal freshness, keep unopened bottles refrigerated. Once opened, we recommend consuming within 3-5 days and keeping refrigerated.'
    },
    {
      question: 'Can I customize my subscription?',
      answer: 'Absolutely! You can customize your delivery frequency, quantity, and even create a custom flavor profile based on your preferences.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-wellness-cream pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-wellness-mint rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-wellness-charcoal mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-wellness-sage max-w-3xl mx-auto">
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-wellness-charcoal mb-2">
                {faq.question}
              </h3>
              <p className="text-wellness-sage">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-serif font-semibold text-wellness-charcoal mb-4">
            Still have questions?
          </h3>
          <p className="text-wellness-sage mb-6">
            Our support team is here to help you with any questions you may have.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-gradient-to-r from-wellness-gold-500 to-wellness-gold-600 hover:from-wellness-gold-600 hover:to-wellness-gold-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

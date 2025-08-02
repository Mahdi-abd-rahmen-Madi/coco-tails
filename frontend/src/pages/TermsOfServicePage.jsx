import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const TermsOfServicePage = () => {
  const sections = [
    { title: 'Introduction', content: 'By using SOBRE, you agree to these terms. These govern your access and use of our website and services.' },
    { title: 'Eligibility', content: 'You must be of legal drinking age in your country to purchase alcoholic beverages from our site.' },
    { title: 'Account Responsibility', content: 'You are responsible for maintaining the confidentiality of your account and all activities under it.' },
    { title: 'Ordering', content: 'All orders are subject to product availability and we reserve the right to cancel any order.' },
    { title: 'Intellectual Property', content: 'All content on our site is owned by SOBRE and protected by intellectual property laws.' },
    { title: 'Limitations', content: 'SOBRE is not liable for indirect, incidental, or consequential damages from using our services.' },
    { title: 'Governing Law', content: 'These terms are governed by the laws of France, without regard to conflict of law provisions.' },
    { title: 'Changes', content: 'We may update these terms at any time. Continued use of our services means you accept the changes.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-wellness-cream pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-wellness-mint rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-wellness-charcoal mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-wellness-sage">
            Last Updated: July 31, 2024
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
          <div className="prose max-w-none text-wellness-sage">
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
                  <h3 className="text-xl font-semibold text-wellness-charcoal mb-3">
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
                If you have any questions about these Terms, please contact us at legal@sobredrinks.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;

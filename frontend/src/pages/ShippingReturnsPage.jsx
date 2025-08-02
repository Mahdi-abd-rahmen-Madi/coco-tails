import React from 'react';
import { motion } from 'framer-motion';
import { Truck, RefreshCw, Shield } from 'lucide-react';

const ShippingReturnsPage = () => {
  const shippingInfo = [
    {
      icon: <Truck className="w-6 h-6 text-primary-600" />,
      title: 'Shipping Information',
      content: 'We process and ship orders within 1-2 business days. Delivery times vary by location but typically take 2-5 business days within France and 5-10 business days for international orders.'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-primary-600" />,
      title: 'Returns & Exchanges',
      content: 'We want you to be completely satisfied with your purchase. If you\'re not happy with your order, you may return unopened products within 30 days for a full refund or exchange.'
    },
    {
      icon: <Shield className="w-6 h-6 text-primary-600" />,
      title: 'Damaged or Defective Items',
      content: 'In the rare event that your order arrives damaged or defective, please contact us within 48 hours of delivery with photos of the damaged items and your order number.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-wellness-cream pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-wellness-mint rounded-full flex items-center justify-center mx-auto mb-6">
            <Truck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-wellness-charcoal mb-4">
            Shipping & Returns
          </h1>
          <p className="text-xl text-wellness-sage max-w-3xl mx-auto">
            Everything you need to know about shipping, delivery, and returns.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
          {shippingInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-wellness-charcoal mb-2">
                {item.title}
              </h3>
              <p className="text-wellness-sage">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-serif font-semibold text-wellness-charcoal mb-6">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-wellness-charcoal mb-2">
                What are your shipping rates?
              </h3>
              <p className="text-wellness-sage">
                Standard shipping within France is €5.99. Free shipping on all orders over €50. International shipping rates vary by destination and will be calculated at checkout.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-wellness-charcoal mb-2">
                How do I track my order?
              </h3>
              <p className="text-wellness-sage">
                Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-wellness-charcoal mb-2">
                What is your return policy?
              </h3>
              <p className="text-wellness-sage">
                We accept returns of unopened products within 30 days of delivery. Please contact our customer service team to initiate a return. Return shipping is the responsibility of the customer unless the item is damaged or defective.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturnsPage;

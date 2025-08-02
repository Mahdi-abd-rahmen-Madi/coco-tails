import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, CreditCard, Mail, User, MessageSquare } from 'lucide-react';

const GiftCardsPage = () => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const giftCardAmounts = [25, 50, 75, 100, 150, 200];

  const handlePurchase = (e) => {
    e.preventDefault();
    setIsPurchasing(true);
    
    // Simulate purchase processing
    setTimeout(() => {
      setIsPurchasing(false);
      setPurchaseComplete(true);
    }, 2000);
  };

  if (purchaseComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-wellness-cream pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-wellness-charcoal mb-4">
              Gift Card Sent Successfully!
            </h1>
            <p className="text-lg text-wellness-sage mb-8">
              A €{selectedAmount} gift card has been sent to {recipientEmail}.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
              <p className="font-medium text-gray-900 mb-2">Recipient:</p>
              <p className="text-gray-700 mb-4">{recipientName} &lt;{recipientEmail}&gt;</p>
              <p className="font-medium text-gray-900 mb-2">Your Message:</p>
              <p className="text-gray-700 italic">"{message || 'No message provided'}"</p>
            </div>
            <button
              onClick={() => setPurchaseComplete(false)}
              className="bg-gradient-to-r from-wellness-gold-500 to-wellness-gold-600 hover:from-wellness-gold-600 hover:to-wellness-gold-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300"
            >
              Buy Another Gift Card
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-wellness-cream pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-wellness-mint rounded-full flex items-center justify-center mx-auto mb-6">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-wellness-charcoal mb-4">
            Gift Cards
          </h1>
          <p className="text-xl text-wellness-sage max-w-3xl mx-auto">
            The perfect gift for the health-conscious cocktail lover in your life.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-serif font-semibold text-wellness-charcoal mb-6">
              Send a SOBRE Gift Card
            </h2>
            
            <form onSubmit={handlePurchase}>
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Amount (€)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {giftCardAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setSelectedAmount(amount)}
                      className={`py-3 px-4 rounded-lg border-2 text-center font-medium transition-all ${
                        selectedAmount === amount
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-primary-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      €{amount}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient's Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="recipientName"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter recipient's name"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient's Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="recipientEmail"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter recipient's email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Personal Message (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      rows={4}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Add a personal message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-wellness-charcoal">€{selectedAmount}</span>
                </div>
                <button
                  type="submit"
                  disabled={isPurchasing}
                  className="w-full bg-gradient-to-r from-wellness-gold-500 to-wellness-gold-600 hover:from-wellness-gold-600 hover:to-wellness-gold-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  {isPurchasing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Purchase Gift Card
                    </>
                  )}
                </button>
                <p className="mt-3 text-center text-sm text-gray-500">
                  Your gift card will be delivered via email within minutes.
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-serif font-semibold text-center text-wellness-charcoal mb-8">
            Gift Card Terms & Conditions
          </h3>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <ul className="space-y-4 text-sm text-gray-600 list-disc pl-5">
              <li>Gift cards never expire and have no fees.</li>
              <li>Gift cards can be used for any purchase on sobredrinks.com.</li>
              <li>Gift cards cannot be redeemed for cash unless required by law.</li>
              <li>SOBRE is not responsible for lost or stolen gift cards.</li>
              <li>Gift cards can only be used for purchases in the same currency as the gift card.</li>
              <li>For balance inquiries, please contact our customer service team.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCardsPage;

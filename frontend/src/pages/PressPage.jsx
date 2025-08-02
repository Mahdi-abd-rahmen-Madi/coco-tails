import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Download, Mail, FileText } from 'lucide-react';

const PressPage = () => {
  const pressMentions = [
    {
      id: 1,
      title: 'SOBRE: The Future of Mindful Drinking',
      source: 'The Wellness Journal',
      date: 'May 2024',
      excerpt: 'How SOBRE is revolutionizing the cocktail industry with their health-conscious approach to mixology.'
    },
    {
      id: 2,
      title: '5 Healthy Cocktail Brands to Watch in 2024',
      source: 'Sip Magazine',
      date: 'April 2024',
      excerpt: 'SOBRE leads our list of innovative brands making waves in the wellness beverage space.'
    },
    {
      id: 3,
      title: 'Interview with SOBRE Founder: The Art of Healthy Mixology',
      source: 'The Mixologist',
      date: 'March 2024',
      excerpt: 'An in-depth conversation about the inspiration behind SOBRE and the future of healthy drinking.'
    }
  ];

  const pressKitAssets = [
    {
      title: 'Brand Guidelines',
      description: 'Download our complete brand guidelines including logo usage, colors, and typography.',
      type: 'PDF',
      size: '2.4 MB'
    },
    {
      title: 'High-Resolution Logo Pack',
      description: 'Vector and PNG versions of our logo in various formats and color variations.',
      type: 'ZIP',
      size: '5.7 MB'
    },
    {
      title: 'Product Images',
      description: 'High-quality images of our product line for press and marketing use.',
      type: 'ZIP',
      size: '18.2 MB'
    },
    {
      title: 'Team Headshots',
      description: 'Professional photos of our leadership team and mixologists.',
      type: 'ZIP',
      size: '12.8 MB'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-wellness-cream pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-wellness-mint rounded-full flex items-center justify-center mx-auto mb-6">
            <Newspaper className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-wellness-charcoal mb-4">
            Press Room
          </h1>
          <p className="text-xl text-wellness-sage max-w-3xl mx-auto">
            Latest news, press releases, and media resources about SOBRE.
          </p>
        </div>

        {/* Press Inquiries */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-sm mb-16">
          <h2 className="text-2xl font-serif font-semibold text-wellness-charcoal mb-6">
            Press Inquiries
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <p className="text-wellness-sage mb-6">
                For media inquiries, interview requests, or additional information, please contact our PR team.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                    <a href="mailto:press@sobredrinks.com" className="text-base text-primary-600 hover:text-primary-800">
                      press@sobredrinks.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Stay Updated</h3>
              <p className="text-sm text-gray-600 mb-4">
                Sign up to receive press releases and company announcements.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Press Kit */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-serif font-semibold text-wellness-charcoal mb-6">
            Press Kit
          </h2>
          <p className="text-wellness-sage mb-8">
            Download our brand assets and media resources for press and marketing use.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {pressKitAssets.map((asset, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{asset.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{asset.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {asset.type}
                        </span>
                        <span className="text-xs text-gray-500">{asset.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Press Mentions */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-semibold text-wellness-charcoal mb-6">
            In The News
          </h2>
          
          <div className="space-y-6">
            {pressMentions.map((item, index) => (
              <motion.div
                key={item.id}
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
                        {item.title}
                      </h3>
                      <div className="flex items-center mt-2">
                        <span className="text-sm font-medium text-gray-900">{item.source}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
                      Read Article
                    </button>
                  </div>
                  <p className="mt-4 text-wellness-sage">
                    {item.excerpt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Press Releases */}
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-semibold text-wellness-charcoal mb-6">
              Press Releases
            </h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">SOBRE Launches New Line of Zero-Proof Cocktails</h3>
                    <div className="mt-1 text-sm text-gray-500">March 15, 2024</div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
                      <FileText className="w-4 h-4 mr-2" />
                      Read Release
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">SOBRE Secures $5M in Series A Funding</h3>
                    <div className="mt-1 text-sm text-gray-500">January 28, 2024</div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
                      <FileText className="w-4 h-4 mr-2" />
                      Read Release
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">SOBRE Named 'Best New Beverage Brand' at Global Drinks Awards</h3>
                    <div className="mt-1 text-sm text-gray-500">November 5, 2023</div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
                      <FileText className="w-4 h-4 mr-2" />
                      Read Release
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressPage;

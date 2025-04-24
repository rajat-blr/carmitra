import React, { useState } from 'react';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
    console.log('Newsletter signup with email:', email);
    setEmail('');
    // Could show a success message here
  };

  return (
    <div className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-700">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-3 text-white">Stay Updated With CarMitra</h3>
              <p className="text-gray-400 mb-6">Get the latest car reviews, buying guides, and special offers delivered to your inbox.</p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="flex-grow p-4 rounded-xl border border-gray-700 bg-gray-800 text-white focus:border-purple-500 focus:ring focus:ring-purple-500/20 transition-all shadow-sm"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-purple-700 text-white px-6 py-4 rounded-xl hover:bg-purple-800 transition-all shadow-lg font-semibold whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div className="hidden md:flex justify-end">
              <img 
                src="/images/newsletter-car.png" 
                alt="Newsletter" 
                className="max-w-xs"
                onError={(e) => {
                  e.currentTarget.src = "https://www.freepnglogos.com/uploads/car-png/car-png-transparent-car-images-pluspng-37.png";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection; 
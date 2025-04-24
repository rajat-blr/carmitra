import React, { useState } from 'react';

const ComparisonSection: React.FC = () => {
  const [brand1, setBrand1] = useState('');
  const [brand2, setBrand2] = useState('');

  const brands = [
    { value: 'tata', label: 'Tata Motors' },
    { value: 'hyundai', label: 'Hyundai' },
    { value: 'suzuki', label: 'Suzuki' },
    { value: 'volkswagen', label: 'Volkswagen' },
    { value: 'skoda', label: 'Škoda' },
    { value: 'honda', label: 'Honda' },
    { value: 'mahindra', label: 'Mahindra' },
    { value: 'toyota', label: 'Toyota' }
  ];

  const getCarModels = (brand: string) => {
    const models: { [key: string]: { value: string; label: string }[] } = {
      tata: [
        { value: 'nexon', label: 'Nexon' },
        { value: 'punch', label: 'Punch' },
        { value: 'harrier', label: 'Harrier' },
        { value: 'safari', label: 'Safari' },
        { value: 'altroz', label: 'Altroz' },
      ],
      hyundai: [
        { value: 'creta', label: 'Creta' },
        { value: 'venue', label: 'Venue' },
        { value: 'i20', label: 'i20' },
        { value: 'verna', label: 'Verna' },
        { value: 'tucson', label: 'Tucson' },
      ],
      suzuki: [
        { value: 'brezza', label: 'Brezza' },
        { value: 'baleno', label: 'Baleno' },
        { value: 'swift', label: 'Swift' },
        { value: 'dzire', label: 'Dzire' },
        { value: 'grand-vitara', label: 'Grand Vitara' },
      ],
      volkswagen: [
        { value: 'virtus', label: 'Virtus' },
        { value: 'taigun', label: 'Taigun' },
        { value: 'tiguan', label: 'Tiguan' },
      ],
      skoda: [
        { value: 'slavia', label: 'Slavia' },
        { value: 'kushaq', label: 'Kushaq' },
        { value: 'kodiaq', label: 'Kodiaq' },
      ],
      honda: [
        { value: 'city', label: 'City' },
        { value: 'amaze', label: 'Amaze' },
        { value: 'elevate', label: 'Elevate' },
      ],
      mahindra: [
        { value: 'thar', label: 'Thar' },
        { value: 'xuv700', label: 'XUV700' },
        { value: 'scorpio', label: 'Scorpio' },
        { value: 'xuv300', label: 'XUV300' },
        { value: 'bolero', label: 'Bolero' },
      ],
      toyota: [
        { value: 'fortuner', label: 'Fortuner' },
        { value: 'innova', label: 'Innova Crysta' },
        { value: 'urban-cruiser', label: 'Urban Cruiser' },
        { value: 'glanza', label: 'Glanza' },
      ],
    };

    return models[brand] || [];
  };

  const handleCompare = () => {
    // Implement comparison functionality
    console.log(`Comparing: ${brand1} vs ${brand2}`);
  };

  const features = [
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>,
      label: 'Price Comparison'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>,
      label: 'Performance'
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>,
      label: 'Safety Features'
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://imgd.aeplcdn.com/664x374/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-4.jpeg" 
                alt="Compare Cars" 
                className="w-full h-[450px] object-cover object-center transform hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-800 to-amber-800/0 text-white px-6 py-3 rounded-br-2xl font-semibold">
                Featured Comparison
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-3 text-white">Compare Cars Side by Side</h2>
            <div className="w-20 h-1 bg-amber-700 mb-6"></div>
            <p className="text-lg text-gray-300 mb-8">
              Can't decide between two cars? Our detailed comparison tool helps you analyze price, features, specs, and ownership costs.
            </p>
            <div className="space-y-6 mb-8">
              {/* Car 1 Selection */}
              <div className="space-y-3">
                <label className="text-gray-300 font-medium inline-flex items-center">
                  <span className="flex items-center justify-center bg-amber-800 text-white rounded-full w-6 h-6 mr-2 text-sm">1</span>
                  Select First Car
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <select 
                    className="w-full p-3.5 rounded-xl border border-gray-700 bg-gray-800 text-white focus:border-amber-700 focus:ring focus:ring-amber-700/20 transition-all shadow-sm"
                    onChange={(e) => setBrand1(e.target.value)}
                    value={brand1}
                  >
                    <option value="">Select Brand</option>
                    {brands.map(brand => (
                      <option key={brand.value} value={brand.value}>{brand.label}</option>
                    ))}
                  </select>
                  <select 
                    className="w-full p-3.5 rounded-xl border border-gray-700 bg-gray-800 text-white focus:border-amber-700 focus:ring focus:ring-amber-700/20 transition-all shadow-sm"
                    disabled={!brand1}
                  >
                    <option value="">Select Model</option>
                    {getCarModels(brand1).map(model => (
                      <option key={model.value} value={model.value}>{model.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Car 2 Selection */}
              <div className="space-y-3">
                <label className="text-gray-300 font-medium inline-flex items-center">
                  <span className="flex items-center justify-center bg-amber-800 text-white rounded-full w-6 h-6 mr-2 text-sm">2</span>
                  Select Second Car
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <select 
                    className="w-full p-3.5 rounded-xl border border-gray-700 bg-gray-800 text-white focus:border-amber-700 focus:ring focus:ring-amber-700/20 transition-all shadow-sm"
                    onChange={(e) => setBrand2(e.target.value)}
                    value={brand2}
                  >
                    <option value="">Select Brand</option>
                    {brands.map(brand => (
                      <option key={brand.value} value={brand.value}>{brand.label}</option>
                    ))}
                  </select>
                  <select 
                    className="w-full p-3.5 rounded-xl border border-gray-700 bg-gray-800 text-white focus:border-amber-700 focus:ring focus:ring-amber-700/20 transition-all shadow-sm"
                    disabled={!brand2}
                  >
                    <option value="">Select Model</option>
                    {getCarModels(brand2).map(model => (
                      <option key={model.value} value={model.value}>{model.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <button 
              onClick={handleCompare}
              className="w-full bg-amber-800 text-white p-4 rounded-xl hover:bg-amber-700 transition-all shadow-lg font-semibold flex items-center justify-center group">
              <span>Compare Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-700">
                  {feature.icon}
                  <span className="text-sm text-gray-300">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSection; 
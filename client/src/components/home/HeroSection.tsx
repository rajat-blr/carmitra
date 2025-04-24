import React, { useState } from 'react';

interface HeroSectionProps {
  onSearch: (brand: string, model: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedBrand, selectedModel);
  };

  const carBrands = [
    { value: 'suzuki', label: 'Suzuki' },
    { value: 'honda', label: 'Honda' },
    { value: 'tata', label: 'Tata Motors' },
    { value: 'volkswagen', label: 'Volkswagen' },
    { value: 'skoda', label: 'Škoda' },
    { value: 'hyundai', label: 'Hyundai' },
    { value: 'toyota', label: 'Toyota' },
    { value: 'mahindra', label: 'Mahindra' },
    { value: 'ford', label: 'Ford' },
  ];

  const getCarModels = (brand: string) => {
    const models: { [key: string]: { value: string; label: string }[] } = {
      suzuki: [
        { value: 'brezza', label: 'Brezza' },
        { value: 'baleno', label: 'Baleno' },
        { value: 'swift', label: 'Swift' },
        { value: 'dzire', label: 'Dzire' },
        { value: 'ertiga', label: 'Ertiga' },
        { value: 'grand-vitara', label: 'Grand Vitara' },
        { value: 'fronx', label: 'Fronx' },
        { value: 'jimny', label: 'Jimny' },
      ],
      hyundai: [
        { value: 'creta', label: 'Creta' },
        { value: 'venue', label: 'Venue' },
        { value: 'i20', label: 'i20' },
        { value: 'verna', label: 'Verna' },
        { value: 'tucson', label: 'Tucson' },
      ],
      tata: [
        { value: 'nexon', label: 'Nexon' },
        { value: 'punch', label: 'Punch' },
        { value: 'harrier', label: 'Harrier' },
        { value: 'safari', label: 'Safari' },
        { value: 'altroz', label: 'Altroz' },
      ],
      toyota: [
        { value: 'fortuner', label: 'Fortuner' },
        { value: 'innova', label: 'Innova Crysta' },
        { value: 'urban-cruiser', label: 'Urban Cruiser' },
        { value: 'glanza', label: 'Glanza' },
        { value: 'camry', label: 'Camry' },
      ],
      honda: [
        { value: 'city', label: 'City' },
        { value: 'amaze', label: 'Amaze' },
        { value: 'elevate', label: 'Elevate' },
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
      mahindra: [
        { value: 'thar', label: 'Thar' },
        { value: 'xuv700', label: 'XUV700' },
        { value: 'scorpio', label: 'Scorpio' },
        { value: 'xuv300', label: 'XUV300' },
        { value: 'bolero', label: 'Bolero' },
        { value: 'xuv400', label: 'XUV400' },
      ],
      ford: [
        { value: 'ecosport', label: 'EcoSport' },
        { value: 'endeavour', label: 'Endeavour' },
        { value: 'figo', label: 'Figo' },
      ],
    };

    return models[brand] || [];
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <img 
        src="/images/thar.jpg" 
        alt="Mahindra Thar" 
        className="absolute w-full h-full object-cover object-center" 
      />
      <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-start">
        <div className="max-w-2xl pt-16 md:pt-20">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-600 text-white text-sm font-medium mb-4">
            India's First AI-Powered Car Platform
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-2 text-white leading-tight">
            Making Car Buying <span className="text-yellow-400">Smarter</span> With AI
          </h1>
          <div className="w-20 h-1 bg-yellow-400 mb-6"></div>
          <p className="text-xl mb-12 text-gray-100">
            Our AI analyzes thousands of reviews to help you find the perfect car that matches your needs and budget.
          </p>
          
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 w-full bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl">
            <select 
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setSelectedModel('');
              }}
              className="md:w-1/3 p-4 rounded-lg text-gray-800 bg-white border-0 focus:ring-2 focus:ring-yellow-500 transition-all shadow-sm"
            >
              <option value="">Select Brand</option>
              {carBrands.map(brand => (
                <option key={brand.value} value={brand.value}>{brand.label}</option>
              ))}
            </select>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="md:w-1/3 p-4 rounded-lg text-gray-800 bg-white border-0 focus:ring-2 focus:ring-yellow-500 transition-all shadow-sm"
            >
              <option value="">Select Model</option>
              {getCarModels(selectedBrand).map(model => (
                <option key={model.value} value={model.value}>{model.label}</option>
              ))}
            </select>
            <button 
              type="submit"
              className="md:w-1/3 bg-yellow-500 text-gray-900 p-4 rounded-lg hover:bg-yellow-400 transition-all font-semibold shadow-lg transform hover:scale-105"
            >
              AI-Powered Search
            </button>
          </form>
        </div>
      </div>
      
      {/* Floating stats */}
      <div className="absolute bottom-0 right-0 mb-8 mr-8 z-20 flex gap-6 bg-black/30 backdrop-blur-lg p-4 rounded-xl border border-white/20">
        <div className="text-center">
          <p className="text-4xl font-bold text-white">5000+</p>
          <p className="text-sm text-gray-200">Reviews</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-white">120+</p>
          <p className="text-sm text-gray-200">Car Models</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-white">10+</p>
          <p className="text-sm text-gray-200">AI Insights</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 
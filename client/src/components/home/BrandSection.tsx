import React from 'react';

const BrandSection: React.FC = () => {
  const brands = [
    'suzuki',
    'honda',
    'tata',
    'mahindra',
    'volkswagen',
    'skoda',
    'hyundai',
    'toyota'
  ];

  return (
    <div className="py-24 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-100">
            Trusted by Auto Enthusiasts
          </h2>
          <div className="w-24 h-1 bg-amber-700 mx-auto"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-10 md:gap-16">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center justify-center h-16 group">
              <img 
                src={`/brands/${brand}.png`}
                alt={brand.charAt(0).toUpperCase() + brand.slice(1)}
                className="max-h-full w-auto brightness-[0.9] invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500 transform group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSection; 
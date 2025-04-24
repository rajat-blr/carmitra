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
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Trusted by Lakhs of Auto Enthusiasts
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-10 md:gap-16">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center justify-center h-16 group">
              <img 
                src={`/brands/${brand}.png`}
                alt={brand.charAt(0).toUpperCase() + brand.slice(1)}
                className="max-h-full w-auto grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSection; 
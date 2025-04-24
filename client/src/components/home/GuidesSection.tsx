import React from 'react';

interface GuideItem {
  id: number;
  title: string;
  image: string;
}

const GuidesSection: React.FC = () => {
  const buyingGuides: GuideItem[] = [
    {
      id: 1,
      title: 'Petrol vs Diesel vs CNG: Which Fuel Type is Right for You?',
      image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/132513/scorpio-n-exterior-right-front-three-quarter-75.jpeg'
    },
    {
      id: 2,
      title: 'Top 10 Budget-Friendly Cars Under ₹10 Lakh in 2024',
      image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/142865/punch-ev-exterior-right-front-three-quarter-2.jpeg'
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Expert Advice</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">Latest Buying Tips & Guides</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {buyingGuides.map(guide => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-medium transition-all inline-flex items-center">
            <span>View All Guides</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

interface GuideCardProps {
  guide: GuideItem;
}

const GuideCard: React.FC<GuideCardProps> = ({ guide }) => {
  return (
    <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="relative overflow-hidden">
        <img 
          src={guide.image} 
          alt={guide.title} 
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full mb-3">Buying Guide</span>
          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
            {guide.title}
          </h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">Our experts analyze the key factors to consider before making your purchase decision.</p>
        <button className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
          Read More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default GuidesSection; 
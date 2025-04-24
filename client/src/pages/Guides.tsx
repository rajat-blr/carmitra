import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Guide, guideService } from '../services/api';

const Guides: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const data = await guideService.getAllGuides();
        setGuides(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching guides:', err);
        setError('Failed to load guides. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  // Get unique categories
  const categories = ['All', ...new Set(guides.map(guide => guide.category))];
  
  // Filter guides by selected category
  const filteredGuides = selectedCategory === 'All' 
    ? guides 
    : guides.filter(guide => guide.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-red-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Error Loading Guides</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Car Buying Guides & Tips</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light">
          Expert advice, tips, and in-depth guides to help you make the right car buying decisions.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-primary-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredGuides.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">
            No guides found in the {selectedCategory} category.
          </p>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              View All Guides
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide) => {
            const date = new Date(guide.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });
            
            return (
              <Link 
                key={guide.uuid} 
                to={`/tips-and-guides/${guide.uuid}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full transform hover:-translate-y-1"
              >
                {/* Card top accent */}
                <div className="h-1.5 bg-gradient-to-r from-primary-500 to-primary-700"></div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-block bg-primary-50 text-primary-800 text-xs px-3 py-1.5 rounded-full font-medium tracking-wide">
                      {guide.category}
                    </span>
                    <span className="text-gray-500 text-xs flex items-center bg-gray-50 px-2.5 py-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {guide.readTime} min read
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors">
                    {guide.title}
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">{guide.summary}</p>
                  <div className="flex justify-end text-sm text-gray-500 mt-auto border-t border-gray-100 pt-3">
                    <span>{date}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Guides; 
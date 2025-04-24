import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Guide, guideService } from '../../services/api';

const GuidesSection: React.FC = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const data = await guideService.getAllGuides();
        // Get top 4 guides
        const topGuides = data.slice(0, 4);
        setGuides(topGuides);
        setError(null);
      } catch (err) {
        console.error('Error fetching guides:', err);
        // Fallback to sample guides if API fails
        setGuides([
          {
            uuid: 'sample-1',
            title: 'Petrol vs Diesel vs CNG: Which Fuel Type is Right for You?',
            category: 'Fuel Types',
            summary: 'Understand the pros and cons of each fuel type to make an informed choice.',
            content: '',
            tags: [],
            authorName: 'CarMitra Team',
            publishDate: new Date().toISOString(),
            readTime: 5
          },
          {
            uuid: 'sample-2',
            title: 'Top 10 Budget-Friendly Cars Under ₹10 Lakh in 2024',
            category: 'Budget Cars',
            summary: 'Discover the best cars that offer excellent value without breaking the bank.',
            content: '',
            tags: [],
            authorName: 'CarMitra Team',
            publishDate: new Date().toISOString(),
            readTime: 7
          },
          {
            uuid: 'sample-3',
            title: 'How to Choose the Right Car for a Family of Four',
            category: 'Family Cars',
            summary: 'Find the perfect balance of space, safety, and features for your family needs.',
            content: '',
            tags: [],
            authorName: 'CarMitra Team',
            publishDate: new Date().toISOString(),
            readTime: 6
          },
          {
            uuid: 'sample-4',
            title: 'Understanding Car Financing and Loan Options in India',
            category: 'Financing',
            summary: 'Navigate the complex world of auto loans and find the best financing solution.',
            content: '',
            tags: [],
            authorName: 'CarMitra Team',
            publishDate: new Date().toISOString(),
            readTime: 8
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  return (
    <div className="py-24 bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-wider">Expert Advice</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 text-white">Latest Buying Tips & Guides</h2>
          <div className="w-24 h-1 bg-amber-700 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map(guide => (
            <GuideCard key={guide.uuid} guide={guide} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link 
            to="/tips-and-guides"
            className="bg-amber-800 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-medium transition-all inline-flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <span>View All Guides</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

interface GuideCardProps {
  guide: Guide;
}

const GuideCard: React.FC<GuideCardProps> = ({ guide }) => {
  return (
    <div className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 h-full flex flex-col transform hover:-translate-y-1">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-amber-500 to-amber-700"></div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-4">
          <span className="inline-block bg-amber-800/30 text-amber-400 text-xs px-3 py-1.5 rounded-full font-medium">
            {guide.category || 'Buying Guide'}
          </span>
          <span className="text-amber-400/80 text-xs flex items-center bg-gray-800/50 px-2.5 py-1 rounded-full border border-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {guide.readTime} min
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-4 line-clamp-2">
          {guide.title}
        </h3>
        
        <p className="text-gray-300 mb-6 line-clamp-3 flex-grow">{guide.summary || 'Our experts analyze the key factors to consider before making your purchase decision.'}</p>
        
        <Link 
          to={`/tips-and-guides/${guide.uuid}`}
          className="inline-flex items-center mt-auto text-amber-500 font-medium group-hover:text-amber-400 transition-colors"
        >
          Read More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default GuidesSection; 
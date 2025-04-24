import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Guide, guideService } from '../services/api';

const GuideDetail: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchGuide = async () => {
      if (!uuid) return;
      
      try {
        setLoading(true);
        const data = await guideService.getGuideById(uuid);
        setGuide(data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching guide ${uuid}:`, err);
        setError('Failed to load guide. The guide might not exist or has been removed.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchGuide();
  }, [uuid]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 relative animate-spin">
            <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-transparent border-t-primary-600 border-b-primary-600"></div>
          </div>
          <p className="mt-4 text-gray-500">Loading article...</p>
        </div>
      </div>
    );
  }
  
  if (error || !guide) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-red-50 rounded-xl p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Error Loading Guide</h2>
          <p className="text-red-600 mb-6">{error || 'Guide not found'}</p>
          <button 
            onClick={() => navigate('/tips-and-guides')}
            className="px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
          >
            Back to Guides
          </button>
        </div>
      </div>
    );
  }
  
  const formattedDate = new Date(guide.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="max-w-screen-xl mx-auto">
      {/* Hero section with gradient background */}
      <div className="bg-gradient-to-r from-gray-50 via-primary-50 to-gray-50 px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <Link 
            to="/tips-and-guides" 
            className="inline-flex items-center text-primary-600 mb-8 hover:text-primary-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Guides
          </Link>
          
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="inline-block bg-primary-100 text-primary-800 text-xs px-3 py-1 rounded-full font-medium tracking-wide">
              {guide.category}
            </span>
            {guide.tags.map(tag => (
              <span key={tag} className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">{guide.title}</h1>
          
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">{guide.summary}</p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mt-8">
            <span className="text-base">{formattedDate}</span>
            <div className="flex items-center bg-white px-3 py-2 rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{guide.readTime} min read</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content with card design */}
      <div className="px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Top gradient accent */}
          <div className="h-1.5 bg-gradient-to-r from-primary-500 to-primary-700"></div>
          
          <div 
            className="prose prose-lg lg:prose-xl max-w-none p-8 md:p-12"
            dangerouslySetInnerHTML={{ __html: guide.content }}
          />
        </div>
        
        {/* Related articles or navigation card */}
        <div className="max-w-3xl mx-auto mt-12 p-8 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Continue Reading</h3>
          <p className="text-gray-600 mb-4">Explore more of our expert guides to help with your car buying journey.</p>
          <Link 
            to="/tips-and-guides"
            className="inline-flex items-center px-5 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
          >
            Browse All Guides
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Custom styles for article content */}
      <style jsx>{`
        .prose h2 {
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: #1a202c;
          font-weight: 700;
          font-size: 1.75rem;
          line-height: 1.3;
          position: relative;
          padding-bottom: 0.5rem;
        }
        
        .prose h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 3rem;
          height: 0.25rem;
          background: linear-gradient(to right, #0284c7, #38bdf8);
          border-radius: 0.25rem;
        }
        
        .prose h3 {
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: #2d3748;
          font-weight: 600;
          font-size: 1.35rem;
        }
        
        .prose p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          color: #4a5568;
        }
        
        .prose ul, .prose ol {
          margin-bottom: 1.75rem;
          padding-left: 1.5rem;
        }
        
        .prose li {
          margin-bottom: 0.5rem;
          padding-left: 0.25rem;
        }
        
        .prose ul li::marker {
          color: #0284c7;
        }
        
        .prose ol li::marker {
          color: #0284c7;
          font-weight: 600;
        }
        
        .prose a {
          color: #0284c7;
          text-decoration: underline;
          transition: color 0.15s ease;
        }
        
        .prose a:hover {
          color: #026592;
        }
        
        .prose blockquote {
          font-style: italic;
          color: #4a5568;
          border-left: 4px solid #e2e8f0;
          padding-left: 1rem;
        }
        
        .prose strong {
          color: #2d3748;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default GuideDetail; 
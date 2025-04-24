import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Review {
  id: number;
  image: string;
  authorName: string;
  authorLocation: string;
  review: string;
  carName: string;
}

const ReviewSection: React.FC = () => {
  // Sample data - replace with actual data later
  const trendingReviews = [
    {
      id: 1,
      image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-71.jpeg',
      authorName: 'Rajesh Kumar',
      authorLocation: 'बैंगलोर',
      review: 'Great safety features and comfortable ride quality. The 5-star safety rating gives peace of mind.',
      carName: 'Tata Nexon'
    },
    {
      id: 2,
      image: '/images/thar.jpg',
      authorName: 'Priya Sharma',
      authorLocation: 'पुणे',
      review: 'Perfect off-roading capability and iconic design. The new Thar is much more comfortable for daily driving.',
      carName: 'Mahindra Thar'
    },
    {
      id: 3,
      image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/10544/1689589297739/front-left-side-47.jpg',
      authorName: 'Amit Patel',
      authorLocation: 'दिल्ली',
      review: 'Feature-packed and spacious interior. The panoramic sunroof is a standout feature that my family loves.',
      carName: 'Hyundai Creta'
    },
    {
      id: 4,
      image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti-Suzuki/Grand-Vitara/10505/1689583025095/front-left-side-47.jpg',
      authorName: 'Neha Gupta',
      authorLocation: 'हैदराबाद',
      review: 'Excellent fuel efficiency with strong hybrid technology. Very smooth to drive in city traffic.',
      carName: 'Suzuki Grand Vitara'
    },
    {
      id: 5,
      image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV700/10299/1689594311724/front-left-side-47.jpg',
      authorName: 'Vikram Singh',
      authorLocation: 'चंडीगढ़',
      review: 'The ADAS features are a game-changer for highway driving. Spacious 7-seater with powerful performance.',
      carName: 'Mahindra XUV700'
    },
    {
      id: 6,
      image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Honda/City/9710/1677914238296/front-left-side-47.jpg',
      authorName: 'Kavita Reddy',
      authorLocation: 'चेन्नई',
      review: 'Refined engine and excellent ride comfort. Honda reliability makes it a perfect sedan for family use.',
      carName: 'Honda City'
    }
  ];

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  
  const showNextReviews = () => {
    setCurrentReviewIndex((prevIndex) => 
      prevIndex + 2 >= trendingReviews.length ? 0 : prevIndex + 2
    );
  };
  
  const showPrevReviews = () => {
    setCurrentReviewIndex((prevIndex) => 
      prevIndex - 2 < 0 ? trendingReviews.length - (trendingReviews.length % 2 === 0 ? 2 : 1) : prevIndex - 2
    );
  };

  const visibleReviews = [
    trendingReviews[currentReviewIndex],
    trendingReviews[(currentReviewIndex + 1) % trendingReviews.length]
  ];

  return (
    <div className="py-24 bg-gradient-to-br from-gray-900 to-indigo-950 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold relative inline-block">
              Top Trending Reviews
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-yellow-400"></span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl">Discover what real owners have to say about their cars</p>
          </div>
          <div className="flex gap-3 mt-6 md:mt-0">
            <button 
              onClick={showPrevReviews}
              className="bg-gray-800/50 hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-300 border border-gray-700"
              aria-label="Previous reviews"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={showNextReviews}
              className="bg-gray-800/50 hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-300 border border-gray-700"
              aria-label="Next reviews"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {visibleReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          {Array.from({length: Math.ceil(trendingReviews.length / 2)}).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentReviewIndex(index * 2)}
              className={`mx-1.5 w-3 h-3 rounded-full transition-all duration-300 ${currentReviewIndex === index * 2 ? 'bg-blue-500 w-8' : 'bg-gray-600 hover:bg-gray-500'}`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] border border-gray-700/50 shadow-xl group">
      <div className="aspect-video overflow-hidden">
        <img src={review.image} alt={review.carName} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
      </div>
      <div className="p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mr-4 flex items-center justify-center text-xl font-bold text-white">
            {review.authorName.charAt(0)}
          </div>
          <div>
            <h3 className="font-medium text-lg">{review.authorName}</h3>
            <p className="text-sm text-gray-400">{review.authorLocation}</p>
          </div>
          <div className="ml-auto">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
          </div>
        </div>
        <h4 className="text-2xl font-semibold mb-3">{review.carName}</h4>
        <div className="border-l-4 border-blue-500 pl-4 mb-6">
          <p className="text-gray-300 italic">{review.review}</p>
        </div>
        <Link to="/reviews" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors group">
          Read Full Review
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ReviewSection; 
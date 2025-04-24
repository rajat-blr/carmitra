import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Review {
  _id: string;
  carModel: string;
  rating: number;
  comment: string;
  dealershipName: string;
  city: string;
  purchaseDate: string;
  createdAt: string;
  variant: string;
  ownershipDuration: number;
}

// Map of car model names to their image paths
const carImageMap: Record<string, string> = {
  "Tata Nexon": "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-71.jpeg",
  "Mahindra Thar": "/images/thar.jpg",
  "Hyundai Creta": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/10544/1689589297739/front-left-side-47.jpg",
  "Maruti Suzuki Grand Vitara": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti-Suzuki/Grand-Vitara/10505/1689583025095/front-left-side-47.jpg",
  "Mahindra XUV700": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV700/10299/1689594311724/front-left-side-47.jpg",
  "Honda City": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Honda/City/9710/1677914238296/front-left-side-47.jpg",
  "Maruti Suzuki Swift": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti-Suzuki/Swift/10560/1689246636307/front-left-side-47.jpg",
  "Maruti Suzuki Baleno": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti-Suzuki/Baleno/10682/1680172880581/front-left-side-47.jpg",
  "Toyota Innova Crysta": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Toyota/Innova-Crysta/10862/1690288100608/front-left-side-47.jpg",
  "MG Hector": "https://stimg.cardekho.com/images/carexteriorimages/930x620/MG/Hector/10624/1687870325167/front-left-side-47.jpg",
  "Maruti Suzuki Ertiga": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti-Suzuki/Ertiga/10479/1682580925048/front-left-side-47.jpg",
  "Volkswagen Taigun": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Volkswagen/Taigun/10307/1690191244227/front-left-side-47.jpg",
  "Tata Harrier": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Harrier/10619/1693561692398/front-left-side-47.jpg",
  "Hyundai i20": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/i20/9482/1680171352476/front-left-side-47.jpg",
  "Kia Carens": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Kia/Carens/9848/1672992523475/front-left-side-47.jpg",
  "Maruti Suzuki Brezza": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti-Suzuki/Brezza/10311/1688642876385/front-left-side-47.jpg",
  "Jeep Compass": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Jeep/Compass/9119/1686815065762/front-left-side-47.jpg",
  "Toyota Fortuner": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Toyota/Fortuner/11097/1690444642159/front-left-side-47.jpg",
  "Hyundai Venue": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Venue/10137/1687940269952/front-left-side-47.jpg",
  "Honda Amaze": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Honda/Amaze/9624/1675688448283/front-left-side-47.jpg",
  "Maruti Suzuki Dzire": "/images/dzire.jpg"
};

// Function to get image URL for a car model
const getCarImageUrl = (carModel: string): string => {
  // Check for exact match first
  if (carImageMap[carModel]) {
    return carImageMap[carModel];
  }
  
  // Try to find a partial match
  const carModelLower = carModel.toLowerCase();
  for (const [key, url] of Object.entries(carImageMap)) {
    if (carModelLower.includes(key.toLowerCase()) || key.toLowerCase().includes(carModelLower)) {
      return url;
    }
  }
  
  // Return a fallback image from a reliable source
  return "/images/default-car.jpg";
};

const ReviewSection: React.FC = () => {
  const [trendingReviews, setTrendingReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  
  useEffect(() => {
    const fetchTrendingReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/cars/reviews');
        
        // Sort reviews by rating (descending) to get top-rated reviews
        const sortedReviews = [...response.data]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6); // Take top 6 reviews
          
        setTrendingReviews(sortedReviews);
        setError(null);
      } catch (err) {
        setError('Failed to load trending reviews');
        console.error('Error fetching trending reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrendingReviews();
  }, []);
  
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

  const visibleReviews = trendingReviews.length >= 2 
    ? [
        trendingReviews[currentReviewIndex],
        trendingReviews[(currentReviewIndex + 1) % trendingReviews.length]
      ]
    : trendingReviews;

  if (loading) {
    return (
      <div className="py-24 bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-700"></div>
        </div>
      </div>
    );
  }

  if (error || trendingReviews.length === 0) {
    return (
      <div className="py-24 bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold relative inline-block mb-8">
            Top Trending Reviews
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-amber-700"></span>
          </h2>
          <p className="text-gray-400 mt-4">
            {error || "No reviews available yet. Be the first to write a review!"}
          </p>
          <Link to="/submit-review" className="mt-8 inline-flex items-center px-6 py-3 bg-amber-800 text-white rounded-lg hover:bg-amber-700 transition-colors">
            Write a Review
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-gradient-to-br from-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold relative inline-block">
              Top Trending Reviews
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-amber-700"></span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl">Discover what real owners have to say about their cars</p>
          </div>
          {trendingReviews.length > 2 && (
            <div className="flex gap-3 mt-6 md:mt-0">
              <button 
                onClick={showPrevReviews}
                className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-300 border border-gray-700"
                aria-label="Previous reviews"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={showNextReviews}
                className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-300 border border-gray-700"
                aria-label="Next reviews"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {visibleReviews.map(review => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
        {trendingReviews.length > 2 && (
          <div className="flex justify-center mt-10">
            {Array.from({length: Math.ceil(trendingReviews.length / 2)}).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReviewIndex(index * 2)}
                className={`mx-1.5 w-3 h-3 rounded-full transition-all duration-300 ${currentReviewIndex === index * 2 ? 'bg-amber-700 w-8' : 'bg-gray-700 hover:bg-gray-600'}`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  // Extract first name and last name from car model for placeholder author
  const nameParts = review.carModel.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts[1] : 'Owner';
  
  // Calculate rating stars
  const fullStars = Math.floor(review.rating);
  const hasHalfStar = review.rating % 1 >= 0.5;
  
  const [imgSrc, setImgSrc] = useState(getCarImageUrl(review.carModel));
  const [imgError, setImgError] = useState(false);
  
  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      setImgSrc("/images/default-car.jpg");
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] border border-gray-700 shadow-xl group">
      <div className="aspect-video overflow-hidden">
        <img 
          src={imgSrc} 
          alt={review.carModel} 
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
          onError={handleImageError}
        />
      </div>
      <div className="p-8">
        <div className="flex items-center mb-6">
          <div>
            <h3 className="font-medium text-lg">{`${firstName} ${lastName}`}</h3>
            <p className="text-sm text-gray-400">{review.city}</p>
          </div>
          <div className="ml-auto">
            <div className="flex space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < fullStars ? 'text-yellow-400' : (i === fullStars && hasHalfStar ? 'text-yellow-400' : 'text-gray-600')}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
          </div>
        </div>
        <h4 className="text-2xl font-semibold mb-3">{review.carModel}</h4>
        <div className="border-l-4 border-amber-700 pl-4 mb-6">
          <p className="text-gray-400 italic line-clamp-3">{review.comment}</p>
        </div>
        <Link to={`/reviews/${review._id}`} className="inline-flex items-center px-4 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-700 transition-colors group">
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
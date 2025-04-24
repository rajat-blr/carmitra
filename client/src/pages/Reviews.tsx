import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';

interface Review {
    _id?: string;
    carModel: string;
    rating: number;
    comment: string;
    dealershipName: string;
    city: string;
    purchaseDate: string;
    salesExperienceRating: number;
    createdAt: string;
    pricePaid: number;
    ownershipDuration: number;
    pros: string[];
    cons: string[];
    fuelEfficiency: number;
    variant: string;
}

const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await axios.get<Review[]>('/api/cars/reviews');
            setReviews(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load reviews. Please try again later.');
            console.error('Error fetching reviews:', err);
        } finally {
            setLoading(false);
        }
    };

    const searchReviews = useCallback(async (query: string) => {
        if (!query.trim()) {
            fetchReviews();
            return;
        }
        
        try {
            setSearching(true);
            const response = await axios.get<Review[]>(`/api/cars/search?query=${encodeURIComponent(query)}`);
            setReviews(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to search reviews. Please try again later.');
            console.error('Error searching reviews:', err);
        } finally {
            setSearching(false);
        }
    }, []);
    
    // Debounce search function
    useEffect(() => {
        const timer = setTimeout(() => {
            searchReviews(searchQuery);
        }, 500); // 500ms debounce time
        
        return () => clearTimeout(timer);
    }, [searchQuery, searchReviews]);
    
    useEffect(() => {
        fetchReviews();
    }, [location.key]);

    if (loading && !searching) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                    <p className="mt-4 text-gray-600">Loading reviews...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-16">
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700 mb-4 text-lg">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-primary-600 text-white px-6 py-3 rounded-full hover:bg-primary-700 transition-all shadow-md"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-3xl p-8 mb-10 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Car Reviews</h1>
                        <p className="text-gray-600 max-w-xl">Read honest opinions from real car owners across India</p>
                    </div>
                    <Link 
                        to="/submit-review"
                        className="bg-primary-600 text-white px-6 py-3 rounded-full hover:bg-primary-700 transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Write a Review
                    </Link>
                </div>
                
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by car model, dealership, or city..."
                        className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searching && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary-600"></div>
                        </div>
                    )}
                </div>
            </div>
            
            {reviews.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                    <img 
                        src="/images/empty-reviews.svg" 
                        alt="No reviews" 
                        className="w-40 h-40 mx-auto mb-6 opacity-70"
                        onError={(e) => {
                            e.currentTarget.src = "https://img.icons8.com/clouds/100/000000/car.png";
                        }}
                    />
                    {searchQuery ? (
                        <>
                            <p className="text-gray-600 mb-4 text-lg">No reviews matching your search criteria.</p>
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-300 transition-all"
                            >
                                Clear Search
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="text-gray-600 mb-4 text-lg">No reviews yet. Be the first to share your experience!</p>
                            <Link 
                                to="/submit-review"
                                className="bg-primary-600 text-white px-8 py-3 rounded-full hover:bg-primary-700 transition-all shadow-md inline-flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Submit a Review
                            </Link>
                        </>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviews.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reviews;
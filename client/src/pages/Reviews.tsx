import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarReview from '../components/CarReview';
import { Link, useLocation } from 'react-router-dom';

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
}

const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
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

    useEffect(() => {
        fetchReviews();
    }, [location.key]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500 mb-4">{error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Car Reviews</h1>
                <Link 
                    to="/submit-review"
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                >
                    Write a Review
                </Link>
            </div>
            
            {reviews.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">No reviews yet. Be the first to share your experience!</p>
                    <Link 
                        to="/submit-review"
                        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                    >
                        Submit a Review
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <CarReview key={review._id} review={review} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reviews;
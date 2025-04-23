import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const ReviewDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [review, setReview] = useState<Review | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Review>(`/api/cars/reviews/${id}`);
                setReview(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to load review. The review might not exist or has been removed.');
                console.error('Error fetching review:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReview();
    }, [id]);

    const renderStars = (rating: number) => (
        <div className="flex">
            {Array(5).fill(0).map((_, index) => (
                <span 
                    key={index}
                    className={`${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                </span>
            ))}
        </div>
    );

    const formatDuration = (months: number): string => {
        if (months === 0) return '0 months';
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        
        const yearText = years > 0 ? `${years} ${years === 1 ? 'year' : 'years'}` : '';
        const monthText = remainingMonths > 0 ? `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}` : '';
        
        if (yearText && monthText) {
            return `${yearText}, ${monthText}`;
        }
        return yearText || monthText;
    };

    const formatPurchaseDate = (dateString: string): string => {
        try {
            if (dateString.includes('/')) {
                // Handle MM/YYYY format
                const [month, year] = dateString.split('/');
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                                   'July', 'August', 'September', 'October', 'November', 'December'];
                return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
            }
            
            const date = new Date(dateString);
            return date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long'
            });
        } catch (e) {
            return dateString;
        }
    };

    const formattedDate = review?.createdAt 
        ? new Date(review.createdAt).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : '';

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                    <p className="mt-4 text-gray-600">Loading review...</p>
                </div>
            </div>
        );
    }

    if (error || !review) {
        return (
            <div className="text-center py-16">
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700 mb-6 text-lg">{error || 'Review not found'}</p>
                    <div className="flex justify-center gap-4">
                        <button 
                            onClick={() => navigate(-1)}
                            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-300 transition-all"
                        >
                            Go Back
                        </button>
                        <Link 
                            to="/reviews"
                            className="bg-primary-600 text-white px-6 py-3 rounded-full hover:bg-primary-700 transition-all shadow-md"
                        >
                            All Reviews
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <Link 
                    to="/reviews"
                    className="text-primary-600 font-medium flex items-center hover:text-primary-700 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to all reviews
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="p-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{review.carModel}</h1>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                    {review.variant || 'Standard'}
                                </span>
                                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                                    {review.fuelEfficiency} kmpl
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex items-center mb-2">
                                {renderStars(review.rating)}
                                <span className="ml-2 font-semibold text-lg text-gray-700">{review.rating}/5</span>
                            </div>
                            <span className="text-sm text-gray-600">
                                Owned for {formatDuration(review.ownershipDuration)}
                            </span>
                        </div>
                    </div>
                    
                    {/* Review Content */}
                    <div className="mb-10">
                        <div className="border-l-4 border-primary-500 pl-6 py-2 italic text-lg text-gray-700 bg-gray-50 rounded-r-lg mb-6">
                            "{review.comment}"
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gray-50 p-5 rounded-lg">
                                <h3 className="text-gray-800 font-semibold mb-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Dealership
                                </h3>
                                <p className="text-lg font-medium text-gray-800 mb-1">{review.dealershipName}</p>
                                <p className="text-gray-600 mb-1">{review.city}</p>
                                <div className="mt-2">
                                    <span className="text-sm text-gray-600">Sales Experience:</span>
                                    <div className="flex items-center mt-1">
                                        <div className="flex mr-2">
                                            {Array(5).fill(0).map((_, index) => (
                                                <span
                                                    key={index}
                                                    className={`${index < review.salesExperienceRating ? 'text-yellow-500' : 'text-gray-300'} text-sm`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            {review.salesExperienceRating}/5
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 p-5 rounded-lg">
                                <h3 className="text-gray-800 font-semibold mb-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Purchase Details
                                </h3>
                                <p className="text-lg font-medium text-gray-800 mb-1">₹{review.pricePaid.toLocaleString()}</p>
                                <p className="text-gray-600">{formatPurchaseDate(review.purchaseDate)}</p>
                            </div>
                            
                            <div className="bg-gray-50 p-5 rounded-lg">
                                <h3 className="text-gray-800 font-semibold mb-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Ownership
                                </h3>
                                <p className="text-lg font-medium text-gray-800 mb-1">{formatDuration(review.ownershipDuration)}</p>
                                {review.fuelEfficiency > 0 && (
                                    <p className="text-gray-600">Fuel Efficiency: {review.fuelEfficiency} kmpl</p>
                                )}
                            </div>
                        </div>
                        
                        {/* Pros & Cons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-green-50 p-5 rounded-lg">
                                <h3 className="font-semibold text-green-800 mb-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                    </svg>
                                    Pros
                                </h3>
                                <ul className="space-y-3">
                                    {review.pros && review.pros.length > 0 ? (
                                        review.pros.map((pro, index) => (
                                            <li key={index} className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0">
                                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">{pro}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-500 italic">No pros specified</li>
                                    )}
                                </ul>
                            </div>
                            
                            <div className="bg-red-50 p-5 rounded-lg">
                                <h3 className="font-semibold text-red-800 mb-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                                    </svg>
                                    Cons
                                </h3>
                                <ul className="space-y-3">
                                    {review.cons && review.cons.length > 0 ? (
                                        review.cons.map((con, index) => (
                                            <li key={index} className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0">
                                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-gray-700">{con}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-500 italic">No cons specified</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        
                        <div className="text-right mt-8 pt-4 border-t border-gray-100">
                            <time className="text-sm text-gray-500">
                                Review posted on {formattedDate}
                            </time>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewDetail; 
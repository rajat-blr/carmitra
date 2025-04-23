import React from 'react';
import { Link } from 'react-router-dom';

interface Review {
    _id?: string;
    carModel: string;
    rating: number;
    comment: string;
    dealershipName: string;
    city: string;
    ownershipDuration: number;
}

interface ReviewCardProps {
    review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    const reviewId = review._id || 'unknown';
    
    const renderStars = (rating: number) => (
        <div className="flex">
            {Array(5).fill(0).map((_, index) => (
                <span 
                    key={index}
                    className={`${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
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

    // Extract manufacturer from car model (first word)
    const manufacturer = review.carModel.split(' ')[0];
    
    // Extract model name (rest of the words)
    const modelName = review.carModel.split(' ').slice(1).join(' ');

    return (
        <Link to={`/reviews/${reviewId}`} className="block">
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg border border-gray-100 hover:border-primary-200 cursor-pointer transform hover:-translate-y-1 duration-300">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="flex items-center mb-1">
                                <span className="text-sm font-medium text-gray-500">{manufacturer}</span>
                                <span className="mx-2 text-gray-300">•</span>
                                <h3 className="text-lg font-bold text-gray-800">{modelName}</h3>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm text-gray-600">{review.city}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex items-center mb-1">
                                {renderStars(review.rating)}
                                <span className="ml-2 font-semibold text-gray-700">{review.rating}/5</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Brief Comment Preview */}
                    <div className="mb-4">
                        <p className="text-gray-700 line-clamp-2 text-sm italic">"{review.comment}"</p>
                    </div>
                    
                    {/* Footer Details */}
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="text-xs text-gray-600">{review.dealershipName}</span>
                        </div>
                        <div>
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                Owned: {formatDuration(review.ownershipDuration)}
                            </span>
                        </div>
                    </div>
                    
                    <div className="mt-3 flex justify-end">
                        <span className="text-primary-600 text-xs font-medium flex items-center">
                            View details
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ReviewCard; 
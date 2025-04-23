import React from 'react';

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

interface CarReviewProps {
    review: Review;
}

const CarReview: React.FC<CarReviewProps> = ({ review }) => {
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

    const formattedDate = new Date(review.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

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
            const date = new Date(dateString);
            return date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long'
            });
        } catch (e) {
            return dateString;
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg border border-gray-100">
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-5">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{review.carModel}</h3>
                        <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                                {review.variant}
                            </span>
                            <span className="px-2.5 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                                {review.fuelEfficiency} kmpl
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center mb-1">
                            {renderStars(review.rating)}
                            <span className="ml-2 font-semibold text-gray-700">{review.rating}/5</span>
                        </div>
                        <span className="text-xs text-gray-500">
                            Owned for {formatDuration(review.ownershipDuration)}
                        </span>
                    </div>
                </div>
                
                {/* Comment */}
                <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed italic">"{review.comment}"</p>
                </div>
                
                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col">
                        <span className="text-xs uppercase text-gray-500 font-medium mb-1">Dealership</span>
                        <span className="text-gray-800">{review.dealershipName}</span>
                        <span className="text-sm text-gray-600">{review.city}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs uppercase text-gray-500 font-medium mb-1">Purchase</span>
                        <span className="text-gray-800">₹{review.pricePaid.toLocaleString()}</span>
                        <span className="text-sm text-gray-600">{formatPurchaseDate(review.purchaseDate)}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs uppercase text-gray-500 font-medium mb-1">Sales Experience</span>
                        <div className="flex items-center">
                            {renderStars(review.salesExperienceRating)}
                            <span className="ml-2 text-sm text-gray-700">({review.salesExperienceRating}/5)</span>
                        </div>
                    </div>
                </div>
                
                {/* Pros & Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>
                            Pros
                        </h4>
                        <ul className="space-y-1">
                            {review.pros.map((pro, index) => (
                                <li key={index} className="text-gray-700 text-sm flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-green-600 mr-2 mt-1 flex-shrink-0">
                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                    </svg>
                                    {pro}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                            </svg>
                            Cons
                        </h4>
                        <ul className="space-y-1">
                            {review.cons.map((con, index) => (
                                <li key={index} className="text-gray-700 text-sm flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-red-600 mr-2 mt-1 flex-shrink-0">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                                    </svg>
                                    {con}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                <div className="text-right">
                    <time className="text-xs text-gray-500">
                        Posted on {formattedDate}
                    </time>
                </div>
            </div>
        </div>
    );
};

export default CarReview;
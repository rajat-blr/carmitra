import React from 'react';

interface Review {
    _id?: string; // MongoDB ObjectId
    carModel: string;
    rating: number;
    comment: string;
    createdAt: string;
}

interface CarReviewProps {
    review: Review;
}

const CarReview: React.FC<CarReviewProps> = ({ review }) => {
    const starRating = Array(5).fill(0).map((_, index) => (
        <span 
            key={index}
            className={`text-xl ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
            ★
        </span>
    ));

    const formattedDate = new Date(review.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="bg-white rounded-lg shadow-md p-6 transition-shadow hover:shadow-lg">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{review.carModel}</h3>
                <div className="flex items-center">
                    <div className="flex mr-2">
                        {starRating}
                    </div>
                    <span className="text-sm text-gray-600">{review.rating}/5</span>
                </div>
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>
            
            <div className="text-right">
                <time className="text-sm text-gray-500 italic">
                    Posted on {formattedDate}
                </time>
            </div>
        </div>
    );
};

export default CarReview;
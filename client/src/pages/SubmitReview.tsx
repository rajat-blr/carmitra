import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ReviewSubmission {
    make: string;
    model: string;
    year: string;
    rating: number;
    comment: string;
    dealershipName: string;
    city: string;
    purchaseDate: string;
    salesExperienceRating: number;
}

const SubmitReview: React.FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<ReviewSubmission>({
        make: '',
        model: '',
        year: '',
        rating: 5,
        comment: '',
        dealershipName: '',
        city: '',
        purchaseDate: '',
        salesExperienceRating: 5
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        
        try {
            // Validate purchase date format (MM/YYYY)
            if (!/^\d{2}\/\d{4}$/.test(formData.purchaseDate)) {
                throw new Error('Purchase date must be in MM/YYYY format');
            }

            await axios.post('/api/cars/reviews', {
                carModel: `${formData.make} ${formData.model} ${formData.year}`,
                rating: Number(formData.rating),
                comment: formData.comment,
                dealershipName: formData.dealershipName,
                city: formData.city,
                purchaseDate: formData.purchaseDate,
                salesExperienceRating: Number(formData.salesExperienceRating)
            });
            
            navigate('/reviews');
        } catch (error) {
            console.error('Error submitting review:', error);
            setError(error instanceof Error ? error.message : 'Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStars = (name: 'rating' | 'salesExperienceRating', value: number) => {
        return (
            <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleChange({
                            target: { name, value: star.toString() }
                        } as React.ChangeEvent<HTMLInputElement>)}
                        className={`text-2xl ${
                            star <= Number(formData[name]) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    >
                        ★
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Submit a Car Review</h1>
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Make</label>
                        <input
                            type="text"
                            name="make"
                            value={formData.make}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Model</label>
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Year</label>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            min="1900"
                            max={new Date().getFullYear() + 1}
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Dealership Name</label>
                        <input
                            type="text"
                            name="dealershipName"
                            value={formData.dealershipName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Purchase Date (MM/YYYY)</label>
                        <input
                            type="text"
                            name="purchaseDate"
                            value={formData.purchaseDate}
                            onChange={handleChange}
                            placeholder="MM/YYYY"
                            pattern="\d{2}/\d{4}"
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Overall Rating</label>
                        {renderStars('rating', formData.rating)}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Sales Experience Rating</label>
                        {renderStars('salesExperienceRating', formData.salesExperienceRating)}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Review</label>
                    <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        rows={4}
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md transition-colors
                        ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default SubmitReview;
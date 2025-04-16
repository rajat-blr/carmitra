import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ReviewSubmission {
    make: string;
    model: string;
    year: string;
    rating: number;
    comment: string;
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
        comment: ''
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
            await axios.post('/api/cars/reviews', {
                carModel: `${formData.make} ${formData.model} ${formData.year}`,
                rating: Number(formData.rating),
                comment: formData.comment
            });
            
            // Redirect to reviews page after successful submission
            navigate('/reviews');
        } catch (error) {
            console.error('Error submitting review:', error);
            setError('Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6">
            <h1 className="text-2xl font-bold mb-6">Submit a Car Review</h1>
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    <label className="block text-sm font-medium mb-1">Rating</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        min="1"
                        max="5"
                        required
                        disabled={isSubmitting}
                    />
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
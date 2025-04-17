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
    pricePaid: number;
    ownershipDuration: number;
    pros: string[];
    cons: string[];
    fuelEfficiency: number;
    variant: string;
}

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

const SubmitReview: React.FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Calculate current date once when component mounts
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const calculateOwnershipDuration = (purchaseDate: string): number => {
        if (!/^\d{2}\/\d{4}$/.test(purchaseDate)) return 0;
        
        const [monthStr, yearStr] = purchaseDate.split('/');
        const purchaseMonth = parseInt(monthStr, 10) - 1; // Convert to 0-based month
        const purchaseYear = parseInt(yearStr, 10);
        
        // Calculate months between dates
        const months = (currentYear - purchaseYear) * 12 + (currentMonth - purchaseMonth);
        return Math.max(0, months);
    };

    const [formData, setFormData] = useState<ReviewSubmission>({
        make: '',
        model: '',
        year: '',
        rating: 5,
        comment: '',
        dealershipName: '',
        city: '',
        purchaseDate: '',
        salesExperienceRating: 5,
        pricePaid: 0,
        ownershipDuration: 0,
        pros: [],
        cons: [],
        fuelEfficiency: 0,
        variant: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        // If purchase date is being changed, calculate ownership duration
        if (name === 'purchaseDate') {
            const ownershipDuration = calculateOwnershipDuration(value);
            setFormData(prev => ({
                ...prev,
                [name]: value,
                ownershipDuration
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleAddItem = (type: 'pros' | 'cons') => {
        setFormData(prev => ({
            ...prev,
            [type]: [...prev[type], ''] // Add empty string that user can edit
        }));
    };

    const handleRemoveItem = (type: 'pros' | 'cons', index: number) => {
        setFormData(prev => ({
            ...prev,
            [type]: prev[type].filter((_, i) => i !== index)
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

            // Filter out empty pros and cons
            const filteredPros = formData.pros.filter(pro => pro.trim() !== '');
            const filteredCons = formData.cons.filter(con => con.trim() !== '');

            // Ensure numeric values are properly converted
            const reviewData = {
                carModel: `${formData.make} ${formData.model} ${formData.year}`.trim(),
                rating: Number(formData.rating),
                comment: formData.comment.trim(),
                dealershipName: formData.dealershipName.trim(),
                city: formData.city.trim(),
                purchaseDate: formData.purchaseDate.trim(),
                salesExperienceRating: Number(formData.salesExperienceRating),
                pricePaid: Number(formData.pricePaid || 0),
                ownershipDuration: Number(formData.ownershipDuration || 0),
                pros: filteredPros,
                cons: filteredCons,
                fuelEfficiency: Number(formData.fuelEfficiency || 0),
                variant: formData.variant.trim() || 'Not Specified'
            };

            console.log('Submitting review data:', reviewData);

            const response = await axios.post('/api/cars/reviews', reviewData);
            console.log('Server response:', response.data);
            
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to submit review');
            }

            navigate('/reviews');
        } catch (error) {
            console.error('Error submitting review:', error);
            setError(error instanceof Error ? error.message : 'Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStars = (name: 'rating' | 'salesExperienceRating') => {
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
                        {renderStars('rating')}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Sales Experience Rating</label>
                        {renderStars('salesExperienceRating')}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Price Paid (₹)</label>
                        <input
                            type="number"
                            name="pricePaid"
                            value={formData.pricePaid}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            min="0"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Ownership Duration</label>
                        <input
                            type="text"
                            value={formatDuration(formData.ownershipDuration)}
                            className="w-full border border-gray-300 rounded-md p-2 bg-gray-50"
                            readOnly
                            disabled
                        />
                        <p className="text-sm text-gray-500 mt-1">Calculated automatically from purchase date</p>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Variant</label>
                    <input
                        type="text"
                        name="variant"
                        value={formData.variant}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="e.g. Base, Premium, Sport"
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Fuel Efficiency (kmpl)</label>
                    <input
                        type="number"
                        name="fuelEfficiency"
                        value={formData.fuelEfficiency}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        min="0"
                        step="0.1"
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Pros</label>
                    <div className="space-y-2">
                        {formData.pros.map((pro, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={pro}
                                    onChange={(e) => {
                                        const newPros = [...formData.pros];
                                        newPros[index] = e.target.value;
                                        setFormData(prev => ({ ...prev, pros: newPros }));
                                    }}
                                    className="flex-1 border border-gray-300 rounded-md p-2"
                                    placeholder="Enter a pro"
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem('pros', index)}
                                    className="text-red-500 hover:text-red-700"
                                    disabled={isSubmitting}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddItem('pros')}
                            className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                            disabled={isSubmitting}
                        >
                            <span>+</span> Add Pro
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Cons</label>
                    <div className="space-y-2">
                        {formData.cons.map((con, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={con}
                                    onChange={(e) => {
                                        const newCons = [...formData.cons];
                                        newCons[index] = e.target.value;
                                        setFormData(prev => ({ ...prev, cons: newCons }));
                                    }}
                                    className="flex-1 border border-gray-300 rounded-md p-2"
                                    placeholder="Enter a con"
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem('cons', index)}
                                    className="text-red-500 hover:text-red-700"
                                    disabled={isSubmitting}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddItem('cons')}
                            className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                            disabled={isSubmitting}
                        >
                            <span>+</span> Add Con
                        </button>
                    </div>
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
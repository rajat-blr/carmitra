import React, { useState } from 'react';
import axios from 'axios';

interface Dealership {
    id: number;
    name: string;
    location: string;
    rating: number;
    salesRating: number;
    reviewCount: number;
    brands: string[];
}

const Dealerships: React.FC = () => {
    const [dealerships, setDealerships] = useState<Dealership[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        city: '',
        brand: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.city) {
            setError('Please enter a city');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await axios.get<Dealership[]>('/api/dealerships', {
                params: {
                    city: formData.city,
                    brand: formData.brand || undefined
                }
            });
            setDealerships(response.data);
        } catch (err) {
            setError('Failed to fetch dealerships. Please try again.');
            console.error('Error fetching dealerships:', err);
        } finally {
            setLoading(false);
        }
    };

    const renderStars = (rating: number) => {
        return Array(5).fill(0).map((_, index) => (
            <span
                key={index}
                className={`text-lg ${index < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            >
                ★
            </span>
        ));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Find Top Rated Dealerships</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter your city"
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Car Brand (Optional)
                        </label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            placeholder="Filter by brand"
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {error && (
                    <p className="text-red-500 text-sm mt-4">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors
                        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Searching...' : 'Search Dealerships'}
                </button>
            </form>

            {loading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : dealerships.length > 0 ? (
                <div className="grid gap-6">
                    {dealerships.map((dealership) => (
                        <div key={dealership.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-800">{dealership.name}</h3>
                                    <p className="text-gray-600 mt-1">{dealership.location}</p>
                                    <p className="text-gray-600 mt-1">Brands: {dealership.brands.join(', ')}</p>
                                    <p className="text-gray-600 mt-1">Reviews: {dealership.reviewCount}</p>
                                </div>
                                <div className="flex flex-col items-end space-y-2">
                                    <div>
                                        <div className="text-sm font-medium text-gray-700 mb-1">Sales Experience</div>
                                        <div className="flex items-center">
                                            <div className="flex mr-2">
                                                {renderStars(dealership.salesRating)}
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                {dealership.salesRating.toFixed(1)}/5
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-700 mb-1">Overall Rating</div>
                                        <div className="flex items-center">
                                            <div className="flex mr-2">
                                                {renderStars(dealership.rating)}
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                {dealership.rating.toFixed(1)}/5
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : formData.city && !loading && (
                <div className="text-center py-8 text-gray-600">
                    No dealerships found in {formData.city}
                    {formData.brand ? ` for ${formData.brand}` : ''}.
                </div>
            )}
        </div>
    );
};

export default Dealerships;
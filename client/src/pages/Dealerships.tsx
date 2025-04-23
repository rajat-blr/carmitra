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
    const [hasSearched, setHasSearched] = useState(false);

    const popularCities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'];
    const popularBrands = ['Tata', 'Hyundai', 'Suzuki', 'Mahindra', 'Honda', 'Toyota'];

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
            setHasSearched(true);
        } catch (err) {
            setError('Failed to fetch dealerships. Please try again.');
            console.error('Error fetching dealerships:', err);
        } finally {
            setLoading(false);
        }
    };

    const quickSearch = (city: string, brand: string = '') => {
        setFormData({ city, brand });
        setTimeout(() => {
            handleSubmit({ preventDefault: () => {} } as React.FormEvent);
        }, 100);
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
        <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-3xl p-8 mb-10 shadow-sm">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Find Top Rated Dealerships</h1>
                <p className="text-gray-600 mb-8 max-w-2xl">Discover the best car dealerships in your city with real ratings from actual customers</p>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                City <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Enter your city"
                                    className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {popularCities.map(city => (
                                    <button
                                        key={city}
                                        type="button"
                                        onClick={() => quickSearch(city, formData.brand)}
                                        className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-full transition-all"
                                    >
                                        {city}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Car Brand (Optional)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    placeholder="Filter by brand (e.g. Tata, Honda)"
                                    className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                                />
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {popularBrands.map(brand => (
                                    <button
                                        key={brand}
                                        type="button"
                                        onClick={() => quickSearch(formData.city, brand)}
                                        className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-full transition-all"
                                        disabled={!formData.city}
                                    >
                                        {brand}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-6 w-full bg-primary-600 text-white py-3 px-6 rounded-xl hover:bg-primary-700 transition-all shadow-md
                            ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                <span>Searching...</span>
                            </div>
                        ) : (
                            'Search Dealerships'
                        )}
                    </button>
                </form>
            </div>

            {loading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                        <p className="mt-4 text-gray-600">Searching for dealerships...</p>
                    </div>
                </div>
            ) : dealerships.length > 0 ? (
                <div className="grid gap-6">
                    {dealerships.map((dealership) => (
                        <div key={dealership.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-primary-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800">{dealership.name}</h3>
                                            <p className="text-gray-600 mt-1 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {dealership.location}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {dealership.brands.map(brand => (
                                            <span 
                                                key={brand} 
                                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                            >
                                                {brand}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <p className="text-gray-600 mt-3 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                        </svg>
                                        {dealership.reviewCount} {dealership.reviewCount === 1 ? 'Review' : 'Reviews'}
                                    </p>
                                </div>
                                
                                <div className="w-full md:w-auto border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 mt-4 md:mt-0">
                                    <div className="flex flex-col md:items-end space-y-4">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="text-sm font-medium text-gray-700 mb-1">Sales Experience</div>
                                            <div className="flex items-center">
                                                <div className="flex mr-2">
                                                    {renderStars(dealership.salesRating)}
                                                </div>
                                                <span className="text-sm font-medium text-gray-600">
                                                    {dealership.salesRating.toFixed(1)}/5
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-primary-50 p-4 rounded-lg">
                                            <div className="text-sm font-medium text-gray-700 mb-1">Overall Rating</div>
                                            <div className="flex items-center">
                                                <div className="flex mr-2">
                                                    {renderStars(dealership.rating)}
                                                </div>
                                                <span className="text-sm font-medium text-primary-600">
                                                    {dealership.rating.toFixed(1)}/5
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center">
                                            View Details
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : hasSearched ? (
                <div className="bg-white rounded-xl shadow-md p-10 text-center">
                    <img 
                        src="/images/empty-search.svg" 
                        alt="No dealerships found" 
                        className="w-40 h-40 mx-auto mb-6 opacity-70"
                        onError={(e) => {
                            e.currentTarget.src = "https://img.icons8.com/clouds/100/000000/shop.png";
                        }}
                    />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No dealerships found</h3>
                    <p className="text-gray-600 mb-6">
                        No dealerships found in {formData.city}
                        {formData.brand ? ` for ${formData.brand}` : ''}.
                    </p>
                    <button 
                        onClick={() => setFormData({ city: '', brand: '' })}
                        className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-300 transition-all"
                    >
                        Reset Search
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default Dealerships;
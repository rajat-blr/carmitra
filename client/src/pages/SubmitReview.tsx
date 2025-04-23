import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Match this with the server-side ReviewRequest interface and ICar model
interface ReviewSubmission {
    make: string;
    model: string;
    year: string;
    rating: number;
    comment: string;
    dealershipName: string;
    city: string;
    purchaseDate: string; // MM/YYYY format
    salesExperienceRating: number;
    pricePaid: number;
    ownershipDuration: number; // in months
    pros: string[];
    cons: string[];
    fuelEfficiency: number; // kmpl
    variant: string;
}

// Server-side response structure
interface SubmitReviewResponse {
    success: boolean;
    message: string;
    data?: any;
}

// Validation error interface
interface ValidationErrors {
    [key: string]: string;
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
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    
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

    // Field-level validation
    const validateField = (name: keyof ReviewSubmission, value: any): string => {
        switch (name) {
            case 'make':
            case 'model':
            case 'dealershipName':
            case 'city':
            case 'variant':
                return value.trim() === '' ? `${name} is required` : '';
            
            case 'year':
                const yearNum = Number(value);
                if (value.trim() === '') return 'Year is required';
                if (isNaN(yearNum)) return 'Year must be a number';
                if (yearNum < 1900 || yearNum > currentYear + 1) 
                    return `Year must be between 1900 and ${currentYear + 1}`;
                return '';
            
            case 'rating':
            case 'salesExperienceRating':
                const ratingNum = Number(value);
                if (isNaN(ratingNum)) return 'Rating must be a number';
                if (ratingNum < 1 || ratingNum > 5) return 'Rating must be between 1 and 5';
                return '';
            
            case 'comment':
                return value.trim() === '' ? 'Review comment is required' : '';
            
            case 'purchaseDate':
                if (value.trim() === '') return 'Purchase date is required';
                if (!/^\d{2}\/\d{4}$/.test(value)) return 'Purchase date must be in MM/YYYY format';
                
                // Further purchase date validation
                const [monthStr, yearStr] = value.split('/');
                const month = parseInt(monthStr, 10);
                const year = parseInt(yearStr, 10);
                
                if (month < 1 || month > 12) return 'Month must be between 01 and 12';
                if (year < 1900 || year > currentYear) return `Year must be between 1900 and ${currentYear}`;
                
                // Don't allow future dates
                if (year === currentYear && month > currentMonth + 1) return 'Purchase date cannot be in the future';
                
                return '';
            
            case 'pricePaid':
                const price = Number(value);
                if (isNaN(price)) return 'Price must be a number';
                if (price < 0) return 'Price cannot be negative';
                return '';
            
            case 'fuelEfficiency':
                const efficiency = Number(value);
                if (isNaN(efficiency)) return 'Fuel efficiency must be a number';
                if (efficiency < 0) return 'Fuel efficiency cannot be negative';
                return '';
                
            default:
                return '';
        }
    };

    // Validate all form fields
    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {};
        let isValid = true;
        
        // Validate each field
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'pros' || key === 'cons' || key === 'ownershipDuration') return;
            
            const error = validateField(key as keyof ReviewSubmission, value);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });
        
        setValidationErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        // Clear validation error when field changes
        if (validationErrors[name]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
        
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
        
        // Validate all fields
        if (!validateForm()) {
            // Display the first validation error as the main error
            const firstError = Object.values(validationErrors)[0];
            setError(firstError || 'Please fix the validation errors before submitting');
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // Filter out empty pros and cons
            const filteredPros = formData.pros.filter(pro => pro.trim() !== '');
            const filteredCons = formData.cons.filter(con => con.trim() !== '');

            // Transform client-side data model to server-side model
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

            const response = await axios.post<SubmitReviewResponse>('/api/cars/reviews', reviewData);
            console.log('Server response:', response.data);
            
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to submit review');
            }

            // Show success message or redirect
            navigate('/reviews');
        } catch (error) {
            console.error('Error submitting review:', error);
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                // Handle server validation errors
                setError(error.response.data.message);
            } else {
                setError(error instanceof Error ? error.message : 'Failed to submit review. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStars = (name: 'rating' | 'salesExperienceRating') => {
        return (
            <div className="flex flex-col">
                <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => {
                                handleChange({
                                    target: { name, value: star.toString() }
                                } as React.ChangeEvent<HTMLInputElement>);
                                
                                // Clear validation error if it exists
                                if (validationErrors[name]) {
                                    setValidationErrors(prev => {
                                        const newErrors = { ...prev };
                                        delete newErrors[name];
                                        return newErrors;
                                    });
                                }
                            }}
                            className={`text-2xl focus:outline-none transition-colors duration-200 ${
                                star <= Number(formData[name]) ? 'text-yellow-500' : 'text-gray-300'
                            } hover:text-yellow-400`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                        </button>
                    ))}
                </div>
                {validationErrors[name] && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors[name]}</p>
                )}
            </div>
        );
    };

    return (
        <div className="max-w-3xl mx-auto my-12 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Submit a Car Review</h1>
            <p className="text-gray-600 mb-8">Share your experience to help other car buyers make informed decisions</p>
            
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-8">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {error}
                    </div>
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Car Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Make</label>
                            <input
                                type="text"
                                name="make"
                                value={formData.make}
                                onChange={handleChange}
                                className={`w-full border ${validationErrors.make ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                                required
                                disabled={isSubmitting}
                                placeholder="e.g. Toyota"
                                onBlur={() => {
                                    const error = validateField('make', formData.make);
                                    if (error) {
                                        setValidationErrors(prev => ({ ...prev, make: error }));
                                    }
                                }}
                            />
                            {validationErrors.make && (
                                <p className="mt-1 text-sm text-red-600">{validationErrors.make}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Model</label>
                            <input
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                className={`w-full border ${validationErrors.model ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                                required
                                disabled={isSubmitting}
                                placeholder="e.g. Innova"
                                onBlur={() => {
                                    const error = validateField('model', formData.model);
                                    if (error) {
                                        setValidationErrors(prev => ({ ...prev, model: error }));
                                    }
                                }}
                            />
                            {validationErrors.model && (
                                <p className="mt-1 text-sm text-red-600">{validationErrors.model}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Year</label>
                            <input
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className={`w-full border ${validationErrors.year ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                                min="1900"
                                max={new Date().getFullYear() + 1}
                                required
                                disabled={isSubmitting}
                                placeholder={new Date().getFullYear().toString()}
                                onBlur={() => {
                                    const error = validateField('year', formData.year);
                                    if (error) {
                                        setValidationErrors(prev => ({ ...prev, year: error }));
                                    }
                                }}
                            />
                            {validationErrors.year && (
                                <p className="mt-1 text-sm text-red-600">{validationErrors.year}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Variant</label>
                            <input
                                type="text"
                                name="variant"
                                value={formData.variant}
                                onChange={handleChange}
                                className={`w-full border ${validationErrors.variant ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                                placeholder="e.g. Base, Premium, Sport"
                                required
                                disabled={isSubmitting}
                                onBlur={() => {
                                    const error = validateField('variant', formData.variant);
                                    if (error) {
                                        setValidationErrors(prev => ({ ...prev, variant: error }));
                                    }
                                }}
                            />
                            {validationErrors.variant && (
                                <p className="mt-1 text-sm text-red-600">{validationErrors.variant}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Purchase Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Dealership Name</label>
                            <input
                                type="text"
                                name="dealershipName"
                                value={formData.dealershipName}
                                onChange={handleChange}
                                className={`w-full border ${validationErrors.dealershipName ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                                required
                                disabled={isSubmitting}
                                placeholder="e.g. ABC Motors"
                                onBlur={() => {
                                    const error = validateField('dealershipName', formData.dealershipName);
                                    if (error) {
                                        setValidationErrors(prev => ({ ...prev, dealershipName: error }));
                                    }
                                }}
                            />
                            {validationErrors.dealershipName && (
                                <p className="mt-1 text-sm text-red-600">{validationErrors.dealershipName}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className={`w-full border ${validationErrors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                                required
                                disabled={isSubmitting}
                                placeholder="e.g. Mumbai"
                                onBlur={() => {
                                    const error = validateField('city', formData.city);
                                    if (error) {
                                        setValidationErrors(prev => ({ ...prev, city: error }));
                                    }
                                }}
                            />
                            {validationErrors.city && (
                                <p className="mt-1 text-sm text-red-600">{validationErrors.city}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Purchase Date (MM/YYYY)</label>
                            <input
                                type="text"
                                name="purchaseDate"
                                value={formData.purchaseDate}
                                onChange={handleChange}
                                placeholder="MM/YYYY"
                                pattern="\d{2}/\d{4}"
                                className={`w-full border ${validationErrors.purchaseDate ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                                required
                                disabled={isSubmitting}
                                onBlur={() => {
                                    const error = validateField('purchaseDate', formData.purchaseDate);
                                    if (error) {
                                        setValidationErrors(prev => ({ ...prev, purchaseDate: error }));
                                    }
                                }}
                            />
                            {validationErrors.purchaseDate && (
                                <p className="mt-1 text-sm text-red-600">{validationErrors.purchaseDate}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Price Paid (₹)</label>
                            <input
                                type="number"
                                name="pricePaid"
                                value={formData.pricePaid}
                                onChange={handleChange}
                                className={`w-full border ${validationErrors.pricePaid ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                                min="0"
                                required
                                disabled={isSubmitting}
                                placeholder="0"
                                onBlur={() => {
                                    const error = validateField('pricePaid', formData.pricePaid);
                                    if (error) {
                                        setValidationErrors(prev => ({ ...prev, pricePaid: error }));
                                    }
                                }}
                            />
                            {validationErrors.pricePaid && (
                                <p className="mt-1 text-sm text-red-600">{validationErrors.pricePaid}</p>
                            )}
                        </div>
                    </div>
                    
                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1 text-gray-700">Ownership Duration</label>
                        <input
                            type="text"
                            value={formatDuration(formData.ownershipDuration)}
                            className="w-full border border-gray-200 rounded-lg p-3 bg-gray-100 text-gray-700"
                            readOnly
                            disabled
                        />
                        <p className="text-sm text-gray-500 mt-1 italic">Calculated automatically from purchase date</p>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        Your Experience
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">Overall Rating</label>
                            {renderStars('rating')}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">Sales Experience Rating</label>
                            {renderStars('salesExperienceRating')}
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Fuel Efficiency (kmpl)</label>
                        <input
                            type="number"
                            name="fuelEfficiency"
                            value={formData.fuelEfficiency}
                            onChange={handleChange}
                            className={`w-full border ${validationErrors.fuelEfficiency ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                            min="0"
                            step="0.1"
                            required
                            disabled={isSubmitting}
                            placeholder="0"
                            onBlur={() => {
                                const error = validateField('fuelEfficiency', formData.fuelEfficiency);
                                if (error) {
                                    setValidationErrors(prev => ({ ...prev, fuelEfficiency: error }));
                                }
                            }}
                        />
                        {validationErrors.fuelEfficiency && (
                            <p className="mt-1 text-sm text-red-600">{validationErrors.fuelEfficiency}</p>
                        )}
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Your Review</label>
                        <textarea
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            className={`w-full border ${validationErrors.comment ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                            rows={4}
                            required
                            disabled={isSubmitting}
                            placeholder="Share your experience with this car..."
                            onBlur={() => {
                                const error = validateField('comment', formData.comment);
                                if (error) {
                                    setValidationErrors(prev => ({ ...prev, comment: error }));
                                }
                            }}
                        />
                        {validationErrors.comment && (
                            <p className="mt-1 text-sm text-red-600">{validationErrors.comment}</p>
                        )}
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Pros
                    </h2>
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
                                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Enter a pro"
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem('pros', index)}
                                    className="text-red-500 hover:text-red-700 bg-white p-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md transition-all"
                                    disabled={isSubmitting}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddItem('pros')}
                            className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded-md border border-blue-200 hover:bg-blue-50 transition-colors"
                            disabled={isSubmitting}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Add Pro</span>
                        </button>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Cons
                    </h2>
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
                                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Enter a con"
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItem('cons', index)}
                                    className="text-red-500 hover:text-red-700 bg-white p-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md transition-all"
                                    disabled={isSubmitting}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddItem('cons')}
                            className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded-md border border-blue-200 hover:bg-blue-50 transition-colors"
                            disabled={isSubmitting}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Add Con</span>
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 text-white font-bold text-lg rounded-xl transition-all shadow-md
                        ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'}`}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                        </div>
                    ) : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default SubmitReview;
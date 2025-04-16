import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-blue-600">Welcome to CarMitra</h1>
            <p className="text-xl mb-12 text-gray-600">Your trusted companion for making informed car buying decisions.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-500">Car Reviews</h2>
                    <p className="text-gray-600 mb-6">Read honest reviews from car owners and make informed decisions.</p>
                    <Link 
                        to="/reviews" 
                        className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                    >
                        View Reviews
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-green-500">Dealerships</h2>
                    <p className="text-gray-600 mb-6">Find top-rated dealerships in your city for your preferred car brand.</p>
                    <Link 
                        to="/dealerships" 
                        className="inline-block bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
                    >
                        Find Dealerships
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-yellow-500">Share Experience</h2>
                    <p className="text-gray-600 mb-6">Help others by sharing your car ownership experience.</p>
                    <Link 
                        to="/submit-review" 
                        className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors"
                    >
                        Submit Review
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
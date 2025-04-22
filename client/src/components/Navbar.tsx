import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? 'bg-blue-700' : '';
    };

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">CarMitra</Link>
                <div className="space-x-4">
                    <Link 
                        to="/" 
                        className={`px-3 py-2 rounded hover:bg-blue-700 transition-colors ${isActive('/')}`}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/reviews" 
                        className={`px-3 py-2 rounded hover:bg-blue-700 transition-colors ${isActive('/reviews')}`}
                    >
                        Reviews
                    </Link>
                    <Link 
                        to="/dealerships" 
                        className={`px-3 py-2 rounded hover:bg-blue-700 transition-colors ${isActive('/dealerships')}`}
                    >
                        Dealerships
                    </Link>
                    <Link 
                        to="/submit-review" 
                        className={`px-3 py-2 rounded hover:bg-blue-700 transition-colors ${isActive('/submit-review')}`}
                    >
                        Submit Review
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
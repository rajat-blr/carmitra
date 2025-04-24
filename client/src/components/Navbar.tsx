import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md text-gray-800' : 'bg-transparent text-white'}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16 md:h-20">
                    <Link to="/" className="font-bold text-2xl flex items-center gap-0">
                        <span className={`text-primary-600 transition-colors duration-300`}>Car</span>
                        <span className={`${isScrolled ? 'text-gray-800' : 'text-white'} transition-colors duration-300`}>Mitra</span>
                    </Link>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link 
                            to="/" 
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                                ${isActive('/') 
                                    ? `${isScrolled ? 'bg-primary-600 text-white' : 'bg-white/20 text-white'}` 
                                    : `${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`
                                }`}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/reviews" 
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                                ${isActive('/reviews') 
                                    ? `${isScrolled ? 'bg-primary-600 text-white' : 'bg-white/20 text-white'}` 
                                    : `${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`
                                }`}
                        >
                            Reviews
                        </Link>
                        <Link 
                            to="/dealerships" 
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                                ${isActive('/dealerships') 
                                    ? `${isScrolled ? 'bg-primary-600 text-white' : 'bg-white/20 text-white'}` 
                                    : `${isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`
                                }`}
                        >
                            Dealerships
                        </Link>
                        <Link 
                            to="/submit-review" 
                            className={`ml-2 px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg`}
                        >
                            Submit Review
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden flex items-center"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu */}
            <div className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out transform ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="flex flex-col px-4 py-2 space-y-2">
                    <Link 
                        to="/" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`px-4 py-3 rounded-lg text-sm font-medium ${isActive('/') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/reviews" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`px-4 py-3 rounded-lg text-sm font-medium ${isActive('/reviews') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                        Reviews
                    </Link>
                    <Link 
                        to="/dealerships" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`px-4 py-3 rounded-lg text-sm font-medium ${isActive('/dealerships') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                        Dealerships
                    </Link>
                    <Link 
                        to="/submit-review" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`px-4 py-3 mb-2 bg-primary-600 text-white rounded-lg text-sm font-medium shadow-md`}
                    >
                        Submit Review
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [brand1, setBrand1] = useState('');
    const [brand2, setBrand2] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement search functionality
    };

    // Sample data - replace with actual data later
    const trendingReviews = [
        {
            id: 1,
            image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-71.jpeg',
            authorName: 'Rajesh Kumar',
            authorLocation: 'बैंगलोर',
            review: 'Great safety features and comfortable ride quality. The 5-star safety rating gives peace of mind.',
            carName: 'Tata Nexon'
        },
        {
            id: 2,
            image: '/images/thar.jpg',
            authorName: 'Priya Sharma',
            authorLocation: 'पुणे',
            review: 'Perfect off-roading capability and iconic design. The new Thar is much more comfortable for daily driving.',
            carName: 'Mahindra Thar'
        },
        {
            id: 3,
            image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/10544/1689589297739/front-left-side-47.jpg',
            authorName: 'Amit Patel',
            authorLocation: 'दिल्ली',
            review: 'Feature-packed and spacious interior. The panoramic sunroof is a standout feature that my family loves.',
            carName: 'Hyundai Creta'
        },
        {
            id: 4,
            image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti-Suzuki/Grand-Vitara/10505/1689583025095/front-left-side-47.jpg',
            authorName: 'Neha Gupta',
            authorLocation: 'हैदराबाद',
            review: 'Excellent fuel efficiency with strong hybrid technology. Very smooth to drive in city traffic.',
            carName: 'Suzuki Grand Vitara'
        },
        {
            id: 5,
            image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV700/10299/1689594311724/front-left-side-47.jpg',
            authorName: 'Vikram Singh',
            authorLocation: 'चंडीगढ़',
            review: 'The ADAS features are a game-changer for highway driving. Spacious 7-seater with powerful performance.',
            carName: 'Mahindra XUV700'
        },
        {
            id: 6,
            image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Honda/City/9710/1677914238296/front-left-side-47.jpg',
            authorName: 'Kavita Reddy',
            authorLocation: 'चेन्नई',
            review: 'Refined engine and excellent ride comfort. Honda reliability makes it a perfect sedan for family use.',
            carName: 'Honda City'
        }
    ];

    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    
    const showNextReviews = () => {
        setCurrentReviewIndex((prevIndex) => 
            prevIndex + 2 >= trendingReviews.length ? 0 : prevIndex + 2
        );
    };
    
    const showPrevReviews = () => {
        setCurrentReviewIndex((prevIndex) => 
            prevIndex - 2 < 0 ? trendingReviews.length - (trendingReviews.length % 2 === 0 ? 2 : 1) : prevIndex - 2
        );
    };

    const visibleReviews = [
        trendingReviews[currentReviewIndex],
        trendingReviews[(currentReviewIndex + 1) % trendingReviews.length]
    ];

    const testimonials = [
        {
            id: 1,
            name: 'Amit Patel',
            rating: 5,
            comment: 'CarMitra helped me find the perfect SUV for my family within budget!'
        },
        {
            id: 2,
            name: 'Meera Reddy',
            rating: 4,
            comment: 'Detailed reviews helped me choose between petrol and diesel variants.'
        }
    ];

    const buyingGuides = [
        {
            id: 1,
            title: 'Petrol vs Diesel vs CNG: Which Fuel Type is Right for You?',
            image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/132513/scorpio-n-exterior-right-front-three-quarter-75.jpeg'
        },
        {
            id: 2,
            title: 'Top 10 Budget-Friendly Cars Under ₹10 Lakh in 2024',
            image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/142865/punch-ev-exterior-right-front-three-quarter-2.jpeg'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section - Updated for fixed navbar */}
            <div className="relative h-screen overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <img 
                    src="/images/thar.jpg" 
                    alt="Mahindra Thar" 
                    className="absolute w-full h-full object-cover object-center" 
                />
                <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-start">
                    <div className="max-w-2xl pt-16 md:pt-20"> {/* Added padding top to compensate for fixed navbar */}
                        <h1 className="text-5xl md:text-6xl font-bold mb-2 text-white leading-tight">
                            Find Your <span className="text-yellow-400">Perfect</span> Car
                        </h1>
                        <div className="w-20 h-1 bg-yellow-400 mb-6"></div>
                        <p className="text-xl mb-12 text-gray-100">
                            Real reviews. Honest ratings. Expert opinions from car enthusiasts across India.
                        </p>
                        
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 w-full bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl">
                            <select 
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                className="md:w-1/3 p-4 rounded-lg text-gray-800 bg-white border-0 focus:ring-2 focus:ring-yellow-500 transition-all shadow-sm"
                            >
                                <option value="">Select Brand</option>
                                <option value="suzuki">Suzuki</option>
                                <option value="honda">Honda</option>
                                <option value="tata">Tata Motors</option>
                                <option value="volkswagen">Volkswagen</option>
                                <option value="skoda">Škoda</option>
                                <option value="hyundai">Hyundai</option>
                                <option value="toyota">Toyota</option>
                                <option value="mahindra">Mahindra</option>
                                <option value="ford">Ford</option>
                            </select>
                            <select
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                className="md:w-1/3 p-4 rounded-lg text-gray-800 bg-white border-0 focus:ring-2 focus:ring-yellow-500 transition-all shadow-sm"
                            >
                                <option value="">Select Model</option>
                                {selectedBrand === 'suzuki' && (
                                    <>
                                        <option value="brezza">Brezza</option>
                                        <option value="baleno">Baleno</option>
                                        <option value="swift">Swift</option>
                                        <option value="dzire">Dzire</option>
                                        <option value="ertiga">Ertiga</option>
                                        <option value="grand-vitara">Grand Vitara</option>
                                        <option value="fronx">Fronx</option>
                                        <option value="jimny">Jimny</option>
                                    </>
                                )}
                                {selectedBrand === 'hyundai' && (
                                    <>
                                        <option value="creta">Creta</option>
                                        <option value="venue">Venue</option>
                                        <option value="i20">i20</option>
                                        <option value="verna">Verna</option>
                                        <option value="tucson">Tucson</option>
                                    </>
                                )}
                                {selectedBrand === 'tata' && (
                                    <>
                                        <option value="nexon">Nexon</option>
                                        <option value="punch">Punch</option>
                                        <option value="harrier">Harrier</option>
                                        <option value="safari">Safari</option>
                                        <option value="altroz">Altroz</option>
                                    </>
                                )}
                                {selectedBrand === 'toyota' && (
                                    <>
                                        <option value="fortuner">Fortuner</option>
                                        <option value="innova">Innova Crysta</option>
                                        <option value="urban-cruiser">Urban Cruiser</option>
                                        <option value="glanza">Glanza</option>
                                        <option value="camry">Camry</option>
                                    </>
                                )}
                                {selectedBrand === 'honda' && (
                                    <>
                                        <option value="city">City</option>
                                        <option value="amaze">Amaze</option>
                                        <option value="elevate">Elevate</option>
                                    </>
                                )}
                                {selectedBrand === 'volkswagen' && (
                                    <>
                                        <option value="virtus">Virtus</option>
                                        <option value="taigun">Taigun</option>
                                        <option value="tiguan">Tiguan</option>
                                    </>
                                )}
                                {selectedBrand === 'skoda' && (
                                    <>
                                        <option value="slavia">Slavia</option>
                                        <option value="kushaq">Kushaq</option>
                                        <option value="kodiaq">Kodiaq</option>
                                    </>
                                )}
                                {selectedBrand === 'mahindra' && (
                                    <>
                                        <option value="thar">Thar</option>
                                        <option value="xuv700">XUV700</option>
                                        <option value="scorpio">Scorpio</option>
                                        <option value="xuv300">XUV300</option>
                                        <option value="bolero">Bolero</option>
                                        <option value="xuv400">XUV400</option>
                                    </>
                                )}
                                {selectedBrand === 'ford' && (
                                    <>
                                        <option value="ecosport">EcoSport</option>
                                        <option value="endeavour">Endeavour</option>
                                        <option value="figo">Figo</option>
                                    </>
                                )}
                            </select>
                            <button 
                                type="submit"
                                className="md:w-1/3 bg-yellow-500 text-gray-900 p-4 rounded-lg hover:bg-yellow-400 transition-all font-semibold shadow-lg transform hover:scale-105"
                            >
                                Search Reviews
                            </button>
                        </form>
                    </div>
                </div>
                
                {/* Floating stats */}
                <div className="absolute bottom-0 right-0 mb-8 mr-8 z-20 flex gap-6 bg-black/30 backdrop-blur-lg p-4 rounded-xl border border-white/20">
                    <div className="text-center">
                        <p className="text-4xl font-bold text-white">5000+</p>
                        <p className="text-sm text-gray-200">Reviews</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-white">120+</p>
                        <p className="text-sm text-gray-200">Car Models</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-white">10+</p>
                        <p className="text-sm text-gray-200">Brands</p>
                    </div>
                </div>
            </div>

            {/* Trusted Brands Section - Refined */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">
                            Trusted by Lakhs of Auto Enthusiasts
                        </h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-10 md:gap-16">
                        {['suzuki', 'honda', 'tata', 'mahindra', 'volkswagen', 'skoda', 'hyundai', 'toyota'].map((brand) => (
                            <div key={brand} className="flex items-center justify-center h-16 group">
                                <img 
                                    src={`/brands/${brand}.png`}
                                    alt={brand.charAt(0).toUpperCase() + brand.slice(1)}
                                    className="max-h-full w-auto grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Trending Reviews Section - Modernized */}
            <div className="py-24 bg-gradient-to-br from-gray-900 to-indigo-950 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                        <div>
                            <h2 className="text-4xl font-bold relative inline-block">
                                Top Trending Reviews
                                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-yellow-400"></span>
                            </h2>
                            <p className="text-gray-400 mt-4 max-w-xl">Discover what real owners have to say about their cars</p>
                        </div>
                        <div className="flex gap-3 mt-6 md:mt-0">
                            <button 
                                onClick={showPrevReviews}
                                className="bg-gray-800/50 hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-300 border border-gray-700"
                                aria-label="Previous reviews"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button 
                                onClick={showNextReviews}
                                className="bg-gray-800/50 hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-300 border border-gray-700"
                                aria-label="Next reviews"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {visibleReviews.map(review => (
                            <div key={review.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] border border-gray-700/50 shadow-xl group">
                                <div className="aspect-video overflow-hidden">
                                    <img src={review.image} alt={review.carName} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center mb-6">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mr-4 flex items-center justify-center text-xl font-bold text-white">
                                            {review.authorName.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg">{review.authorName}</h3>
                                            <p className="text-sm text-gray-400">{review.authorLocation}</p>
                                        </div>
                                        <div className="ml-auto">
                                            <div className="flex space-x-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <h4 className="text-2xl font-semibold mb-3">{review.carName}</h4>
                                    <div className="border-l-4 border-blue-500 pl-4 mb-6">
                                        <p className="text-gray-300 italic">{review.review}</p>
                                    </div>
                                    <Link to="/reviews" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors group">
                                        Read Full Review
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-10">
                        {Array.from({length: Math.ceil(trendingReviews.length / 2)}).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentReviewIndex(index * 2)}
                                className={`mx-1.5 w-3 h-3 rounded-full transition-all duration-300 ${currentReviewIndex === index * 2 ? 'bg-blue-500 w-8' : 'bg-gray-600 hover:bg-gray-500'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Car Comparison Section - Modernized */}
            <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                <img 
                                    src="https://imgd.aeplcdn.com/664x374/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-4.jpeg" 
                                    alt="Compare Cars" 
                                    className="w-full h-[450px] object-cover object-center transform hover:scale-105 transition-transform duration-700" 
                                />
                                <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-600 to-blue-600/0 text-white px-6 py-3 rounded-br-2xl font-semibold">
                                    Featured Comparison
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-4xl font-bold mb-3 text-gray-900">Compare Cars Side by Side</h2>
                            <div className="w-20 h-1 bg-blue-600 mb-6"></div>
                            <p className="text-lg text-gray-600 mb-8">
                                Can't decide between two cars? Our detailed comparison tool helps you analyze price, features, specs, and ownership costs.
                            </p>
                            <div className="space-y-6 mb-8">
                                {/* Car 1 Selection */}
                                <div className="space-y-3">
                                    <label className="text-gray-700 font-medium inline-flex items-center">
                                        <span className="flex items-center justify-center bg-blue-600 text-white rounded-full w-6 h-6 mr-2 text-sm">1</span>
                                        Select First Car
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <select 
                                            className="w-full p-3.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all shadow-sm"
                                            onChange={(e) => setBrand1(e.target.value)}
                                            value={brand1}
                                        >
                                            <option value="">Select Brand</option>
                                            <option value="tata">Tata Motors</option>
                                            <option value="hyundai">Hyundai</option>
                                            <option value="suzuki">Suzuki</option>
                                            <option value="volkswagen">Volkswagen</option>
                                            <option value="skoda">Škoda</option>
                                            <option value="honda">Honda</option>
                                            <option value="mahindra">Mahindra</option>
                                            <option value="toyota">Toyota</option>
                                        </select>
                                        <select 
                                            className="w-full p-3.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all shadow-sm"
                                            disabled={!brand1}
                                        >
                                            <option value="">Select Model</option>
                                            {brand1 === 'tata' && (
                                                <>
                                                    <option value="nexon">Nexon</option>
                                                    <option value="punch">Punch</option>
                                                    <option value="harrier">Harrier</option>
                                                    <option value="safari">Safari</option>
                                                    <option value="altroz">Altroz</option>
                                                </>
                                            )}
                                            {brand1 === 'hyundai' && (
                                                <>
                                                    <option value="creta">Creta</option>
                                                    <option value="venue">Venue</option>
                                                    <option value="i20">i20</option>
                                                    <option value="verna">Verna</option>
                                                    <option value="tucson">Tucson</option>
                                                </>
                                            )}
                                            {brand1 === 'suzuki' && (
                                                <>
                                                    <option value="brezza">Brezza</option>
                                                    <option value="baleno">Baleno</option>
                                                    <option value="swift">Swift</option>
                                                    <option value="dzire">Dzire</option>
                                                    <option value="grand-vitara">Grand Vitara</option>
                                                </>
                                            )}
                                            {brand1 === 'volkswagen' && (
                                                <>
                                                    <option value="virtus">Virtus</option>
                                                    <option value="taigun">Taigun</option>
                                                    <option value="tiguan">Tiguan</option>
                                                </>
                                            )}
                                            {brand1 === 'skoda' && (
                                                <>
                                                    <option value="slavia">Slavia</option>
                                                    <option value="kushaq">Kushaq</option>
                                                    <option value="kodiaq">Kodiaq</option>
                                                </>
                                            )}
                                            {brand1 === 'honda' && (
                                                <>
                                                    <option value="city">City</option>
                                                    <option value="amaze">Amaze</option>
                                                    <option value="elevate">Elevate</option>
                                                </>
                                            )}
                                            {brand1 === 'mahindra' && (
                                                <>
                                                    <option value="thar">Thar</option>
                                                    <option value="xuv700">XUV700</option>
                                                    <option value="scorpio">Scorpio</option>
                                                    <option value="xuv300">XUV300</option>
                                                    <option value="bolero">Bolero</option>
                                                </>
                                            )}
                                            {brand1 === 'toyota' && (
                                                <>
                                                    <option value="fortuner">Fortuner</option>
                                                    <option value="innova">Innova Crysta</option>
                                                    <option value="urban-cruiser">Urban Cruiser</option>
                                                    <option value="glanza">Glanza</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                
                                {/* Car 2 Selection */}
                                <div className="space-y-3">
                                    <label className="text-gray-700 font-medium inline-flex items-center">
                                        <span className="flex items-center justify-center bg-blue-600 text-white rounded-full w-6 h-6 mr-2 text-sm">2</span>
                                        Select Second Car
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <select 
                                            className="w-full p-3.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all shadow-sm"
                                            onChange={(e) => setBrand2(e.target.value)}
                                            value={brand2}
                                        >
                                            <option value="">Select Brand</option>
                                            <option value="tata">Tata Motors</option>
                                            <option value="hyundai">Hyundai</option>
                                            <option value="suzuki">Suzuki</option>
                                            <option value="volkswagen">Volkswagen</option>
                                            <option value="skoda">Škoda</option>
                                            <option value="honda">Honda</option>
                                            <option value="mahindra">Mahindra</option>
                                            <option value="toyota">Toyota</option>
                                        </select>
                                        <select 
                                            className="w-full p-3.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all shadow-sm"
                                            disabled={!brand2}
                                        >
                                            <option value="">Select Model</option>
                                            {brand2 === 'tata' && (
                                                <>
                                                    <option value="nexon">Nexon</option>
                                                    <option value="punch">Punch</option>
                                                    <option value="harrier">Harrier</option>
                                                    <option value="safari">Safari</option>
                                                    <option value="altroz">Altroz</option>
                                                </>
                                            )}
                                            {brand2 === 'hyundai' && (
                                                <>
                                                    <option value="creta">Creta</option>
                                                    <option value="venue">Venue</option>
                                                    <option value="i20">i20</option>
                                                    <option value="verna">Verna</option>
                                                    <option value="tucson">Tucson</option>
                                                </>
                                            )}
                                            {brand2 === 'suzuki' && (
                                                <>
                                                    <option value="brezza">Brezza</option>
                                                    <option value="baleno">Baleno</option>
                                                    <option value="swift">Swift</option>
                                                    <option value="dzire">Dzire</option>
                                                    <option value="grand-vitara">Grand Vitara</option>
                                                </>
                                            )}
                                            {brand2 === 'volkswagen' && (
                                                <>
                                                    <option value="virtus">Virtus</option>
                                                    <option value="taigun">Taigun</option>
                                                    <option value="tiguan">Tiguan</option>
                                                </>
                                            )}
                                            {brand2 === 'skoda' && (
                                                <>
                                                    <option value="slavia">Slavia</option>
                                                    <option value="kushaq">Kushaq</option>
                                                    <option value="kodiaq">Kodiaq</option>
                                                </>
                                            )}
                                            {brand2 === 'honda' && (
                                                <>
                                                    <option value="city">City</option>
                                                    <option value="amaze">Amaze</option>
                                                    <option value="elevate">Elevate</option>
                                                </>
                                            )}
                                            {brand2 === 'mahindra' && (
                                                <>
                                                    <option value="thar">Thar</option>
                                                    <option value="xuv700">XUV700</option>
                                                    <option value="scorpio">Scorpio</option>
                                                    <option value="xuv300">XUV300</option>
                                                    <option value="bolero">Bolero</option>
                                                </>
                                            )}
                                            {brand2 === 'toyota' && (
                                                <>
                                                    <option value="fortuner">Fortuner</option>
                                                    <option value="innova">Innova Crysta</option>
                                                    <option value="urban-cruiser">Urban Cruiser</option>
                                                    <option value="glanza">Glanza</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg font-semibold flex items-center justify-center group">
                                <span>Compare Now</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                                <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm text-gray-600">Price Comparison</span>
                                </div>
                                <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className="text-sm text-gray-600">Performance</span>
                                </div>
                                <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    <span className="text-sm text-gray-600">Safety Features</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest Buying Tips Section - Modernized */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Expert Advice</span>
                        <h2 className="text-4xl font-bold mt-2 mb-4">Latest Buying Tips & Guides</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-10">
                        {buyingGuides.map(guide => (
                            <div key={guide.id} className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                                <div className="relative overflow-hidden">
                                    <img 
                                        src={guide.image} 
                                        alt={guide.title} 
                                        className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full mb-3">Buying Guide</span>
                                        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                                            {guide.title}
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-600 mb-4">Our experts analyze the key factors to consider before making your purchase decision.</p>
                                    <button className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                                        Read More
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-medium transition-all inline-flex items-center">
                            <span>View All Guides</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Testimonials - Modernized */}
            <div className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
                        <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-medium text-lg">{testimonial.name}</div>
                                        <div className="flex text-yellow-400 mb-1">
                                            {'★'.repeat(testimonial.rating)}
                                            {'☆'.repeat(5 - testimonial.rating)}
                                        </div>
                                    </div>
                                </div>
                                <svg className="h-10 w-10 text-white/30 mb-4" fill="currentColor" viewBox="0 0 32 32">
                                    <path d="M10 8c-4.42 0-8 3.58-8 8s3.58 8 8 8c1.46 0 2.82-0.4 4-1.080v-0.92c-1.18 0.78-2.58 1.24-4.1 1.24-4.12 0-7.48-3.36-7.48-7.5s3.36-7.5 7.5-7.5c4.14 0 7.5 3.36 7.5 7.5 0 1.52-0.46 2.94-1.24 4.1h0.92c0.68-1.18 1.080-2.54 1.080-4 0-4.42-3.58-8-8-8zM30 8c-4.42 0-8 3.58-8 8s3.58 8 8 8c1.46 0 2.82-0.4 4-1.080v-0.92c-1.18 0.78-2.58 1.24-4.1 1.24-4.12 0-7.48-3.36-7.48-7.5s3.36-7.5 7.5-7.5c4.14 0 7.5 3.36 7.5 7.5 0 1.52-0.46 2.94-1.24 4.1h0.92c0.68-1.18 1.080-2.54 1.080-4 0-4.42-3.58-8-8-8z"></path>
                                </svg>
                                <p className="text-xl">{testimonial.comment}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link to="/reviews" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-medium transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl">
                            <span>View All Customer Reviews</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* Newsletter Signup - New Section */}
            <div className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-3xl font-bold mb-3">Stay Updated With CarMitra</h3>
                                <p className="text-gray-600 mb-6">Get the latest car reviews, buying guides, and special offers delivered to your inbox.</p>
                                <form className="flex flex-col sm:flex-row gap-3">
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email" 
                                        className="flex-grow p-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all shadow-sm"
                                    />
                                    <button className="bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg font-semibold whitespace-nowrap">
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                            <div className="hidden md:flex justify-end">
                                <img 
                                    src="/images/newsletter-car.png" 
                                    alt="Newsletter" 
                                    className="max-w-xs"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://www.freepnglogos.com/uploads/car-png/car-png-transparent-car-images-pluspng-37.png";
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
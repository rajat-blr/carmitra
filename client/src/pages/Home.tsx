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
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[600px] overflow-hidden">
                <img 
                    src="/images/thar.jpg" 
                    alt="Mahindra Thar" 
                    className="absolute w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 max-w-6xl mx-auto px-4 pt-32">
                    <h1 className="text-6xl font-bold mb-4 text-white">
                        Find the Perfect Car
                    </h1>
                    <h2 className="text-5xl font-bold mb-6 text-white">
                        With Trusted Reviews
                    </h2>
                    <p className="text-xl mb-12 text-gray-200">
                        Real reviews. Honest ratings. Expert opinions.
                    </p>
                    
                    <form onSubmit={handleSearch} className="flex gap-4 max-w-3xl bg-white/10 backdrop-blur-md p-6 rounded-xl">
                        <select 
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="w-1/3 p-4 rounded-lg text-gray-800 bg-white border-0 focus:ring-2 focus:ring-primary-500"
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
                            className="w-1/3 p-4 rounded-lg text-gray-800 bg-white border-0 focus:ring-2 focus:ring-primary-500"
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
                            className="w-1/3 bg-primary-600 text-white p-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                        >
                            Search Reviews
                        </button>
                    </form>
                </div>
            </div>

            {/* Trusted Brands Section */}
            <div className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">
                        Trusted by Lakhs of Auto Enthusiasts
                    </h2>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-8 items-center justify-items-center">
                        {['suzuki', 'honda', 'tata', 'mahindra', 'volkswagen', 'skoda', 'hyundai', 'toyota'].map((brand) => (
                            <div key={brand} className="flex items-center justify-center h-16">
                                <img 
                                    src={`/brands/${brand}.png`}
                                    alt={brand.charAt(0).toUpperCase() + brand.slice(1)}
                                    className="max-h-full w-auto grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Trending Reviews Section */}
            <div className="py-16 bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">Top Trending Car Reviews</h2>
                        <div className="flex gap-2">
                            <button 
                                onClick={showPrevReviews}
                                className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button 
                                onClick={showNextReviews}
                                className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {visibleReviews.map(review => (
                            <div key={review.id} className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-[1.02]">
                                <img src={review.image} alt={review.carName} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-600 mr-3"></div>
                                        <div>
                                            <h3 className="font-medium">{review.authorName}</h3>
                                            <p className="text-sm text-gray-400">{review.authorLocation}</p>
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-semibold mb-2">{review.carName}</h4>
                                    <p className="text-gray-300 mb-4">{review.review}</p>
                                    <Link to="/reviews" className="text-blue-400 hover:text-blue-300 flex items-center">
                                        Read Full Review
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-6">
                        {Array.from({length: Math.ceil(trendingReviews.length / 2)}).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentReviewIndex(index * 2)}
                                className={`mx-1 w-2.5 h-2.5 rounded-full ${currentReviewIndex === index * 2 ? 'bg-blue-500' : 'bg-gray-600'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Car Comparison Section */}
            <div className="py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Compare Cars Side by Side</h2>
                            <div className="space-y-4 mb-6">
                                {/* Car 1 Selection */}
                                <div className="space-y-2">
                                    <label className="text-gray-700 font-medium">Car 1</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <select 
                                            className="w-full p-3 rounded-lg border border-gray-300"
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
                                            className="w-full p-3 rounded-lg border border-gray-300"
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
                                <div className="space-y-2">
                                    <label className="text-gray-700 font-medium">Car 2</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <select 
                                            className="w-full p-3 rounded-lg border border-gray-300"
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
                                            className="w-full p-3 rounded-lg border border-gray-300"
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
                            <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                                Compare Now
                            </button>
                            <p className="mt-4 text-gray-600">
                                Compare prices, features, mileage, and ownership costs
                            </p>
                        </div>
                        <div>
                            <img 
                                src="https://imgd.aeplcdn.com/664x374/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-4.jpeg" 
                                alt="Compare Cars" 
                                className="rounded-lg shadow-lg w-full h-[400px] object-cover" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest Buying Tips Section */}
            <div className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Latest Buying Tips & Guides</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {buyingGuides.map(guide => (
                            <div key={guide.id} className="group cursor-pointer">
                                <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                                    <img 
                                        src={guide.image} 
                                        alt={guide.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                                    {guide.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center gap-8">
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-gray-300"></div>
                                <div>
                                    <div className="font-medium">{testimonial.name}</div>
                                    <div className="flex text-yellow-400 mb-1">
                                        {'★'.repeat(testimonial.rating)}
                                    </div>
                                    <p className="text-gray-600">{testimonial.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
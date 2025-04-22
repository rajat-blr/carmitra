import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

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
            image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-exterior-right-front-three-quarter-2.jpeg',
            authorName: 'Priya Sharma',
            authorLocation: 'पुणे',
            review: 'Perfect family sedan with excellent fuel efficiency. The CVT transmission is butter smooth.',
            carName: 'Honda City'
        }
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
            <div 
                className="relative h-[600px] bg-cover bg-center bg-no-repeat" 
                style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://imgd.aeplcdn.com/1920x1080/n/cw/ec/149345/virtus-exterior-right-front-three-quarter-3.jpeg)' }}
            >
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
                    <h2 className="text-3xl font-bold mb-8">Top Trending Car Reviews</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {trendingReviews.map(review => (
                            <div key={review.id} className="bg-gray-800 rounded-lg overflow-hidden">
                                <img src={review.image} alt={review.carName} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-600 mr-3"></div>
                                        <div>
                                            <h3 className="font-medium">{review.authorName}</h3>
                                            <p className="text-sm text-gray-400">{review.authorLocation}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 mb-4">{review.review}</p>
                                    <Link to="/reviews" className="text-blue-400 hover:text-blue-300">
                                        Read Full Review
                                    </Link>
                                </div>
                            </div>
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
                                <select className="w-full p-3 rounded-lg border border-gray-300">
                                    <option value="">Select Car 1</option>
                                    <option value="tata-nexon">Tata Nexon</option>
                                    <option value="hyundai-creta">Hyundai Creta</option>
                                    <option value="suzuki-brezza">Suzuki Brezza</option>
                                    <option value="volkswagen-virtus">Volkswagen Virtus</option>
                                    <option value="skoda-slavia">Škoda Slavia</option>
                                    <option value="honda-city">Honda City</option>
                                </select>
                                <select className="w-full p-3 rounded-lg border border-gray-300">
                                    <option value="">Select Car 2</option>
                                    <option value="tata-nexon">Tata Nexon</option>
                                    <option value="hyundai-creta">Hyundai Creta</option>
                                    <option value="suzuki-brezza">Suzuki Brezza</option>
                                    <option value="volkswagen-virtus">Volkswagen Virtus</option>
                                    <option value="skoda-slavia">Škoda Slavia</option>
                                    <option value="honda-city">Honda City</option>
                                </select>
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
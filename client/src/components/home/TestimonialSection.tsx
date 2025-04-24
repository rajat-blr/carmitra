import React from 'react';
import { Link } from 'react-router-dom';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

const TestimonialSection: React.FC = () => {
  const testimonials: Testimonial[] = [
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

  return (
    <div className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
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
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
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
  );
};

export default TestimonialSection; 
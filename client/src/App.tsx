import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Reviews from './pages/Reviews';
import Dealerships from './pages/Dealerships';
import SubmitReview from './pages/SubmitReview';
import ReviewDetail from './pages/ReviewDetail';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reviews" element={
              <>
                <div className="h-16 md:h-20 bg-gradient-to-r from-gray-900 to-indigo-900"></div>
                <div className="container mx-auto px-4 py-8">
                  <Reviews />
                </div>
              </>
            } />
            <Route path="/reviews/:id" element={
              <>
                <div className="h-16 md:h-20 bg-gradient-to-r from-gray-900 to-indigo-900"></div>
                <div className="container mx-auto px-4 py-8">
                  <ReviewDetail />
                </div>
              </>
            } />
            <Route path="/dealerships" element={
              <>
                <div className="h-16 md:h-20 bg-gradient-to-r from-gray-900 to-indigo-900"></div>
                <div className="container mx-auto px-4 py-8">
                  <Dealerships />
                </div>
              </>
            } />
            <Route path="/submit-review" element={
              <>
                <div className="h-16 md:h-20 bg-gradient-to-r from-gray-900 to-indigo-900"></div>
                <div className="container mx-auto px-4 py-8">
                  <div className="max-w-5xl mx-auto">
                    <SubmitReview />
                  </div>
                </div>
              </>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
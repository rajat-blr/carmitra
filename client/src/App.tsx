import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Reviews from './pages/Reviews';
import Dealerships from './pages/Dealerships';
import SubmitReview from './pages/SubmitReview';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/dealerships" element={<Dealerships />} />
            <Route path="/submit-review" element={<SubmitReview />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
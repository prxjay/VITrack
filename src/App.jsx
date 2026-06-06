import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import GPACalculator from './components/GPACalculator';
import CGPACalculator from './components/CGPACalculator';
import TargetCGPAPlanner from './components/TargetCGPAPlanner';
import FATCalculator from './components/FATCalculator';
import HowToUse from './components/HowToUse';
import Footer from './components/Footer';

function App() {
  const [page, setPage] = useState('home');
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Render current page component
  const renderPage = () => {
    switch (page) {
      case 'gpa':
        return <GPACalculator />;
      case 'cgpa':
        return <CGPACalculator />;
      case 'planner':
        return <TargetCGPAPlanner />;
      case 'fat':
        return <FATCalculator />;
      case 'howtouse':
        return <HowToUse />;
      case 'home':
      default:
        return <Home setPage={setPage} />;
    }
  };

  return (
    <>
      <Navbar page={page} setPage={setPage} />
      
      <main className="content-area">
        {renderPage()}
      </main>

      <Footer setPage={setPage} />

      {/* Back to Top Button */}
      <button 
        type="button" 
        className={`scroll-to-top-btn ${showScrollBtn ? 'show' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    </>
  );
}

export default App;

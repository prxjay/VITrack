import React, { useState, useEffect } from 'react';

export default function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (targetPage) => {
    setPage(targetPage);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="#top" className="logo" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
          <span className="logo-text">VITrack</span>
        </a>

        <ul className="nav-links">
          <li>
            <a 
              href="#gpa" 
              className={page === 'gpa' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); handleNavClick('gpa'); }}
            >
              GPA Calculator
            </a>
          </li>
          <li>
            <a 
              href="#cgpa" 
              className={page === 'cgpa' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); handleNavClick('cgpa'); }}
            >
              CGPA Calculator
            </a>
          </li>
          <li>
            <a 
              href="#planner" 
              className={page === 'planner' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); handleNavClick('planner'); }}
            >
              Target CGPA Planner
            </a>
          </li>
          <li>
            <a 
              href="#fat" 
              className={page === 'fat' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); handleNavClick('fat'); }}
            >
              FAT Calculator
            </a>
          </li>
        </ul>

        <div className="nav-cta-wrapper">
          <a 
            href="#howtouse" 
            className="nav-cta" 
            onClick={(e) => { e.preventDefault(); handleNavClick('howtouse'); }}
          >
            How to Use?
          </a>
        </div>

        <button 
          className="hamburger" 
          type="button" 
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Menu Offcanvas Overlay */}
      {mobileMenuOpen && (
        <div 
          className="modal-backdrop fade show" 
          style={{ zIndex: 1040 }}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Drawer Menu */}
      <div 
        className={`offcanvas offcanvas-end ${mobileMenuOpen ? 'show' : ''}`} 
        tabIndex="-1" 
        style={{ 
          visibility: mobileMenuOpen ? 'visible' : 'hidden', 
          transform: mobileMenuOpen ? 'none' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out, visibility 0.3s ease-in-out',
          zIndex: 1050 
        }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">
            <a href="#top" className="logo" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
              <span className="logo-text">VITrack</span>
            </a>
          </h5>
          <button 
            type="button" 
            className="hamburger-close" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="offcanvas-body">
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <a 
                href="#home" 
                className={`mobile-nav-link ${page === 'home' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
              >
                Home
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="#gpa" 
                className={`mobile-nav-link ${page === 'gpa' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('gpa'); }}
              >
                GPA Calculator
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="#cgpa" 
                className={`mobile-nav-link ${page === 'cgpa' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('cgpa'); }}
              >
                CGPA Calculator
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="#planner" 
                className={`mobile-nav-link ${page === 'planner' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('planner'); }}
              >
                Target CGPA Planner
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="#fat" 
                className={`mobile-nav-link ${page === 'fat' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick('fat'); }}
              >
                FAT Calculator
              </a>
            </li>

          </ul>
          <a 
            href="#howtouse" 
            className="nav-cta mobile-cta" 
            onClick={(e) => { e.preventDefault(); handleNavClick('howtouse'); }}
          >
            How to Use?
          </a>
        </div>
      </div>
    </>
  );
}

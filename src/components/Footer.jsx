import React, { useState, useEffect, useRef } from 'react';

export default function Footer({ setPage }) {
  const [overallVisits, setOverallVisits] = useState(1);
  const hasCounted = useRef(false);

  useEffect(() => {
    if (hasCounted.current) return;
    hasCounted.current = true;

    // Unique project namespace for tracking live production counters
    const namespace = 'vitrack_v3_live_prod';
    
    // Increment overall visits on load
    fetch(`https://api.counterapi.dev/v1/${namespace}/visits/up`)
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.count === 'number') {
          setOverallVisits(data.count);
        }
      })
      .catch(err => console.error('Error incrementing visits:', err));

  }, []);

  const handleNavClick = (targetPage) => {
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="footer-wrapper">
      {/* Main Footer */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <span>VITrack</span>
            </div>
            <p className="footer-tagline">
              Hey folks! I'm Prawin, the creator behind VITrack. As an undergraduate at VIT, I've been through the mess of manually calculating GPAs and stressing over maintaining my CGPA. I built this tool to make that process easier for all of us. Hope you find it useful. Good luck!
            </p>
            <div className="footer-socials">
              <a href="https://prxjay.github.io/Portfolio/" target="_blank" rel="noopener noreferrer"><i className="fas fa-globe"></i></a>
              <a href="https://github.com/prxjay" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
              <a href="https://www.linkedin.com/in/prawin-jayakhar-b16185250/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <div className="footer-visits-counter">
              <span>Overall Visits: <strong>{overallVisits.toLocaleString()}+</strong></span>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul className="footer-links-list">
              <li><a href="#gpa" onClick={(e) => { e.preventDefault(); handleNavClick('gpa'); }}>GPA Calculator</a></li>
              <li><a href="#cgpa" onClick={(e) => { e.preventDefault(); handleNavClick('cgpa'); }}>CGPA Calculator</a></li>
              <li><a href="#planner" onClick={(e) => { e.preventDefault(); handleNavClick('planner'); }}>CGPA Planner</a></li>
              <li><a href="#fat" onClick={(e) => { e.preventDefault(); handleNavClick('fat'); }}>FAT Calculator</a></li>
              <li><a href="#howtouse" onClick={(e) => { e.preventDefault(); handleNavClick('howtouse'); }}>How to Use</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Legal</h4>
            <ul className="footer-links-list">
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); handleNavClick('privacy'); }}>Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); handleNavClick('terms'); }}>Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="copyright">&copy; {new Date().getFullYear()} VITrack. All rights reserved.</p>
          </div>
          <div className="footer-bottom-right">
            <p className="developed-by">
              Designed & Created by <a href="https://prxjay.github.io/Portfolio/" target="_blank" rel="noopener noreferrer">Prawin</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

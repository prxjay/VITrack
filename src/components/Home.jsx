import React, { useState, useEffect, useRef } from 'react';

const ROTATING_TEXTS = ['predicted CGPA', 'semester GPA', 'required FAT marks'];
const TYPING_DELAY = 80;
const ERASING_DELAY = 50;
const NEW_TEXT_DELAY = 1500;

export default function Home({ setPage }) {
  // Rotating Text State
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Simulation State
  const [simCurrentCgpa, setSimCurrentCgpa] = useState('');
  const [simTargetCgpa, setSimTargetCgpa] = useState('');
  const [simCurrentCredits, setSimCurrentCredits] = useState('');
  const [simCreditsLeft, setSimCreditsLeft] = useState('');
  const [simSemsRemaining, setSimSemsRemaining] = useState('');
  const [simResultOpen, setSimResultOpen] = useState(false);
  const [simActiveField, setSimActiveField] = useState(null); // 'currentCgpa', 'targetCgpa', 'currentCredits', 'creditsLeft', 'semsRemaining'
  const [simButtonActive, setSimButtonActive] = useState(false);

  const simTimeoutRef = useRef(null);

  // Rotating Text Effect
  useEffect(() => {
    let timer;
    const fullText = ROTATING_TEXTS[textIndex % ROTATING_TEXTS.length];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      }, ERASING_DELAY);
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }, TYPING_DELAY);
    }

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), NEW_TEXT_DELAY);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setTextIndex((prev) => prev + 1);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex]);

  // Simulation Effect (Auto-typing Target CGPA Planner Tutorial)
  useEffect(() => {
    const runSimulation = async () => {
      // Helper function to simulate delay
      const delay = (ms) => new Promise(resolve => {
        simTimeoutRef.current = setTimeout(resolve, ms);
      });

      // Helper to type text into input state
      const typeIntoInput = async (setter, value, fieldName) => {
        setSimActiveField(fieldName);
        const strVal = value.toString();
        let currentStr = '';
        for (let i = 0; i < strVal.length; i++) {
          currentStr += strVal[i];
          setter(currentStr);
          await delay(120 + Math.random() * 80);
        }
        setSimActiveField(null);
        await delay(500);
      };

      while (true) {
        // Step 1: Initial state & reset
        setSimResultOpen(false);
        setSimButtonActive(false);
        setSimCurrentCgpa('');
        setSimTargetCgpa('');
        setSimCurrentCredits('');
        setSimCreditsLeft('');
        setSimSemsRemaining('');
        await delay(1000);

        // Step 2: Type Current CGPA
        await typeIntoInput(setSimCurrentCgpa, '8.82', 'currentCgpa');

        // Step 3: Type Target CGPA
        await typeIntoInput(setSimTargetCgpa, '9.00', 'targetCgpa');

        // Step 4: Type Credits Completed
        await typeIntoInput(setSimCurrentCredits, '82.0', 'currentCredits');

        // Step 5: Type Credits Left
        await typeIntoInput(setSimCreditsLeft, '50.0', 'creditsLeft');

        // Step 6: Type Semesters Remaining
        await typeIntoInput(setSimSemsRemaining, '2', 'semsRemaining');

        // Step 7: Click Calculate Button
        setSimButtonActive(true);
        await delay(200);
        setSimButtonActive(false);
        await delay(300);

        // Step 8: Open Result Overlay
        setSimResultOpen(true);
        await delay(5000); // Hold result open for 5 seconds
      }
    };

    runSimulation();

    return () => {
      if (simTimeoutRef.current) {
        clearTimeout(simTimeoutRef.current);
      }
    };
  }, []);

  const handleFeatureClick = (targetPage) => {
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const testimonials = [
    {
      name: 'Abineshkumar',
      role: 'Final Year CSE undergraduate',
      text: 'The Target CGPA Planner is solid. I was stressing about placement cutoffs, but mapping out exactly what GPA I need in my final sems made it so simple. The UI is clean too.'
    },
    {
      name: 'Sudharshan Venkatraman',
      role: 'Final Year CSE undergraduate',
      text: 'Usually these GPA calculators have weird credit bugs, but this one works perfectly for our credit weightage. The FAT calculator helps me figure out minimum requirements in seconds.'
    },
    {
      name: 'Kritika Bansal',
      role: 'Final Year CSE undergraduate',
      text: 'Really clean dark mode. I mostly use the target planner before course registration to decide which courses are high-priority to maintain my CGPA.'
    },
    {
      name: 'Manas Pant',
      role: 'Final Year CSE undergraduate',
      text: 'Love the new theme. The site is fast, responsive, and doesn\'t spam ads like other planners. Pushing for that 9+ pointer goal feels way more structured now.'
    },
    {
      name: 'Dhruv Maheswari',
      role: 'Final Year ECE undergraduate',
      text: 'The FAT marks calculator is super helpful. It gives a clear picture of how much sessional stress I need to deal with before final exams.'
    },
    {
      name: 'Jigyasu Shekar',
      role: 'Final Year ECE undergraduate',
      text: 'Amazing work on the UI. The planners are straightforward to use and the math is always spot on. Highly recommend for semester planning.'
    },
    {
      name: 'Dilip',
      role: 'Third Year CSE undergraduate',
      text: 'The Target CGPA Planner is a unique feature. It helped me realize that a 9 pointer is still within reach if I focus on my upcoming lab-heavy semesters.'
    },
    {
      name: 'Uzma',
      role: 'Third Year CSE undergraduate',
      text: 'Super smooth transitions. Calculating cumulative CGPA with credit histories is usually a chore on excel sheets, but doing it here takes like 10 seconds.'
    },
    {
      name: 'Balaji',
      role: 'Second Year Mtech Software',
      text: 'Great tool for keeping track of academic goals. The interface is premium and responsive on mobile, which is great for quick updates during classes.'
    },
    {
      name: 'Atharv',
      role: 'Second Year Chemical Engineering',
      text: 'Simple, functional, and very well designed. The target CGPA planner gives me a realistic roadmap instead of just guessing numbers.'
    }
  ];

  return (
    <div className="homepage-root">
      {/* Hero Section */}
      <div className="hero-bg" id="top">
        <section className="hero">
          <span className="badge-custom animate__animated animate__fadeIn">
            Smart Academic Planner for VITians
          </span>
          <h1>
            Calculate your <br />
            <span className="rotating-text-container">{currentText}</span> <br />
            in seconds.
          </h1>
          <p>
            An elegant academic toolkit built to estimate semester GPA, calculate expected CGPA, map target pathways, and determine required FAT margins.
          </p>

          <div className="cta-group">
            <a href="#explore" className="btn-primary-custom" onClick={(e) => { e.preventDefault(); document.getElementById('explore').scrollIntoView({ behavior: 'smooth' }); }}>
              Get Started
            </a>
          </div>

          <div className="trust-row">
            <span><i className="fa-solid fa-check"></i> VIT Grading Formula</span>
            <span><i className="fa-solid fa-bolt"></i> Instant Result Outputs</span>
          </div>
        </section>
      </div>

      {/* Category Grid Section */}
      <section className="features-section" id="explore">
        <h2 className="section-title">Get Started Instantly</h2>
        <p className="section-subtitle">
          Select one of the calculators below to begin tracking your grades and planning your semester goals.
        </p>

        <div className="features-grid">
          <div 
            className="feature-card" 
            style={{ '--card-color': '#f97316', '--card-rgb': '249, 115, 22' }}
            onClick={() => handleFeatureClick('gpa')}
          >
            <div className="feature-icon-box">
              <i className="fas fa-calculator"></i>
            </div>
            <h3>GPA Calculator</h3>
            <p>Compute your semester GPA by entering course grades and credits. Support for up to 20 courses simultaneously.</p>
          </div>

          <div 
            className="feature-card" 
            style={{ '--card-color': '#06b6d4', '--card-rgb': '6, 182, 212' }}
            onClick={() => handleFeatureClick('cgpa')}
          >
            <div className="feature-icon-box">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>CGPA Calculator</h3>
            <p>Calculate your updated cumulative GPA by combining previous credits and CGPA with current semester results.</p>
          </div>

          <div 
            className="feature-card" 
            style={{ '--card-color': '#a855f7', '--card-rgb': '168, 85, 247' }}
            onClick={() => handleFeatureClick('planner')}
          >
            <div className="feature-icon-box">
              <i className="fas fa-bullseye"></i>
            </div>
            <h3>Target CGPA Planner</h3>
            <p>Input your desired target CGPA to map out the average GPA required in future credits/semesters to achieve it.</p>
          </div>

          <div 
            className="feature-card" 
            style={{ '--card-color': '#EC4899', '--card-rgb': '236, 72, 153' }}
            onClick={() => handleFeatureClick('fat')}
          >
            <div className="feature-icon-box">
              <i className="fas fa-percent"></i>
            </div>
            <h3>FAT Marks Calculator</h3>
            <p>Find out the exact exam score out of 100 needed in the Final Assessment Test (FAT) to pass, based on sessional marks.</p>
          </div>
        </div>
      </section>

      {/* Interactive Target CGPA Simulation Tutorial Section */}
      <section className="simulation-section">
        <h2 className="section-title">Visualize Your Academic Goals</h2>
        <p className="section-subtitle">
          The Target CGPA Planner is the crown jewel of VITrack. Whether you are aiming to cross the 9.0 threshold for dream placements, preparing for competitive higher studies, or simply pushing to finish with honors, watch how it instantly maps your path.
        </p>

        <div className="simulation-window">
          <div className="simulation-header">
            <div className="sim-dots">
              <div className="sim-dot red"></div>
              <div className="sim-dot yellow"></div>
              <div className="sim-dot green"></div>
            </div>
            <div className="sim-title">Target CGPA Planner (Placement Goal Scenario)</div>
            <div style={{ width: '52px' }}></div>
          </div>
          
          <div className="simulation-body">
            <div className="sim-form-row">
              <div className="sim-form-group">
                <label>Current CGPA</label>
                <input 
                  type="text" 
                  className={`sim-input ${simActiveField === 'currentCgpa' ? 'active' : ''}`}
                  value={simCurrentCgpa}
                  readOnly 
                  placeholder="e.g. 8.24"
                />
              </div>
              <div className="sim-form-group">
                <label>Target CGPA</label>
                <input 
                  type="text" 
                  className={`sim-input ${simActiveField === 'targetCgpa' ? 'active' : ''}`}
                  value={simTargetCgpa}
                  readOnly 
                  placeholder="e.g. 8.50"
                />
              </div>
            </div>

            <div className="sim-form-row">
              <div className="sim-form-group">
                <label>Credits Completed</label>
                <input 
                  type="text" 
                  className={`sim-input ${simActiveField === 'currentCredits' ? 'active' : ''}`}
                  value={simCurrentCredits}
                  readOnly 
                  placeholder="e.g. 78.5"
                />
              </div>
              <div className="sim-form-group">
                <label>Overall Credits Left</label>
                <input 
                  type="text" 
                  className={`sim-input ${simActiveField === 'creditsLeft' ? 'active' : ''}`}
                  value={simCreditsLeft}
                  readOnly 
                  placeholder="e.g. 21.5"
                />
              </div>
            </div>

            <div className="sim-form-row">
              <div className="sim-form-group">
                <label>Semesters Remaining</label>
                <input 
                  type="text" 
                  className={`sim-input ${simActiveField === 'semsRemaining' ? 'active' : ''}`}
                  value={simSemsRemaining}
                  readOnly 
                  placeholder="e.g. 1"
                />
              </div>
              <div className="sim-form-group sim-group-hidden" style={{ visibility: 'hidden' }}>
                <label>&nbsp;</label>
                <input type="text" className="sim-input" readOnly />
              </div>
            </div>

            <button className={`sim-calculate-btn ${simButtonActive ? 'active' : ''}`} disabled>
              Calculate Required GPA
            </button>

            {/* Simulated Modal Popup */}
            {simResultOpen ? (
              <div className="sim-output animate__animated animate__fadeIn">
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>Required Average GPA</div>
                  <div className="sim-result-value">9.30 / 10.00</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    To reach target CGPA of 9.00 across remaining 50.0 credits (2 semesters).
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#60a5fa', marginTop: '6px', fontStyle: 'italic' }}>
                    "This is a realistic target. Maintain focused study habits to achieve a 9.30 average and secure your 9.00 GPA placement goal!"
                  </div>
                </div>
              </div>
            ) : (
              <div className="sim-output" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', borderStyle: 'dotted' }}>
                Waiting for input values...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Marquee Section */}
      <section className="testimonials-section">
        <h2 className="section-title">Loved by VITians</h2>
        <p className="section-subtitle">
          Join hundreds of students who plan their semesters using VITrack.
        </p>

        <div className="testimonials-marquee">
          <div className="testimonials-track">
            {/* Render testimonials twice to achieve smooth infinite scrolling */}
            {[...testimonials, ...testimonials].map((item, idx) => (
              <div className="testimonial-card" key={idx}>
                <div className="testimonial-header">
                  <div className="testimonial-info">
                    <h4>{item.name}</h4>
                    <span>{item.role}</span>
                  </div>
                </div>
                <div className="testimonial-stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="testimonial-text">
                  "{item.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suggestion & Feedback Section */}
      <section className="future-plans">
        <div className="future-plans-content">
          <div className="future-icon" style={{ animation: 'none' }}>
            <i className="fa-solid fa-circle-question"></i>
          </div>
          <h2 className="future-title">Suggestion & Feedback</h2>
          <p className="future-description">
            Have any ideas, feature requests, or suggestions to make VITrack better? Drop your feedback below, and let's build the ultimate academic companion together.
          </p>

          <form action="https://api.web3forms.com/submit" method="POST" className="feedback-form">
            <input type="hidden" name="access_key" value="e0630778-a382-4f61-93cd-649c0c7d1ae7" />
            
            <div className="feedback-input-row">
              <input 
                type="text" 
                name="name" 
                className="input-custom" 
                placeholder="Full name" 
                required 
              />
              <input 
                type="email" 
                name="email" 
                className="input-custom" 
                placeholder="Email address" 
                required 
              />
            </div>

            <textarea 
              name="message" 
              className="input-custom feedback-textarea" 
              placeholder="Your Message" 
              rows="4"
              required 
            ></textarea>

            <button type="submit" className="btn-calc feedback-submit-btn">
              Send Message <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

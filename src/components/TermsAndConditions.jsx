import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="calculator-container" style={{ maxWidth: '1000px' }}>
      <div className="calculator-card animate__animated animate__fadeIn">
        <h2 className="calculator-title">Terms and Conditions</h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '20px' }}>
          <p>
            Welcome to VITrack. By accessing or using this website, you agree to be bound by these Terms and Conditions.
          </p>
          <h4 style={{ color: '#fff', marginTop: '30px' }}>Use of the Service</h4>
          <p>
            VITrack is provided as a free tool to help VIT students estimate and plan their academic grades. The calculations are based on the standard VIT grading system. However, this is an unofficial tool and should be used for estimation purposes only. 
          </p>
          <h4 style={{ color: '#fff', marginTop: '30px' }}>Accuracy of Information</h4>
          <p>
            While we strive for 100% accuracy, VITrack does not guarantee that the computed results will perfectly match official university transcripts due to rounding rules or curriculum changes. Always verify your final grades on VTOP.
          </p>
          <h4 style={{ color: '#fff', marginTop: '30px' }}>Intellectual Property</h4>
          <p>
            The design, layout, and code of VITrack are copyrighted. You may not duplicate, distribute, or host this application elsewhere without explicit permission from the creator.
          </p>
          <h4 style={{ color: '#fff', marginTop: '30px' }}>Disclaimer</h4>
          <p>
            VITrack and its creator shall not be held liable for any academic or personal decisions made based on the calculations provided by this application.
          </p>
        </div>
      </div>
    </div>
  );
}

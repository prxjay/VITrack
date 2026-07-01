import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="calculator-container" style={{ maxWidth: '1000px' }}>
      <div className="calculator-card animate__animated animate__fadeIn">
        <h2 className="calculator-title">Privacy Policy</h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '20px' }}>
          <p>
            At VITrack, your privacy is our priority. We are committed to protecting your personal information and ensuring that your data remains secure.
          </p>
          <h4 style={{ color: '#fff', marginTop: '30px' }}>Information We Collect</h4>
          <p>
            VITrack does not collect, store, or transmit any personally identifiable information. All calculations for GPA, CGPA, and FAT predictions are performed locally on your browser.
          </p>
          <h4 style={{ color: '#fff', marginTop: '30px' }}>Local Storage</h4>
          <p>
            We may use local browser storage (such as localStorage) solely to save your calculator inputs or theme preferences to provide a seamless experience upon your return. This data never leaves your device.
          </p>
          <h4 style={{ color: '#fff', marginTop: '30px' }}>Third-Party Services</h4>
          <p>
            We use a completely anonymous visitor counter API to display live and total visits. It does not track IPs or associate data with individual users.
          </p>
          <h4 style={{ color: '#fff', marginTop: '30px' }}>Contact Us</h4>
          <p>
            If you have any questions or concerns regarding this Privacy Policy, please feel free to reach out via the <strong>Suggestion & Feedback</strong> card on our Home page.
          </p>
        </div>
      </div>
    </div>
  );
}

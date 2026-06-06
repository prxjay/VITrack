import React from 'react';

export default function HowToUse() {
  return (
    <div className="calculator-container" style={{ maxWidth: '1000px' }}>
      <div className="calculator-card animate__animated animate__fadeIn">
        <h2 className="calculator-title">Quick User Guide</h2>
        <p className="calculator-subtitle">
          Say goodbye to complex formulas. Here is a simple, visual guide to using VITrack calculators.
        </p>

        <div className="row g-4">
          {/* GPA Card */}
          <div className="col-md-6">
            <div className="note-box h-100" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', padding: '25px', borderRadius: '16px' }}>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: 'rgba(249, 115, 22, 0.15)', color: '#f97316', width: '35px', height: '35px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem', fontWeight: 'bold' }}>
                  <i className="fas fa-calculator"></i>
                </span>
                GPA Calculator
              </h3>
              <div className="guide-steps" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#f97316', fontWeight: 'bold' }}>01.</span>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5' }}>Add up to 20 courses matching your current semester registration.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#f97316', fontWeight: 'bold' }}>02.</span>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5' }}>Select your expected grade and credits for each course.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#f97316', fontWeight: 'bold' }}>03.</span>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5' }}>Click <strong>Calculate GPA</strong> to see your semester score.</p>
                </div>
              </div>
              <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(249, 115, 22, 0.05)', borderRadius: '8px', border: '1px solid rgba(249, 115, 22, 0.15)', fontSize: '0.8rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                Grade Weights: S = 10 • A = 9 • B = 8 • C = 7 • D = 6 • E = 5
              </div>
            </div>
          </div>

          {/* CGPA Card */}
          <div className="col-md-6">
            <div className="note-box h-100" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', padding: '25px', borderRadius: '16px' }}>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4', width: '35px', height: '35px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem', fontWeight: 'bold' }}>
                  <i className="fas fa-chart-line"></i>
                </span>
                CGPA Calculator
              </h3>
              <div className="guide-steps" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#06b6d4', fontWeight: 'bold' }}>01.</span>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5' }}>Enter your previous completed credits and cumulative CGPA.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#06b6d4', fontWeight: 'bold' }}>02.</span>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5' }}>Enter your current semester credits and expected GPA.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#06b6d4', fontWeight: 'bold' }}>03.</span>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5' }}>Get your updated cumulative CGPA instantly.</p>
                </div>
              </div>
              <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(6, 182, 212, 0.05)', borderRadius: '8px', border: '1px solid rgba(6, 182, 212, 0.15)', fontSize: '0.8rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                Excludes non-graded courses (Bridge or Co-curriculars)
              </div>
            </div>
          </div>

          {/* Target CGPA Card */}
          <div className="col-md-6">
            <div className="note-box h-100" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', padding: '25px', borderRadius: '16px' }}>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', width: '35px', height: '35px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem', fontWeight: 'bold' }}>
                  <i className="fas fa-bullseye"></i>
                </span>
                Target CGPA Planner
              </h3>
              <div className="guide-steps" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#a855f7', fontWeight: 'bold' }}>01.</span>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5' }}>Input current CGPA, target CGPA, and credits completed so far.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#a855f7', fontWeight: 'bold' }}>02.</span>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5' }}>Input remaining overall credits and semesters left.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#a855f7', fontWeight: 'bold' }}>03.</span>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5' }}>Find out the average semester GPA required to hit your target.</p>
                </div>
              </div>
              <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(168, 85, 247, 0.05)', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.15)', fontSize: '0.8rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                Includes a smart difficulty rating for your target goals
              </div>
            </div>
          </div>

          {/* FAT Card */}
          <div className="col-md-6">
            <div className="note-box h-100" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', padding: '25px', borderRadius: '16px' }}>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#EC4899', width: '35px', height: '35px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem', fontWeight: 'bold' }}>
                  <i className="fas fa-percent"></i>
                </span>
                FAT Marks Calculator
              </h3>
              <div className="guide-steps" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#EC4899', fontWeight: 'bold' }}>01.</span>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5' }}>Fill in CAT-1 and CAT-2 internal marks (out of 50 each).</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#EC4899', fontWeight: 'bold' }}>02.</span>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5' }}>Add digital assignments (DA-1, DA-2, DA-3 out of 10 each).</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#EC4899', fontWeight: 'bold' }}>03.</span>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5' }}>See the exact written FAT exam score out of 100 needed to pass.</p>
                </div>
              </div>
              <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(236, 72, 153, 0.05)', borderRadius: '8px', border: '1px solid rgba(236, 72, 153, 0.15)', fontSize: '0.8rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                Passing: Min 40/100 in FAT exam & Min 50/100 overall marks
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function CGPACalculator() {
  const [creditsLastSem, setCreditsLastSem] = useState('');
  const [cgpaLastSem, setCgpaLastSem] = useState('');
  const [creditsThisSem, setCreditsThisSem] = useState('');
  const [gpaThisSem, setGpaThisSem] = useState('');

  const handleInputLimit = (val, max, setter) => {
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > max) {
      setter(max.toString());
    } else {
      setter(val);
    }
  };

  const resetCalculator = () => {
    setCreditsLastSem('');
    setCgpaLastSem('');
    setCreditsThisSem('');
    setGpaThisSem('');
  };

  const calculateCgpa = (e) => {
    e.preventDefault();

    const cLast = parseFloat(creditsLastSem);
    const gLast = parseFloat(cgpaLastSem);
    const cThis = parseFloat(creditsThisSem);
    const gThis = parseFloat(gpaThisSem);

    let hasError = false;
    let errorMessage = '';

    if (isNaN(cLast) || cLast < 0 || cLast > 250) {
      hasError = true;
      errorMessage = 'Please enter valid credits till last semester (0-250).';
    } else if (isNaN(gLast) || gLast < 0 || gLast > 10) {
      hasError = true;
      errorMessage = 'Please enter valid CGPA till last semester (0-10).';
    } else if (isNaN(cThis) || cThis < 0 || cThis > 39) {
      hasError = true;
      errorMessage = 'Please enter valid credits for this semester (0-39).';
    } else if (isNaN(gThis) || gThis < 0 || gThis > 10) {
      hasError = true;
      errorMessage = 'Please enter valid GPA for this semester (0-10).';
    } else if (cLast === 0 && cThis === 0) {
      hasError = true;
      errorMessage = 'Credits cannot be zero for both terms.';
    }

    if (hasError) {
      Swal.fire({
        title: 'Invalid Input',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#6366f1',
        background: '#0c121e',
        color: '#fff',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          htmlContainer: 'custom-swal-html'
        }
      });
      return;
    }

    const totalCredits = cLast + cThis;
    const weightedSum = (gLast * cLast) + (gThis * cThis);
    const newCgpaResult = (weightedSum / totalCredits).toFixed(2);

    Swal.fire({
      title: 'Your New CGPA',
      html: `
        <div style="padding: 10px 0; text-align: center;">
          <p style="font-size: 3.5em; font-weight: 800; color: #818cf8; margin: 15px 0; font-family: 'Google Sans', sans-serif;">${newCgpaResult}</p>
          <div style="margin-top: 20px; padding: 15px; background: rgba(255, 255, 255, 0.03); border-radius: 10px; border: 1px solid rgba(255,255,255,0.06); text-align: left;">
            <p style="font-size: 0.95em; color: rgba(255, 255, 255, 0.7); margin: 6px 0;">
              Previous CGPA: <strong style="color: #fff; float: right;">${gLast.toFixed(2)}</strong>
            </p>
            <p style="font-size: 0.95em; color: rgba(255, 255, 255, 0.7); margin: 6px 0;">
              Current Semester GPA: <strong style="color: #fff; float: right;">${gThis.toFixed(2)}</strong>
            </p>
            <p style="font-size: 0.95em; color: rgba(255, 255, 255, 0.7); margin: 6px 0; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 6px;">
              Total Cumulative Credits: <strong style="color: #fff; float: right;">${totalCredits}</strong>
            </p>
          </div>
        </div>
      `,
      confirmButtonColor: '#6366f1',
      confirmButtonText: 'Got it!',
      background: '#0c121e',
      color: '#fff',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        htmlContainer: 'custom-swal-html'
      }
    });
  };

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <h2 className="calculator-title">Quick CGPA Calculator</h2>
        <p className="calculator-subtitle">
          Calculate your updated cumulative GPA by combining last semester's record with your current semester's grades.
        </p>

        <form onSubmit={calculateCgpa}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label-custom" htmlFor="credits-last">
                Credits till last Sem
                <span 
                  className="tooltip-icon-custom" 
                  title="To view credits earned, Go to VTOP → Examinations → Grade History → CGPA Details"
                >
                  <i className="fas fa-question-circle"></i>
                </span>
              </label>
              <input 
                id="credits-last"
                type="number" 
                className="input-custom" 
                placeholder="Enter credits (e.g. 78.5)"
                value={creditsLastSem}
                onChange={(e) => handleInputLimit(e.target.value, 250, setCreditsLastSem)}
                min="0"
                max="250"
                step="0.5"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label-custom" htmlFor="cgpa-last">
                CGPA till last Sem
                <span 
                  className="tooltip-icon-custom" 
                  title="Go to VTOP → Examinations → Grade History → CGPA Details"
                >
                  <i className="fas fa-question-circle"></i>
                </span>
              </label>
              <input 
                id="cgpa-last"
                type="number" 
                className="input-custom" 
                placeholder="Enter CGPA (e.g. 8.42)"
                value={cgpaLastSem}
                onChange={(e) => handleInputLimit(e.target.value, 10, setCgpaLastSem)}
                min="0"
                max="10"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label-custom" htmlFor="credits-this">
                Credits in this Sem
              </label>
              <input 
                id="credits-this"
                type="number" 
                className="input-custom" 
                placeholder="Enter credits (e.g. 21.5)"
                value={creditsThisSem}
                onChange={(e) => handleInputLimit(e.target.value, 39, setCreditsThisSem)}
                min="0"
                max="39"
                step="0.5"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label-custom" htmlFor="gpa-this">
                GPA this semester
              </label>
              <input 
                id="gpa-this"
                type="number" 
                className="input-custom" 
                placeholder="Enter GPA (e.g. 9.15)"
                value={gpaThisSem}
                onChange={(e) => handleInputLimit(e.target.value, 10, setGpaThisSem)}
                min="0"
                max="10"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="note-box text-center">
            Note: Bridge courses and Non-graded Core Requirements won't be counted for CGPA calculation.
          </div>

          <button type="submit" className="btn-calc">
            Calculate CGPA <i className="fas fa-arrow-right"></i>
          </button>
          <button type="button" className="btn-reset" onClick={resetCalculator}>
            Reset Fields
          </button>
        </form>
      </div>
    </div>
  );
}

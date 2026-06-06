import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function TargetCGPAPlanner() {
  const [currentCgpa, setCurrentCgpa] = useState('');
  const [targetCgpa, setTargetCgpa] = useState('');
  const [currentCredits, setCurrentCredits] = useState('');
  const [creditsLeft, setCreditsLeft] = useState('');
  const [semestersRemaining, setSemestersRemaining] = useState('');

  const handleInputLimit = (val, max, setter) => {
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > max) {
      setter(max.toString());
    } else {
      setter(val);
    }
  };

  const resetCalculator = () => {
    setCurrentCgpa('');
    setTargetCgpa('');
    setCurrentCredits('');
    setCreditsLeft('');
    setSemestersRemaining('');
  };

  const calculateRequiredGpa = (e) => {
    e.preventDefault();

    const curCgpa = parseFloat(currentCgpa);
    const tarCgpa = parseFloat(targetCgpa);
    const curCreds = parseFloat(currentCredits);
    const credsLeft = parseFloat(creditsLeft);
    const semsLeft = parseInt(semestersRemaining);

    let hasError = false;
    let errorMessage = '';

    if (isNaN(curCgpa) || curCgpa < 0 || curCgpa > 10) {
      hasError = true;
      errorMessage = 'Please enter a valid current CGPA (0-10).';
    } else if (isNaN(tarCgpa) || tarCgpa < 0 || tarCgpa > 10) {
      hasError = true;
      errorMessage = 'Please enter a valid target CGPA (0-10).';
    } else if (isNaN(curCreds) || curCreds <= 0 || curCreds > 250) {
      hasError = true;
      errorMessage = 'Please enter valid credits completed so far (0-250).';
    } else if (isNaN(credsLeft) || credsLeft <= 0 || credsLeft > 250) {
      hasError = true;
      errorMessage = 'Please enter valid overall credits left (0-250).';
    } else if (isNaN(semsLeft) || semsLeft < 1 || semsLeft > 20) {
      hasError = true;
      errorMessage = 'Please enter valid semesters remaining (1-20).';
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

    const totalCredits = curCreds + credsLeft;
    const requiredGpaVal = (tarCgpa * totalCredits - curCgpa * curCreds) / credsLeft;

    if (requiredGpaVal > 10) {
      Swal.fire({
        title: 'Target Unachievable',
        html: `
          <div style="padding: 10px 0; text-align: center;">
            <p style="font-size: 1.05em; color: rgba(255, 255, 255, 0.75); line-height: 1.6;">
              Your target CGPA of <strong style="color: #fff;">${tarCgpa.toFixed(2)}</strong> is mathematically impossible to achieve with the given credits.<br><br>
              You would need an average GPA of <strong style="color: #f87171; font-size: 1.15em;">${requiredGpaVal.toFixed(2)}</strong> across your remaining <strong style="color: #fff;">${credsLeft}</strong> credits, which exceeds the maximum possible GPA of 10.0.
            </p>
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
    } else if (requiredGpaVal <= 0) {
      Swal.fire({
        title: 'Target Already Secured! 🎉',
        html: `
          <div style="padding: 10px 0; text-align: center;">
            <p style="font-size: 1.05em; color: rgba(255, 255, 255, 0.75); line-height: 1.6;">
              Congratulations! Your current CGPA of <strong style="color: #fff;">${curCgpa.toFixed(2)}</strong> is already enough to secure your target of <strong style="color: #fff;">${tarCgpa.toFixed(2)}</strong>.<br><br>
              You can maintain or even lower your performance in remaining semesters and still stay above your target.
            </p>
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
    } else {
      let interpretation = '';
      let colorStyle = '';

      if (requiredGpaVal >= 9.5) {
        interpretation = "This is a very challenging target. You'll need exceptional performance in every remaining semester.";
        colorStyle = '#fbbf24'; // Yellow
      } else if (requiredGpaVal >= 8.5) {
        interpretation = "This requires strong, consistent performance. Plan your courses and study schedule carefully.";
        colorStyle = '#60a5fa'; // Blue
      } else if (requiredGpaVal >= 7.5) {
        interpretation = "This is achievable with focused effort. Stay consistent and maintain good study habits.";
        colorStyle = '#60a5fa'; // Blue
      } else {
        interpretation = "This is a realistic target. Maintain your current performance level to achieve it.";
        colorStyle = '#4ade80'; // Green
      }

      Swal.fire({
        title: `Required Average GPA: ${requiredGpaVal.toFixed(2)}`,
        html: `
          <div style="padding: 10px 0; text-align: center;">
            <p style="font-size: 1.05em; color: rgba(255, 255, 255, 0.75); line-height: 1.6; margin-bottom: 20px;">
              To reach a CGPA of <strong style="color: #fff;">${tarCgpa.toFixed(2)}</strong>, you need an average GPA of <strong style="color: #818cf8; font-size: 1.25em;">${requiredGpaVal.toFixed(2)}</strong> across your remaining <strong style="color: #fff;">${credsLeft}</strong> credits (${semsLeft} semester${semsLeft > 1 ? 's' : ''}).
            </p>
            <div style="font-size: 0.95em; color: ${colorStyle}; line-height: 1.6; padding: 15px; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
              <em>"${interpretation}"</em>
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
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <h2 className="calculator-title">Target CGPA Planner</h2>
        <p className="calculator-subtitle">
          Calculate the average GPA you need in your remaining credits and semesters to achieve your CGPA goal.
        </p>

        <form onSubmit={calculateRequiredGpa}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label-custom" htmlFor="current-cgpa">
                Current CGPA
              </label>
              <input 
                id="current-cgpa"
                type="number" 
                className="input-custom" 
                placeholder="Enter current CGPA (e.g. 8.24)"
                value={currentCgpa}
                onChange={(e) => handleInputLimit(e.target.value, 10, setCurrentCgpa)}
                min="0"
                max="10"
                step="0.01"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label-custom" htmlFor="target-cgpa">
                Target CGPA
              </label>
              <input 
                id="target-cgpa"
                type="number" 
                className="input-custom" 
                placeholder="Enter target CGPA (e.g. 8.50)"
                value={targetCgpa}
                onChange={(e) => handleInputLimit(e.target.value, 10, setTargetCgpa)}
                min="0"
                max="10"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label-custom" htmlFor="current-credits">
                Credits Completed So Far
                <span 
                  className="tooltip-icon-custom" 
                  title="Total credits completed till now. Go to VTOP → Examinations → Grade History → CGPA Details"
                >
                  <i className="fas fa-question-circle"></i>
                </span>
              </label>
              <input 
                id="current-credits"
                type="number" 
                className="input-custom" 
                placeholder="Enter credits (e.g. 78.5)"
                value={currentCredits}
                onChange={(e) => handleInputLimit(e.target.value, 250, setCurrentCredits)}
                min="0"
                max="250"
                step="0.5"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label-custom" htmlFor="credits-left">
                Overall Credits Left
                <span 
                  className="tooltip-icon-custom" 
                  title="Enter remaining credits to be completed. Go to VTOP → Examinations → Grade History → CGPA Details"
                >
                  <i className="fas fa-question-circle"></i>
                </span>
              </label>
              <input 
                id="credits-left"
                type="number" 
                className="input-custom" 
                placeholder="Enter remaining credits (e.g. 21.5)"
                value={creditsLeft}
                onChange={(e) => handleInputLimit(e.target.value, 250, setCreditsLeft)}
                min="0"
                max="250"
                step="0.5"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label-custom" htmlFor="sems-remaining">
              Semesters Remaining
              <span 
                className="tooltip-icon-custom" 
                title="Calculate average GPA based on entered number of semesters"
              >
                <i className="fas fa-question-circle"></i>
              </span>
            </label>
            <input 
              id="sems-remaining"
              type="number" 
              className="input-custom" 
              placeholder="Enter number of semesters (e.g. 1)"
              value={semestersRemaining}
              onChange={(e) => handleInputLimit(e.target.value, 20, setSemestersRemaining)}
              min="1"
              max="20"
              step="1"
              required
            />
          </div>

          <div className="note-box text-center">
            Note: Bridge courses and Non-graded Core Requirements won't be counted for CGPA calculation.
          </div>

          <button type="submit" className="btn-calc">
            Calculate Required GPA <i className="fas fa-arrow-right"></i>
          </button>
          <button type="button" className="btn-reset" onClick={resetCalculator}>
            Reset Fields
          </button>
        </form>
      </div>
    </div>
  );
}

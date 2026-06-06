import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function FATCalculator() {
  const [cat1, setCat1] = useState('');
  const [cat2, setCat2] = useState('');
  const [da1, setDa1] = useState('');
  const [da2, setDa2] = useState('');
  const [da3, setDa3] = useState('');

  const handleInputLimit = (val, max, setter) => {
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > max) {
      setter(max.toString());
    } else {
      setter(val);
    }
  };

  const resetCalculator = () => {
    setCat1('');
    setCat2('');
    setDa1('');
    setDa2('');
    setDa3('');
  };

  const calculateFatRequirement = (e) => {
    e.preventDefault();

    const c1Raw = parseFloat(cat1);
    const c2Raw = parseFloat(cat2);
    const d1 = parseFloat(da1);
    const d2 = parseFloat(da2);
    const d3 = parseFloat(da3);

    // Validate inputs
    if (isNaN(c1Raw) && isNaN(c2Raw) && isNaN(d1) && isNaN(d2) && isNaN(d3)) {
      Swal.fire({
        title: 'No Input',
        text: 'Please enter at least one valid mark.',
        icon: 'warning',
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

    const c1 = isNaN(c1Raw) ? 0 : Math.floor((c1Raw / 50) * 15);
    const c2 = isNaN(c2Raw) ? 0 : Math.floor((c2Raw / 50) * 15);
    const d1Val = isNaN(d1) ? 0 : d1;
    const d2Val = isNaN(d2) ? 0 : d2;
    const d3Val = isNaN(d3) ? 0 : d3;

    // Calculate total internals out of 60
    const totalInternals = c1 + c2 + d1Val + d2Val + d3Val;

    // Required marks to hit 50/100 overall
    const requiredMarks = 50 - totalInternals;

    let requiredFATScore = 0;
    let passStatus = '';
    let statusColor = '';

    if (requiredMarks <= 0) {
      requiredFATScore = 40;
      passStatus = 'You already have enough marks from CAT and DA to pass (> 50/60)! However, you still need to score at least 40/100 in the final FAT to clear the minimum component passing criteria.';
      statusColor = '#4ade80'; // Green
    } else if (requiredMarks > 40) {
      requiredFATScore = 100;
      passStatus = 'It is mathematically impossible to pass this course. You need more than 40 marks from the FAT, but the FAT exam only contributes a maximum of 40 weightage points.';
      statusColor = '#f87171'; // Red
    } else {
      requiredFATScore = (requiredMarks / 40) * 100;
      if (requiredFATScore < 40) {
        requiredFATScore = 40;
        passStatus = 'You need to score at least 40/100 in the FAT exam to clear the component passing criteria and pass the course.';
        statusColor = '#4ade80'; // Green
      } else {
        passStatus = `You need to score at least ${requiredFATScore.toFixed(2)}/100 in the final FAT exam to pass this course.`;
        statusColor = '#fbbf24'; // Yellow
      }
    }

    Swal.fire({
      title: 'FAT Requirement Analysis',
      html: `
        <div style="text-align: center; padding: 10px 0;">
          <div style="margin-bottom: 20px;">
            <p style="font-size: 0.95em; color: rgba(255, 255, 255, 0.7); margin-bottom: 4px;">Current Internals (CAT + DA)</p>
            <p style="font-size: 2.2em; font-weight: bold; color: #fff; margin: 0;">${totalInternals.toFixed(1)}<span style="font-size: 0.6em; color: var(--text-muted);">/60</span></p>
          </div>
          <div style="margin-bottom: 20px; padding: 18px; background: rgba(99, 102, 241, 0.05); border-radius: 12px; border: 1px solid rgba(99, 102, 241, 0.15);">
            <p style="font-size: 0.95em; color: rgba(255, 255, 255, 0.7); margin-bottom: 4px;">Minimum FAT Required</p>
            <p style="font-size: 2.8em; font-weight: bold; color: #818cf8; margin: 0;">${requiredMarks > 40 ? 'Impossible' : requiredFATScore.toFixed(2)}<span style="font-size: 0.5em; color: var(--primary-light);">/100</span></p>
          </div>
          <p style="margin: 0; color: ${statusColor}; font-size: 0.95em; line-height: 1.6; padding: 15px; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
            ${passStatus}
          </p>
        </div>
      `,
      confirmButtonColor: '#6366f1',
      confirmButtonText: 'Understood!',
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
        <h2 className="calculator-title">FAT Marks Calculator</h2>
        <p className="calculator-subtitle">
          Enter your CAT exam marks and Digital Assignments (DA) to find out the minimum score you need in the Final Assessment Test (FAT) to pass.
        </p>

        <form onSubmit={calculateFatRequirement}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label-custom" htmlFor="cat1">
                CAT-1 (out of 50)
              </label>
              <input 
                id="cat1"
                type="number" 
                className="input-custom" 
                placeholder="Enter marks out of 50"
                value={cat1}
                onChange={(e) => handleInputLimit(e.target.value, 50, setCat1)}
                min="0"
                max="50"
                step="0.5"
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                Will be converted to /15 weightage
              </span>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label-custom" htmlFor="cat2">
                CAT-2 (out of 50)
              </label>
              <input 
                id="cat2"
                type="number" 
                className="input-custom" 
                placeholder="Enter marks out of 50"
                value={cat2}
                onChange={(e) => handleInputLimit(e.target.value, 50, setCat2)}
                min="0"
                max="50"
                step="0.5"
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                Will be converted to /15 weightage
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label-custom" htmlFor="da1">
                DA/Quiz-1 (out of 10)
              </label>
              <input 
                id="da1"
                type="number" 
                className="input-custom" 
                placeholder="Marks / 10"
                value={da1}
                onChange={(e) => handleInputLimit(e.target.value, 10, setDa1)}
                min="0"
                max="10"
                step="0.5"
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label-custom" htmlFor="da2">
                DA/Quiz-2 (out of 10)
              </label>
              <input 
                id="da2"
                type="number" 
                className="input-custom" 
                placeholder="Marks / 10"
                value={da2}
                onChange={(e) => handleInputLimit(e.target.value, 10, setDa2)}
                min="0"
                max="10"
                step="0.5"
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label-custom" htmlFor="da3">
                DA/Quiz-3 (out of 10)
              </label>
              <input 
                id="da3"
                type="number" 
                className="input-custom" 
                placeholder="Marks / 10"
                value={da3}
                onChange={(e) => handleInputLimit(e.target.value, 10, setDa3)}
                min="0"
                max="10"
                step="0.5"
              />
            </div>
          </div>

          <div className="note-box">
            <strong>VIT Passing Criteria:</strong> To clear a course, a student requires an overall score of at least 50% (50/100) across internals and externals, and a minimum component passing score of 40% (40/100) in the final FAT exam.
          </div>

          <button type="submit" className="btn-calc">
            <i className="fas fa-calculator"></i> Calculate FAT Requirement
          </button>
          <button type="button" className="btn-reset" onClick={resetCalculator}>
            Reset Fields
          </button>
        </form>
      </div>
    </div>
  );
}

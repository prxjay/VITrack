import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function GPACalculator() {
  const [courses, setCourses] = useState([
    { grade: '', credits: '' },
    { grade: '', credits: '' },
    { grade: '', credits: '' },
    { grade: '', credits: '' },
    { grade: '', credits: '' }
  ]);

  const grades = ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'N'];
  const creditOptions = [1, 1.5, 2, 3, 4, 5, 8, 12, 14, 20];

  const handleGradeChange = (index, val) => {
    const updated = [...courses];
    updated[index].grade = val;
    setCourses(updated);
  };

  const handleCreditsChange = (index, val) => {
    const updated = [...courses];
    updated[index].credits = val;
    setCourses(updated);
  };

  const addCourse = () => {
    if (courses.length >= 20) {
      Swal.fire({
        title: 'Limit Reached',
        text: 'You can add up to 20 courses.',
        icon: 'info',
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
    setCourses([...courses, { grade: '', credits: '' }]);
  };

  const deleteCourse = (index) => {
    if (courses.length <= 1) {
      Swal.fire({
        title: 'Cannot Delete',
        text: 'You need at least one course row.',
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
    const updated = courses.filter((_, idx) => idx !== index);
    setCourses(updated);
  };

  const resetCalculator = () => {
    setCourses([
      { grade: '', credits: '' },
      { grade: '', credits: '' },
      { grade: '', credits: '' },
      { grade: '', credits: '' },
      { grade: '', credits: '' }
    ]);
  };

  const calculateGpa = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;
    let hasError = false;
    let errorMessage = '';
    let hasEntries = false;

    courses.forEach((course, index) => {
      // Validate
      if (!course.grade && course.credits) {
        errorMessage = `Please select a valid grade for Course ${index + 1}.`;
        hasError = true;
      } else if (course.grade && !course.credits) {
        errorMessage = `Please select valid credits for Course ${index + 1}.`;
        hasError = true;
      } else if (course.grade && course.credits) {
        hasEntries = true;
        const gradePoints = 
          course.grade === 'S' ? 10 :
          course.grade === 'A' ? 9 :
          course.grade === 'B' ? 8 :
          course.grade === 'C' ? 7 :
          course.grade === 'D' ? 6 :
          course.grade === 'E' ? 5 : 0; // F and N are 0

        totalCredits += parseFloat(course.credits);
        totalGradePoints += parseFloat(course.credits) * gradePoints;
      }
    });

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
    } else if (hasEntries && totalCredits > 0) {
      const gpaResult = (totalGradePoints / totalCredits).toFixed(2);
      Swal.fire({
        title: 'Your Semester GPA',
        html: `
          <div style="padding: 10px 0; text-align: center;">
            <p style="font-size: 3.5em; font-weight: 800; color: #818cf8; margin: 15px 0; font-family: 'Google Sans', sans-serif;">${gpaResult}</p>
            <div style="margin-top: 20px; padding: 12px; background: rgba(255, 255, 255, 0.04); border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
              <p style="font-size: 1.05em; color: rgba(255, 255, 255, 0.75); margin: 0;">
                Total Semester Credits: <strong style="color: #fff;">${totalCredits}</strong>
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
    } else {
      Swal.fire({
        title: 'No Input',
        text: 'Please select grades and credits for at least one course to compute GPA.',
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
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <h2 className="calculator-title">GPA Calculator</h2>
        <p className="calculator-subtitle">
          Select course grades and credits to compute your current semester GPA.
        </p>

        <div className="courses-list">
          {courses.map((course, idx) => (
            <div className="course-row-grid animate__animated animate__fadeIn" key={idx}>
              <div className="form-label-custom" style={{ margin: 0, fontWeight: '600' }}>
                Course {idx + 1}
              </div>
              <div>
                <select 
                  className="select-custom" 
                  value={course.grade} 
                  onChange={(e) => handleGradeChange(idx, e.target.value)}
                  aria-label={`Course ${idx + 1} grade`}
                >
                  <option value="">Select Grade</option>
                  {grades.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <select 
                  className="select-custom" 
                  value={course.credits} 
                  onChange={(e) => handleCreditsChange(idx, e.target.value)}
                  aria-label={`Course ${idx + 1} credits`}
                >
                  <option value="">Select Credits</option>
                  {creditOptions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <button 
                  type="button" 
                  className="btn-delete-course" 
                  onClick={() => deleteCourse(idx)}
                  title={`Delete course ${idx + 1}`}
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="course-action-buttons">
          <button type="button" className="btn-add-course" onClick={addCourse}>
            <i className="fas fa-plus"></i> Add Course
          </button>
        </div>

        <div style={{ marginTop: '30px' }}>
          <button type="button" className="btn-calc" onClick={calculateGpa}>
            <i className="fas fa-calculator"></i> Calculate GPA
          </button>
          <button type="button" className="btn-reset" onClick={resetCalculator}>
            Reset Fields
          </button>
        </div>

        <div className="note-box">
          <strong>VIT GPA Calculation Info:</strong> GPA is calculated as: Sum of (Course Credits × Grade Points) / Total Credits. The grade point weights are: 
          <span style={{ color: 'var(--primary-light)' }}> S = 10, A = 9, B = 8, C = 7, D = 6, E = 5, F/N = 0</span>.
        </div>
      </div>
    </div>
  );
}

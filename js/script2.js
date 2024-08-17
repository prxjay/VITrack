// Array to hold subjects data
let subjects = Array.from({ length: 12 }, () => ({ grade: '', credits: '' }));

// Event listeners for buttons
document.getElementById('compute-cgpa').addEventListener('click', computeCGPA);
document.getElementById('reset').addEventListener('click', resetForm);

// Function to handle grade changes
function handleGradeChange(index, value) {
    subjects[index].grade = value;
}

// Function to handle credits changes
function handleCreditsChange(index, value) {
    subjects[index].credits = value;
}

// Function to render subject inputs
function renderSubjects() {
    const container = document.getElementById('subjects-container');
    container.innerHTML = '';
    subjects.forEach((subject, index) => {
        const subjectDiv = document.createElement('div');
        subjectDiv.className = 'subject-row';

        // Course label
        const courseLabelDiv = document.createElement('div');
        courseLabelDiv.className = 'course-label-container';

        const gradeLabel = document.createElement('label');
        gradeLabel.className = 'course-label';
        gradeLabel.textContent = `Course-${index + 1}`;

        courseLabelDiv.appendChild(gradeLabel);

        // Inputs container
        const inputsContainer = document.createElement('div');
        inputsContainer.className = 'inputs-container';

        const gradeSelect = document.createElement('select');
        gradeSelect.className = 'form-control col-md-5';
        gradeSelect.innerHTML = `
            <option value="">Grade</option>
            <option value="S">S</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="N">N</option>
        `;
        gradeSelect.value = subject.grade;
        gradeSelect.onchange = (e) => handleGradeChange(index, e.target.value);

        const creditsSelect = document.createElement('select');
        creditsSelect.className = 'form-control col-md-5';
        creditsSelect.innerHTML = `
            <option value="">Credits</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="14">14</option>
            <option value="20">20</option>
        `;
        creditsSelect.value = subject.credits;
        creditsSelect.onchange = (e) => handleCreditsChange(index, e.target.value);

        inputsContainer.appendChild(gradeSelect);
        inputsContainer.appendChild(creditsSelect);

        // Append both the label and inputs containers to the subjectDiv
        subjectDiv.appendChild(courseLabelDiv);
        subjectDiv.appendChild(inputsContainer);

        container.appendChild(subjectDiv);
    });
}

// Function to compute CGPA
function computeCGPA() {
    let totalCredits = 0;
    let totalGradePoints = 0;
    let hasError = false;
    let errorMessage = '';

    subjects.forEach((subject, index) => {
        const gradeElement = document.querySelectorAll('.subject-row')[index].querySelector('select:nth-child(1)');
        const creditsElement = document.querySelectorAll('.subject-row')[index].querySelector('select:nth-child(2)');

        gradeElement.classList.remove('error-input');
        creditsElement.classList.remove('error-input');

        if (!subject.grade && subject.credits) {
            errorMessage = `Please enter a valid grade for Course-${index + 1}.`;
            hasError = true;
            gradeElement.classList.add('error-input');
        } else if (subject.grade && !subject.credits) {
            errorMessage = `Please enter valid credits for Course-${index + 1}.`;
            hasError = true;
            creditsElement.classList.add('error-input');
        } else if (subject.grade && subject.credits) {
            const gradePoints = subject.grade === 'S' ? 10
                : subject.grade === 'A' ? 9
                : subject.grade === 'B' ? 8
                : subject.grade === 'C' ? 7
                : subject.grade === 'D' ? 6
                : subject.grade === 'E' ? 5
                : subject.grade === 'F' ? 0
                : 0;
            totalCredits += parseFloat(subject.credits);
            totalGradePoints += parseFloat(subject.credits) * gradePoints;
        }
    });

    if (hasError) {
        Swal.fire('Invalid Input', errorMessage, 'error');
    } else if (totalCredits > 0) {
        const cgpa = (totalGradePoints / totalCredits).toFixed(2);
        Swal.fire({
            title: `Your GPA is ${cgpa}`,
        });
    } else {
        Swal.fire('No Input', 'Please enter grades and credits to calculate GPA.', 'warning');
    }
}

// Function to reset the form
function resetForm() {
    subjects = Array.from({ length: 12 }, () => ({ grade: '', credits: '' }));
    renderSubjects();
}

// Initial render of subjects
renderSubjects();

// Event listeners for mobile navigation
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        hamburger.classList.toggle('active');
    });
});

// Show the button when scrolling down
window.onscroll = function() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Scroll to top when the button is clicked
document.getElementById("scrollToTopBtn").addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

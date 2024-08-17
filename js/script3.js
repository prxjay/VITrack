document.addEventListener("DOMContentLoaded", () => {
    const subjectsContainer = document.getElementById("subjects-container");
    const computeCgpaButton = document.getElementById("compute-cgpa");
    const resetButton = document.getElementById("reset");

    const numberOfSubjects = 10; // Adjust as needed

    for (let i = 1; i <= numberOfSubjects; i++) {
        const subjectDiv = document.createElement("div");
        subjectDiv.classList.add("placeholder-container");

        // Create and append the label
        const label = document.createElement("div");
        label.classList.add("label-container");
        label.textContent = `Semester ${i}`;
        subjectDiv.appendChild(label);

        // Create container for inputs
        const inputContainer = document.createElement("div");
        inputContainer.classList.add("input-container");

        const creditInput = document.createElement("input");
        creditInput.type = "number";
        creditInput.classList.add("custom-input");
        creditInput.placeholder = "Credit Hours";

        const gpaInput = document.createElement("input");
        gpaInput.type = "number";
        gpaInput.classList.add("custom-input");
        gpaInput.placeholder = "GPA Obtained";

        inputContainer.appendChild(creditInput);
        inputContainer.appendChild(gpaInput);
        subjectDiv.appendChild(inputContainer);
        subjectsContainer.appendChild(subjectDiv);
    }

    computeCgpaButton.addEventListener("click", () => {
        const credits = Array.from(subjectsContainer.querySelectorAll(".custom-input:nth-of-type(1)"));
        const gpas = Array.from(subjectsContainer.querySelectorAll(".custom-input:nth-of-type(2)"));

        let totalCredits = 0;
        let weightedSum = 0;
        let validInputs = true;

        credits.forEach((creditInput, index) => {
            const credit = parseFloat(creditInput.value);
            const gpa = parseFloat(gpas[index].value);

            // Only include valid and non-empty fields
            if (!isNaN(credit) && !isNaN(gpa) && credit > 0 && gpa >= 0 && gpa <= 10) {
                creditInput.style.borderColor = "#ccc";
                gpas[index].style.borderColor = "#ccc";
                totalCredits += credit;
                weightedSum += credit * gpa;
            } else if (creditInput.value.trim() !== "" || gpas[index].value.trim() !== "") {
                // Highlight invalid inputs
                validInputs = false;
                creditInput.style.borderColor = "#ff0000";
                gpas[index].style.borderColor = "#ff0000";
            } else {
                // Reset borders for empty fields
                creditInput.style.borderColor = "#ccc";
                gpas[index].style.borderColor = "#ccc";
            }
        });

        if (validInputs) {
            if (totalCredits === 0) {
                Swal.fire({
                    title: "Error",
                    text: "Please enter at least one valid Credit and GPA.",
                    icon: "error",
                });
            } else {
                const cgpa = weightedSum / totalCredits;
                Swal.fire({
                    title: `Your CGPA is: ${cgpa.toFixed(2)}`,
                });
            }
        } else {
            Swal.fire({
                title: "Input Error",
                text: "Please correct the highlighted fields.",
                icon: "warning",
            });
        }
    });

    resetButton.addEventListener("click", () => {
        subjectsContainer.querySelectorAll(".custom-input").forEach(input => {
            input.value = "";
            input.style.borderColor = "#ccc";
        });
    });
});

/// Show the button when scrolling down
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

document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        hamburger.classList.toggle('active');
    });
});
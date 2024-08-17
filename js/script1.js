function calculateAttendance() {
    const minAttendance = parseFloat(document.getElementById('minAttendance').value);
    const totalClasses = parseInt(document.getElementById('totalClasses').value);
    const classesAttended = parseInt(document.getElementById('classesAttended').value);
    const outputDiv = document.getElementById('output');

    if (isNaN(totalClasses) || isNaN(classesAttended) || totalClasses <= 0) {
        Swal.fire('No Input', 'Please enter valid values for total classes and classes attended.', 'warning');
    } else if (classesAttended > totalClasses) {
        Swal.fire('Invalid Input', 'Classes attended cannot be greater than total classes.', 'error');
    } else {
        const attendancePercentage = (classesAttended / totalClasses) * 100;
        let result;

        if (attendancePercentage >= minAttendance) {
            const daysAvailableToBunk = daysToBunk(classesAttended, totalClasses, minAttendance);
            result = daysToBunkText(daysAvailableToBunk, classesAttended, totalClasses);
        } else {
            const attendanceNeeded = reqAttendance(classesAttended, totalClasses, minAttendance);
            result = daysToAttendClassText(attendanceNeeded, classesAttended, totalClasses, minAttendance);
        }

        outputDiv.innerHTML = `<p class="result">${result}</p>`;
    }
}

function resetForm() {
    document.getElementById('minAttendance').value = '75';
    document.getElementById('totalClasses').value = '';
    document.getElementById('classesAttended').value = '';
    document.getElementById('output').innerHTML = '';
}

const reqAttendance = (present, total, percentage) => {
    return Math.ceil((percentage * total - 100 * present) / (100 - percentage));
};

const daysToBunk = (present, total, percentage) => {
    return Math.floor((100 * present - percentage * total) / percentage);
};

const daysToBunkText = (daysAvailableToBunk, present, total) =>
    `You can skip ${daysAvailableToBunk} classes.\nCurrent Attendance: ${present}/${total} = ${((present / total) * 100).toFixed(2)}%`;

const daysToAttendClassText = (attendanceNeeded, present, total, percentage) =>
    `You need to attend ${attendanceNeeded} more classes to attain ${percentage}% attendance.\nCurrent Attendance: ${present}/${total} = ${((present / total) * 100).toFixed(2)}%`;

document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        hamburger.classList.toggle('active');
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

//Fading effect
document.addEventListener("DOMContentLoaded", function () {
    var textItems = ["Attendance", "GPA", "CGPA"];
    var container = document.querySelector(".fade-text");

    // Create span elements for each text item and append them to the container
    textItems.forEach(function(item) {
        var span = document.createElement("span");
        span.textContent = item;
        container.appendChild(span);
    });
});




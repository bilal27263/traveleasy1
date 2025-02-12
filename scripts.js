document.addEventListener("DOMContentLoaded", function() {
    // Ensure that the navigation buttons are visible
    const navButtons = document.querySelectorAll('nav ul li a');
    navButtons.forEach(button => {
        button.style.display = 'block';
    });
});

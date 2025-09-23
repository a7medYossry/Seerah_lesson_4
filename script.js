document.addEventListener('DOMContentLoaded', function() {
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

    // --- Theme Switcher (No changes needed here) ---
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
    } else {
        body.classList.add('light-mode'); // Default theme
    }

    themeSwitcher.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

document.addEventListener('DOMContentLoaded', function() {
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

    // --- Theme Switcher (No changes needed here) ---
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
    } else {
        body.classList.add('light-mode'); // Default theme
    }
    themeSwitcher.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // =====================================================================
    // --- START OF CORRECTED SECTION ---

    const lessonsButton = document.getElementById('lessons-btn');
    const lessonsDropdown = document.getElementById('lessons-dropdown');
    const allSessions = document.querySelectorAll('main > article[id^="session"]');

    // Clear any static links from the HTML dropdown
    lessonsDropdown.innerHTML = ''; 

    // Loop through each session article and create a link for it
    allSessions.forEach(session => {
        const sessionId = session.id;
        // Find the title inside the session's h1 tag
        const sessionTitle = session.querySelector('h1').textContent; 

        const link = document.createElement('a');
        link.href = '#' + sessionId;
        link.textContent = sessionTitle;
        lessonsDropdown.appendChild(link); // Add the new link to the dropdown
    });

    // Add click functionality to the dropdown button
    lessonsButton.addEventListener('click', function(event) {
        event.stopPropagation();
        lessonsDropdown.classList.toggle('show');
    });

    // Close the dropdown if the user clicks anywhere else
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.dropbtn')) {
            if (lessonsDropdown.classList.contains('show')) {
                lessonsDropdown.classList.remove('show');
            }
        }
    });

    // --- END OF CORRECTED SECTION ---
    // =====================================================================


    // --- Section Fade-in Animation on Scroll (No changes needed here) ---
    const contentSections = document.querySelectorAll('.content-section, .mind-map-summary');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });
    contentSections.forEach(section => {
        sectionObserver.observe(section);
    });
});

    // --- Section Fade-in Animation on Scroll (No changes needed here) ---
    const contentSections = document.querySelectorAll('.content-section, .mind-map-summary');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Optional: stop observing once visible
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    contentSections.forEach(section => {
        sectionObserver.observe(section);
    });

});
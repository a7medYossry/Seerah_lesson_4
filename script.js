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
    // --- START OF EDITED SECTION ---
    // The old dynamic navbar code has been replaced with this simpler version.
    // This new code creates one dropdown with a link to each main session/article.

    const navMenu = document.getElementById('nav-menu');
    const allSessions = document.querySelectorAll('main > article[id^="session"]');

    if (allSessions.length > 0) {
        // Clear existing static links from the HTML nav menu
        navMenu.innerHTML = '';

        // Create the main dropdown container
        const dropdownLi = document.createElement('li');
        dropdownLi.classList.add('dropdown');

        // Create the button that opens the dropdown
        const dropdownButton = document.createElement('button');
        dropdownButton.id = 'lessons-btn';
        dropdownButton.classList.add('dropbtn');
        dropdownButton.innerHTML = 'All Lessons &#9662;'; // &#9662; is the down arrow ▼

        // Create the div that will hold the links
        const dropdownContent = document.createElement('div');
        dropdownContent.id = 'lessons-dropdown';
        dropdownContent.classList.add('dropdown-content');

        // Loop through each session article and create a link for it
        allSessions.forEach(session => {
            const sessionId = session.id;
            const sessionTitle = session.querySelector('h1').textContent.replace('Studying the Biography of the Prophet (PBUH):', '').trim();

            const link = document.createElement('a');
            link.href = '#' + sessionId;
            link.textContent = sessionTitle;
            dropdownContent.appendChild(link);
        });

        // Assemble the dropdown and add it to the navbar
        dropdownLi.appendChild(dropdownButton);
        dropdownLi.appendChild(dropdownContent);
        navMenu.appendChild(dropdownLi);

        // Add click functionality to the dropdown button
        dropdownButton.addEventListener('click', function(event) {
            event.stopPropagation();
            dropdownContent.classList.toggle('show');
        });

        // Close the dropdown if the user clicks anywhere else on the page
        window.addEventListener('click', function(event) {
            if (!event.target.matches('.dropbtn')) {
                if (dropdownContent.classList.contains('show')) {
                    dropdownContent.classList.remove('show');
                }
            }
        });
    }

    // --- END OF EDITED SECTION ---
    // =====================================================================


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
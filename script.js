document.addEventListener('DOMContentLoaded', function() {
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    const navMenu = document.getElementById('nav-menu');

    // --- Theme Switcher ---
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

    // --- Dynamic Navbar Dropdown ---
    // Structure: Main Topics (H3s without an H4 parent) and Sub-Topics (H4s)
    const sections = document.querySelectorAll('main section[id]');
    const mainTopics = {}; // To group H4s under their parent H3

    sections.forEach(section => {
        const h3 = section.querySelector('h3');
        const h4s = section.querySelectorAll('h4');

        if (h3 && h4s.length === 0) { // H3 is a main topic itself
            const id = section.id;
            const title = h3.textContent.trim().replace(/\s*\(.*\)/, ''); // Remove text in parentheses
            mainTopics[id] = { title: title, id: id, subItems: [] };
        } else if (h3 && h4s.length > 0) { // H3 is a parent for H4s
            const parentId = section.id; // Or a more specific ID if H3 has its own section
            const parentTitle = h3.textContent.trim().replace(/\s*\(.*\)/, '');
            mainTopics[parentId] = { title: parentTitle, id: parentId, subItems: [] };

            h4s.forEach(h4 => {
                 // Find the closest section ancestor for H4 to get its ID, or use H3's section ID
                let subSection = h4.closest('section[id]');
                if (!subSection) subSection = section; // Fallback to parent section

                const subId = subSection.id + '-' + h4.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''); // Generate unique ID for H4 if not directly sectioned
                h4.id = h4.id || subId; // Assign ID if H4 doesn't have one from a direct section
                
                const subTitle = h4.textContent.trim().replace(/\s*\(.*\)/, '');
                mainTopics[parentId].subItems.push({ title: subTitle, id: h4.id });
            });
        } else if (section.querySelector('h2')) { // Main introduction parts often have H2
             const h2 = section.querySelector('h2');
             const id = section.id;
             const title = h2.textContent.trim().replace(/\s*\(.*\)/, '');
             mainTopics[id] = { title: title, id: id, subItems: [] };
        }
    });


    // Create dropdown menu item
    const dropdownLi = document.createElement('li');
    dropdownLi.classList.add('dropdown');
    const dropdownLink = document.createElement('a');
    dropdownLink.href = '#';
    dropdownLink.textContent = 'Lesson Sections ▾';
    dropdownLi.appendChild(dropdownLink);

    const dropdownContent = document.createElement('div');
    dropdownContent.classList.add('dropdown-content');

    // Add main introduction link
    const introSection = document.getElementById('s0-introduction');
    if (introSection) {
        const introTitle = introSection.querySelector('h2').textContent.trim().replace(/\s*\(.*\)/, '');
        const introA = document.createElement('a');
        introA.href = '#' + introSection.id;
        introA.textContent = introTitle;
        dropdownContent.appendChild(introA);
    }
    
    // Add other main topics and their sub-topics
    for (const key in mainTopics) {
        const topic = mainTopics[key];
        const a = document.createElement('a');
        a.href = '#' + topic.id;
        a.textContent = topic.title;
        if (topic.subItems.length > 0) {
            a.style.fontWeight = 'bold'; // Main topic with sub-items
        }
        dropdownContent.appendChild(a);

        topic.subItems.forEach(subItem => {
            const subA = document.createElement('a');
            subA.href = '#' + subItem.id;
            subA.textContent = `↳ ${subItem.title}`; // Indent sub-items
            subA.style.paddingLeft = '30px';
            dropdownContent.appendChild(subA);
        });
    }

    dropdownLi.appendChild(dropdownContent);
    navMenu.appendChild(dropdownLi);

    // Smooth scroll for internal links generated
    dropdownContent.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- Section Fade-in Animation on Scroll ---
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
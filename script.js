document.addEventListener('DOMContentLoaded', function() {
    // 1. تعريف العناصر
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    const lessonsButton = document.getElementById('lessons-btn');
    const lessonsDropdown = document.getElementById('lessons-dropdown');

    // ======================================================
    // 2. إعدادات الثيم (Dark/Light Mode)
    // ======================================================
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.remove('light-mode', 'dark-mode'); // تنظيف
        body.classList.add(currentTheme);
    } else {
        body.classList.add('light-mode'); // الافتراضي
    }

    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                body.classList.replace('light-mode', 'dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                body.classList.replace('dark-mode', 'light-mode');
                localStorage.setItem('theme', 'light-mode');
            }
        });
    }

    // ======================================================
    // 3. التحكم في القائمة المنسدلة
    // ======================================================
    if (lessonsButton && lessonsDropdown) {
        // عند الضغط على الزر
        lessonsButton.addEventListener('click', function(event) {
            event.stopPropagation(); // منع انتقال الضغطة للنافذة
            lessonsDropdown.classList.toggle('show');
        });

        // إغلاق القائمة عند الضغط خارجها
        window.addEventListener('click', function(event) {
            if (!lessonsButton.contains(event.target) && !lessonsDropdown.contains(event.target)) {
                if (lessonsDropdown.classList.contains('show')) {
                    lessonsDropdown.classList.remove('show');
                }
            }
        });

        // إغلاق القائمة عند اختيار أحد الروابط
        const links = lessonsDropdown.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                lessonsDropdown.classList.remove('show');
            });
        });
    }

    // ======================================================
    // 4. تأثير الظهور التدريجي (Fade-in)
    // ======================================================
    const contentSections = document.querySelectorAll('.content-section, .mind-map-summary');
    
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // إيقاف المراقبة بعد الظهور مرة واحدة لتحسين الأداء
                }
            });
        }, { threshold: 0.1 });

        contentSections.forEach(section => sectionObserver.observe(section));
    } else {
        // في حال كان المتصفح قديمًا
        contentSections.forEach(section => section.classList.add('visible'));
    }
});
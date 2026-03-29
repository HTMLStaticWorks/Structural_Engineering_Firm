/* ============================================================
   STRUCTURAL ENGINEERING FIRM (BRIDGE SPECIALIST)
   Global Scripts — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Theme Toggle Logic ----
    const themeToggles = document.querySelectorAll('.themeToggle, #themeToggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            let currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    });

    function updateThemeIcon(theme) {
        document.querySelectorAll('.themeToggle i, #themeToggle i').forEach(icon => {
            if (theme === 'dark') {
                icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
            } else {
                icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
            }
        });
    }

    // ---- RTL Toggle Logic ----
    const rtlToggles = document.querySelectorAll('.rtlToggle, #rtlToggle');
    const savedDir = localStorage.getItem('dir') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);

    function updateBootstrapRTL(dir) {
        const bsLinks = document.querySelectorAll('link[href*="bootstrap.min.css"], link[href*="bootstrap.rtl.min.css"]');
        bsLinks.forEach(link => {
            if (dir === 'rtl') {
                link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css';
            } else {
                link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
            }
        });
    }

    // Initialize Bootstrap CSS direction
    updateBootstrapRTL(savedDir);

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            let currentDir = document.documentElement.getAttribute('dir');
            let newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            updateBootstrapRTL(newDir);
        });
    });

    // ---- Dummy Action Handlers for Showcase ----
    document.querySelectorAll('button').forEach(btn => {
        if(btn.innerText.includes('New Project') || btn.innerText.includes('View Full Activity Log')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                alert(`Action Triggered: ${btn.innerText.trim()}`);
            });
        }
    });
    document.querySelectorAll('.bi-bell').forEach(bell => {
        bell.parentElement.addEventListener('click', () => {
            alert('Notifications: No new alerts.');
        });
    });
    document.querySelectorAll('.bi-three-dots-vertical').forEach(dot => {
        dot.parentElement.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Settings/Options menu clicked.');
        });
    });

    // ---- Back to Top Button ----
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn?.classList.add('show');
        } else {
            backToTopBtn?.classList.remove('show');
        }
    });

    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Navbar Scroll Effect ----
    const navbar = document.querySelector('.brand-navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('shadow-lg');
        } else {
            navbar?.classList.remove('shadow-lg');
        }
    });

    // ---- Counter Animation ----
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Intersection Observer for counters
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    // ---- Dashboard Sidebar Toggle (Mobile) ----
    const sidebar = document.querySelector('.dash-sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('open') && !sidebar.contains(e.target) && !sidebarToggle?.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    // ---- Active Link Selection ----
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});

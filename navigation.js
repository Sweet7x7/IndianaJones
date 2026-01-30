// Модуль навигации
function initNavigation() {
    console.log('Инициализация навигации...');
    
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksContainer = document.getElementById('navLinks');

    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
            if (currentScroll > lastScroll && currentScroll > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;

        // Подсветка активного раздела
        let currentSection = '';
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === currentSection) {
                link.classList.add('active');
            }
        });
    });

    // Мобильное меню
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isVisible = navLinksContainer.style.display === 'flex';

            if (isVisible) {
                navLinksContainer.style.display = 'none';
                this.innerHTML = '<i class="fas fa-bars"></i>';
                this.style.transform = 'rotate(0deg)';
            } else {
                navLinksContainer.style.display = 'flex';
                this.innerHTML = '<i class="fas fa-times"></i>';
                this.style.transform = 'rotate(90deg)';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 992) {
                    navLinksContainer.style.display = 'none';
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    mobileMenuBtn.style.transform = 'rotate(0deg)';
                }
            });
        });

        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 992 &&
                !navLinksContainer.contains(e.target) &&
                !mobileMenuBtn.contains(e.target) &&
                navLinksContainer.style.display === 'flex') {
                navLinksContainer.style.display = 'none';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.style.transform = 'rotate(0deg)';
            }
        });
    }

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 120;
                const startPosition = window.scrollY;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;

                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
        });
    });

    // Эффект для логотипа
    const logoBadge = document.querySelector('.logo-badge');
    if (logoBadge) {
        logoBadge.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
                icon.style.transition = 'transform 1s ease';
            }
        });

        logoBadge.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    }
}

// Экспортируем функцию для main.js
window.initNavigation = initNavigation;
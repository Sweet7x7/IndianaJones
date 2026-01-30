// Модуль анимаций
function initAnimations() {
    console.log('Инициализация анимаций...');
    
    // Анимация появления элементов при скролле
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Применяем анимации ко всем элементам с классом fade-in
    document.querySelectorAll('.fade-in:not(.diary-entry):not(.film-card):not(.films-quote)').forEach(el => {
        if (!el.style.opacity || el.style.opacity === '0') {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            fadeObserver.observe(el);
        }
    });

    // Анимация секций
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Анимация заголовков секций
                const title = entry.target.querySelector('.section-title, .diary-title');
                if (title) {
                    title.style.animation = 'fadeInUp 1s ease-out 0.3s both';
                }

                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05
    });

    // Применяем анимации ко всем секциям
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0.8';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 1s ease, transform 1s ease';
        sectionObserver.observe(section);
    });

    // Анимация штампов и печатей
    const stamps = document.querySelectorAll('.classified-stamp, .telegram-stamp');
    stamps.forEach(stamp => {
        stamp.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.replace(/scale\([^)]+\)/, 'scale(1.1)');
        });
        
        stamp.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(/scale\([^)]+\)/, 'scale(1)');
        });
    });

    // Анимация кнопок
    const buttons = document.querySelectorAll('.vintage-btn, .telegram-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(360deg) scale(1.2)';
                icon.style.transition = 'transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }
        });

        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });

    // Анимация пятен на бумаге
    const stains = document.querySelectorAll('.paper-stain');
    stains.forEach(stain => {
        setInterval(() => {
            stain.style.opacity = (Math.random() * 0.1 + 0.05).toFixed(2);
        }, Math.random() * 5000 + 3000);
    });

    // Пульсирующие тени заголовков
    const titles = document.querySelectorAll('.hero-title, .section-title, .diary-title');
    setInterval(() => {
        titles.forEach(title => {
            if (Math.random() > 0.7) {
                title.style.textShadow = `
                    4px 4px 8px rgba(0, 0, 0, 0.3),
                    0 0 40px rgba(212, 175, 55, ${Math.random() * 0.3 + 0.1})
                `;
            }
        });
    }, 2000);

    // Анимация секретной печати в футере
    const topSecretSeal = document.getElementById('topSecretSeal');
    if (topSecretSeal) {
        topSecretSeal.addEventListener('click', function() {
            this.style.transform = 'scale(1.25) rotate(20deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 1000);
            
            // Вспышка
            const flash = document.createElement('div');
            flash.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
                pointer-events: none;
                z-index: 11;
                animation: flash 0.5s ease-out;
            `;
            
            this.appendChild(flash);
            setTimeout(() => flash.remove(), 500);
        });
    }
}

// Добавляем стили для анимаций
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes flash {
        0% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(1.2); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes scaleIn {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(animationStyles);

// Экспортируем функцию для main.js
window.initAnimations = initAnimations;
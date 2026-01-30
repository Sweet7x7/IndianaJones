// Основной файл инициализации
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Архив Индианы Джонса загружается...');
    
    // Загружаем конфигурацию
    if (window.SITE_CONFIG) {
        console.log(`Версия архива: ${SITE_CONFIG.version}`);
        console.log(`Последнее обновление: ${SITE_CONFIG.lastUpdate}`);
    }
    
    // Инициализация
    setTimeout(() => {
        initAllModules();
    }, 100);
});

function initAllModules() {
    console.log('Инициализация всех модулей...');
    
    // Инициализация навигации
    if (typeof initNavigation === 'function') {
        initNavigation();
    }
    
    // Инициализация дневника
    if (typeof initDiary === 'function') {
        initDiary();
    }
    
    // Инициализация фильмов
    if (typeof initFilms === 'function') {
        initFilms();
    }
    
    // Инициализация снаряжения
    if (typeof initEquipment === 'function') {
        initEquipment();
    }
    
    // Инициализация артефактов
    if (typeof initArtifacts === 'function') {
        initArtifacts();
    }
    
    // Инициализация телеграммы
    if (typeof initTelegram === 'function') {
        initTelegram();
    }
    
    // Инициализация анимаций
    if (typeof initAnimations === 'function') {
        initAnimations();
    }
    
    // Инициализация секретных функций
    if (typeof initSecret === 'function') {
        initSecret();
    }
    
    console.log('Инициализация завершена');
    
    // Запускаем дополнительные эффекты
    addRandomPaperEffects();
}

function addRandomPaperEffects() {
    // Добавляем случайные эффекты бумаги
    const sections = document.querySelectorAll('.hero-content, .diary-container, .films-quote');
    sections.forEach(section => {
        const lineCount = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < lineCount; i++) {
            const line = document.createElement('div');
            line.style.cssText = `
                position: absolute;
                width: ${Math.random() * 80 + 20}%;
                height: 1px;
                background: linear-gradient(90deg,
                    transparent,
                    rgba(139, 69, 19, ${Math.random() * 0.15 + 0.05}),
                    transparent);
                top: ${Math.random() * 90 + 5}%;
                left: ${Math.random() * 20 + 10}%;
                transform: rotate(${Math.random() * 15 - 7.5}deg);
                pointer-events: none;
                z-index: 1;
            `;
            section.appendChild(line);
        }
    });
}

// Глобальные вспомогательные функции
window.showToast = function(message, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--leather)' : 'rgba(26, 18, 11, 0.95)'};
        color: var(--parchment);
        padding: 20px 30px;
        border-radius: 8px;
        border: 3px solid var(--gold);
        font-family: 'Cinzel', serif;
        z-index: 9999;
        max-width: 400px;
        box-shadow: 0 0 30px rgba(0,0,0,0.8);
        transform: translateX(120%);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;

    toast.innerHTML = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 10);

    setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => toast.remove(), 500);
    }, 5000);
};
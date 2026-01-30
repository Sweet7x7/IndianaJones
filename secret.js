// Модуль секретных функций
function initSecret() {
    console.log('Инициализация секретных функций...');
    
    // Секретный код Konami
    let keySequence = [];
    const secretCode = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', function(e) {
        keySequence.push(e.code);
        if (keySequence.length > secretCode.length) {
            keySequence.shift();
        }

        if (JSON.stringify(keySequence) === JSON.stringify(secretCode)) {
            activateEasterEgg();
            keySequence = [];
        }
    });

    // Двойной клик по логотипу
    const logo = document.querySelector('.logo-container');
    if (logo) {
        let clickCount = 0;
        let clickTimer;

        logo.addEventListener('click', function() {
            clickCount++;

            if (clickCount === 1) {
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 500);
            } else if (clickCount === 2) {
                clearTimeout(clickTimer);
                clickCount = 0;
                showSecretMessage();
            }
        });
    }

    // Консоль разработчика (Ctrl+Alt+Shift+I)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.altKey && e.shiftKey && e.key === 'KeyI') {
            e.preventDefault();
            showDeveloperConsole();
        }
    });

    // Секретные эффекты при наведении на элементы
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const allLinks = document.querySelectorAll('.nav-link');
            allLinks.forEach(l => {
                if (l !== this) {
                    l.style.opacity = '0.7';
                    l.style.transform = 'scale(0.95)';
                }
            });
        });

        link.addEventListener('mouseleave', function() {
            const allLinks = document.querySelectorAll('.nav-link');
            allLinks.forEach(l => {
                l.style.opacity = '1';
                l.style.transform = 'scale(1)';
            });
        });
    });

    // Секретная печать
    const classifiedStamp = document.querySelector('.classified-stamp');
    if (classifiedStamp) {
        classifiedStamp.addEventListener('click', function() {
            this.style.transform = 'rotate(15deg) scale(1.15)';
            setTimeout(() => {
                this.style.transform = 'rotate(18deg) scale(1)';
            }, 300);

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

function activateEasterEgg() {
    console.log('🎮 Секретный код активирован!');
    
    // Конфетти
    const colors = ['#D4AF37', '#B8860B', '#CD7F32', '#8B4513', '#654321'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 15px;
                height: 15px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                top: -20px;
                left: ${Math.random() * 100}vw;
                z-index: 9999;
                pointer-events: none;
                animation: fall ${Math.random() * 3 + 2}s linear forwards;
                box-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
            `;

            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, i * 50);
    }

    // Добавляем стили для анимации конфетти
    const fallStyle = document.createElement('style');
    fallStyle.textContent = `
        @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(fallStyle);
    
    // Показываем сообщение
    showToast('🎉 Секретный код активирован! 🎉', 'success');
}

function showSecretMessage() {
    const messages = [
        "Археология — это поиск фактов, а не истины. Если вам нужна истина, философский факультет напротив.",
        "Некоторые артефакты должны оставаться потерянными. Некоторые истории — непрочитанными.",
        "Мой отец говорил: 'Ищите просветление, а не артефакты'. Я искал и то, и другое.",
        "Иногда величайшее открытие — это понимание, что нужно уйти.",
        "Не каждый потерянный город хочет быть найденным.",
        "Кнут и револьвер решают больше споров, чем дипломатия."
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showToast(`💎 ${randomMessage}`, 'info');
}

function showDeveloperConsole() {
    const consoleDiv = document.createElement('div');
    consoleDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(26, 18, 11, 0.95);
        color: var(--gold);
        padding: 20px;
        border-radius: 10px;
        border: 3px solid var(--leather);
        font-family: 'Courier Prime', monospace;
        z-index: 9999;
        max-width: 500px;
        box-shadow: 0 0 30px rgba(0,0,0,0.8);
    `;

    consoleDiv.innerHTML = `
        <h3 style="color: var(--gold); margin-bottom: 15px; border-bottom: 2px solid var(--leather); padding-bottom: 10px;">
            Консоль разработчика
        </h3>
        <div style="margin-bottom: 15px;">
            <strong>Версия архива:</strong> ${SITE_CONFIG.version}
        </div>
        <div style="margin-bottom: 15px;">
            <strong>Последнее обновление:</strong> ${SITE_CONFIG.lastUpdate}
        </div>
        <div style="margin-bottom: 15px;">
            <strong>Уровень секретности:</strong> ${SITE_CONFIG.secretLevel}
        </div>
        <div style="margin-bottom: 20px;">
            <strong>Анимации:</strong> ${SITE_CONFIG.animationsEnabled ? 'Включены' : 'Отключены'}
        </div>
        <button id="closeConsole" style="
            background: var(--leather);
            color: var(--parchment);
            border: 2px solid var(--gold);
            padding: 8px 20px;
            cursor: pointer;
            font-family: inherit;
        ">
            Закрыть
        </button>
    `;

    document.body.appendChild(consoleDiv);

    document.getElementById('closeConsole').addEventListener('click', function() {
        consoleDiv.remove();
    });

    // Автоматическое закрытие через 10 секунд
    setTimeout(() => {
        if (document.body.contains(consoleDiv)) {
            consoleDiv.style.opacity = '0';
            consoleDiv.style.transition = 'opacity 0.5s';
            setTimeout(() => consoleDiv.remove(), 500);
        }
    }, 10000);
}

// Экспортируем функцию для main.js
window.initSecret = initSecret;
// Модуль телеграммы
function initTelegram() {
    console.log('Инициализация телеграммы...');
    
    // Устанавливаем текущую дату
    const now = new Date();
    const formattedDate = now.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = `Дата: ${formattedDate}`;
    }
    
    // Инициализируем счетчик символов
    const messageInput = document.getElementById('telegramMessage');
    const charCount = document.getElementById('charCount');
    
    if (messageInput && charCount) {
        messageInput.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            if (length > 200) {
                charCount.style.color = 'var(--ink-red)';
            } else if (length > 150) {
                charCount.style.color = 'var(--bronze)';
            } else {
                charCount.style.color = 'var(--ink-brown)';
            }
        });
    }
    
    // Загружаем историю телеграмм
    loadRecentTelegrams();
    
    // Инициализируем обработчик формы
    const form = document.getElementById('telegramForm');
    if (form) {
        form.addEventListener('submit', handleTelegramSubmit);
    }
    
    // Инициализируем звуки
    addTelegramSounds();
}

function handleTelegramSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const status = document.getElementById('telegramStatus');
    const submitBtn = form.querySelector('.send-btn');
    
    // Проверяем email
    const email = document.getElementById('userEmail').value;
    if (!email.includes('@')) {
        status.textContent = '❌ Введите правильный email!';
        status.style.color = 'var(--ink-red)';
        return;
    }
    
    // Показываем статус отправки
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ОТПРАВКА...';
    submitBtn.disabled = true;
    status.textContent = ' Шифрую и отправляю телеграмму...';
    status.style.color = 'var(--leather)';
    
    // Имитируем отправку (в реальности здесь будет fetch)
    setTimeout(() => {
        // Сохраняем телеграмму в историю
        const from = document.getElementById('telegramFrom').value;
        const subject = document.getElementById('telegramSubject').value;
        const message = document.getElementById('telegramMessage').value;
        
        saveTelegramToHistory(from, subject, message);
        
        // Проверяем шифр
        const cipher1 = document.getElementById('cipher1')?.value.toUpperCase();
        const cipher2 = document.getElementById('cipher2')?.value.toUpperCase();
        const cipher3 = document.getElementById('cipher3')?.value.toUpperCase();
        
        // Успешная отправка
        status.textContent = ' ✅ Телеграмма отправлена! Ответ через 2-8 недель.';
        status.style.color = 'var(--leather-dark)';
        
        // Анимация штампа
        const stamp = document.querySelector('.telegram-stamp');
        if (stamp) {
            stamp.style.transform = 'rotate(-10deg) scale(1.2)';
            stamp.style.transition = 'transform 0.3s ease';
        }
        
        // Праздничный эффект
        celebrateTelegram();
        
        // Если шифр правильный, показываем секретный ответ
        if (cipher1 === SITE_CONFIG.secretCipher[0] &&
            cipher2 === SITE_CONFIG.secretCipher[1] &&
            cipher3 === SITE_CONFIG.secretCipher[2]) {
            setTimeout(() => {
                showSecretTelegramResponse();
            }, 1500);
        }
        
        // Сбрасываем форму через 3 секунды
        setTimeout(() => {
            form.reset();
            if (charCount) charCount.textContent = '0';
            status.textContent = 'Готово к отправке';
            status.style.color = '';
            
            if (stamp) {
                stamp.style.transform = 'rotate(-10deg) scale(1)';
            }
        }, 3000);
        
        // Восстанавливаем кнопку
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ОТПРАВИТЬ ТЕЛЕГРАММУ';
        submitBtn.disabled = false;
        
        // Обновляем историю
        loadRecentTelegrams();
        
    }, 2000);
}

function saveTelegramToHistory(from, subject, message) {
    let history = JSON.parse(localStorage.getItem('indianaTelegrams') || '[]');
    const telegram = {
        id: Date.now(),
        from: from,
        subject: subject,
        message: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
        date: new Date().toLocaleDateString('ru-RU'),
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };
    
    history.unshift(telegram);
    if (history.length > 5) {
        history = history.slice(0, 5);
    }
    
    localStorage.setItem('indianaTelegrams', JSON.stringify(history));
}

function loadRecentTelegrams() {
    const history = JSON.parse(localStorage.getItem('indianaTelegrams') || '[]');
    const container = document.getElementById('recentTelegrams');
    
    if (!container) return;
    
    if (history.length === 0) {
        container.innerHTML = '<div class="recent-telegram"><div class="subject">Нет отправленных телеграмм</div><div class="date">История будет сохранена здесь</div></div>';
        return;
    }
    
    container.innerHTML = '';
    history.forEach(tg => {
        const telegramEl = document.createElement('div');
        telegramEl.className = 'recent-telegram';
        telegramEl.innerHTML = `
            <div class="subject">${getSubjectText(tg.subject)} • От: ${tg.from}</div>
            <div class="message">${tg.message}</div>
            <div class="date">${tg.date} ${tg.time}</div>
        `;
        container.appendChild(telegramEl);
    });
}

function getSubjectText(subject) {
    const subjects = {
        'expedition': 'Экспедиция',
        'artifact': 'Артефакт',
        'research': 'Исследование',
        'danger': 'СРОЧНО',
        'other': 'Другое'
    };
    return subjects[subject] || 'Без темы';
}

// Глобальные функции для кнопок
window.clearTelegram = function() {
    if (confirm('Очистить все поля телеграммы?')) {
        document.getElementById('telegramFrom').value = '';
        document.getElementById('telegramSubject').value = '';
        document.getElementById('telegramMessage').value = '';
        document.getElementById('charCount').textContent = '0';
        document.getElementById('cipher1').value = '';
        document.getElementById('cipher2').value = '';
        document.getElementById('cipher3').value = '';
        
        const status = document.getElementById('telegramStatus');
        if (status) {
            status.textContent = 'Форма очищена';
            status.style.color = 'var(--ink-brown)';
        }
        
        playSound('clear');
    }
};

window.showCipherHint = function() {
    const hints = [
        "Подсказка: Первые три буквы страны первой экспедиции + порядковый номер",
        "Вспомните где была найдена золотая статуэтка в 1936 году",
        "Страна в Южной Америке, начинается на 'П'",
        "Шифр: Буква страны + номер позиции в алфавите"
    ];
    
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    const cipherHint = document.querySelector('.cipher-hint');
    const originalText = cipherHint.textContent;
    
    cipherHint.textContent = randomHint;
    cipherHint.style.color = 'var(--gold)';
    cipherHint.style.fontWeight = 'bold';
    cipherHint.style.animation = 'pulse 1s infinite';
    
    setTimeout(() => {
        cipherHint.textContent = 'Подсказка: координаты первой экспедиции';
        cipherHint.style.color = 'var(--bronze)';
        cipherHint.style.fontWeight = 'normal';
        cipherHint.style.animation = '';
    }, 5000);
    
    playSound('hint');
};

function celebrateTelegram() {
    const colors = ['#D4AF37', '#B8860B', '#CD7F32', '#8B4513'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 12px;
                height: 12px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                top: 50%;
                left: ${Math.random() * 100}%;
                z-index: 9999;
                pointer-events: none;
                animation: telegramConfetti ${Math.random() * 2 + 1}s ease-out forwards;
            `;
            
            document.querySelector('.telegram-form').appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 50);
    }
    
    // Добавляем стили для анимации, если их нет
    if (!document.querySelector('#telegramConfetti')) {
        const confettiStyle = document.createElement('style');
        confettiStyle.id = 'telegramConfetti';
        confettiStyle.textContent = `
            @keyframes telegramConfetti {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(confettiStyle);
    }
    
    playSound('success');
}

function showSecretTelegramResponse() {
    const responses = [
        "Индиана Джонс получил ваше сообщение. Шифр верный - вы знаете слишком много. Будьте осторожны.",
        "Сообщение получено. Координаты первой экспедиции подтверждены. Ожидайте инструкций.",
        "Телеграмма доставлена. Профессор Джонс оценил ваши знания. Возможна встреча в Каире.",
        "Связь установлена. Используйте этот канал только в экстренных случаях. Уничтожьте все следы."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const secretModal = document.createElement('div');
    secretModal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(rgba(26, 18, 11, 0.98), rgba(38, 24, 11, 0.95));
        padding: 40px;
        border-radius: 15px;
        border: 10px double var(--gold);
        color: var(--parchment);
        z-index: 9999;
        max-width: 500px;
        width: 90%;
        text-align: center;
        box-shadow: 0 0 100px rgba(212, 175, 55, 0.5);
        animation: scaleIn 0.5s ease-out;
    `;
    
    secretModal.innerHTML = `
        <h3 style="color: var(--gold); font-family: 'New Rocker', cursive; font-size: 1.8rem; margin-bottom: 20px;">
            <i class="fas fa-user-secret"></i> СЕКРЕТНЫЙ ОТВЕТ
        </h3>
        <p style="font-family: 'Courier Prime', monospace; font-size: 1.2rem; line-height: 1.6; margin-bottom: 30px;">
            ${randomResponse}
        </p>
        <p style="font-family: 'Metamorphous', cursive; color: var(--gold-light); font-size: 1rem; margin-bottom: 20px;">
            Код подтверждения: X7B-9Q2-IND1938
        </p>
        <button onclick="this.parentElement.remove()" style="
            background: var(--leather);
            color: var(--parchment);
            border: 3px solid var(--gold);
            padding: 12px 40px;
            font-family: 'Metamorphous', cursive;
            font-size: 1rem;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 2px;
            transition: all 0.3s;
        ">
            ПОНЯТНО
        </button>
    `;
    
    document.body.appendChild(secretModal);
    
    secretModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
    
    // Закрытие по Escape
    const closeHandler = function(e) {
        if (e.key === 'Escape') {
            secretModal.remove();
            document.removeEventListener('keydown', closeHandler);
        }
    };
    document.addEventListener('keydown', closeHandler);
    
    playSound('success');
}

function addTelegramSounds() {
    // Создаем контекст аудио
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const audioContext = new AudioContext();
    
    // Функция для создания звуков
    function createBeep(frequency, duration, volume) {
        return function() {
            try {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = frequency;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration);
            } catch (e) {
                console.log('Звук не воспроизведен:', e);
            }
        };
    }
    
    // Создаем звуки
    window.telegramSounds = {
        send: createBeep(800, 0.2, 0.3),
        success: createBeep(1200, 0.3, 0.5),
        error: createBeep(400, 0.5, 0.2),
        clear: createBeep(600, 0.1, 0.1),
        hint: function() {
            createBeep(1000, 0.1, 0.1)();
            setTimeout(() => createBeep(1200, 0.1, 0.1)(), 100);
        }
    };
}

function playSound(soundType) {
    if (window.telegramSounds && window.telegramSounds[soundType]) {
        try {
            window.telegramSounds[soundType]();
        } catch (e) {
            console.log('Звук не воспроизведен:', e);
        }
    }
}

// Экспортируем функцию для main.js
window.initTelegram = initTelegram;
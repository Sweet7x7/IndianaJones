// Модуль артефактов
function initArtifacts() {
    console.log('Инициализация артефактов...');
    
    const artifactsData = [
        {
            id: 0,
            title: "ЗОЛОТОЙ ИДОЛ ХОВИТТО",
            year: "1936",
            rating: "★ ★ ★ ★ ☆",
            details: "Эпоха: доколумбовая | Материал: цельное золото | Вес: 4.5 кг",
            description: "Древнее божество племени Ховитто, найденное в Перу. Заменён мешком с песка, что вызвало обрушение храма. Привело к погоне через джунгли и незабываемому уроку о важности точных измерений веса.",
            location: "Перу • Храм Чахчан",
            expedition: "Экспедиция 1936 года, руководство: Генри Джонс",
            status: "В музее Перу",
            dimensions: "Высота: 25 см",
            image: "images/golden-idol.webp"
        },
        {
            id: 1,
            title: "МЕДАЛЬОН РА",
            year: "1936",
            rating: "★ ★ ★ ★ ★",
            details: "Материал: золото с гравировкой | Возраст: ~3000 лет",
            description: "Древнеегипетский артефакт, ключ к нахождению Ковчега Завета. На одной стороне изображён бог Ра, на другой — иероглифы с координатами Таниса. Принадлежал отцу Марион Рэйвенвуд. Передан мне в Катманду вместе с... убедительным аргументом.",
            location: "Непал • Бар в Катманду",
            expedition: "Приобретён в 1936, использован для экспедиции в Египет",
            status: "Частная коллекция",
            dimensions: "Диаметр: 8 см",
            image: "images/medallion-of-ra.webp"
        },
        {
            id: 2,
            title: "КРЕСТ КОРОНАДО",
            year: "1938",
            rating: "★ ★ ★ ★ ★",
            details: "Происхождение: рыцари-тамплиеры | Материал: золото, рубины",
            description: "Один из трёх крестов, оставленных рыцарями-тамплиерами. Указывает путь к Святому Граалю через серию загадок и испытаний. Найден в катакомбах под венецианской библиотекой после столкновения с крысами и конкурентами.",
            location: "Венеция • Библиотека",
            expedition: "Экспедиция 1938 года с отцом, Генри Джонсом Старшим",
            status: "Музей Ватикана",
            dimensions: "Вес: 2 кг | Длина: 40 см",
            image: "images/cross-cornado.webp"
        },
        {
            id: 3,
            title: "КАМНИ ШАНКАРЫ",
            year: "1935",
            rating: "★ ★ ★ ★ ☆",
            details: "Количество: 5 штук | Материал: неизвестен (светящийся)",
            description: "Пять священных камней, похищенных из индийской деревни. Обладают мистическими свойствами согласно местным верованиям. Возвращены жителям после столкновения с культом Кали Ма и его кровавыми ритуалами.",
            location: "Индия • Деревня Пианкот",
            expedition: "Экспедиция 1935 года, сопровождение: Уилли Скотт",
            status: "Возвращены законным владельцам",
            dimensions: "Размер каждого: 5×5×5 см",
            image: "images/shankhara-stones.webp"
        },
        {
            id: 4,
            title: "ХРУСТАЛЬНЫЙ ЧЕРЕП",
            year: "1957",
            rating: "★ ★ ★ ☆ ☆",
            details: "Материал: горный хрусталь | Возраст: неизвестен",
            description: "Артефакт древней цивилизации Акатора. Выполнен из цельного кристалла кварца. Обладает псионическими свойствами — передаёт знания напрямую в сознание. Некоторые знания человечеству лучше не знать.",
            location: "Амазония • Руины Акатора",
            expedition: "Экспедиция 1957 года, участие: Ирина Спалько",
            status: "Возвращён создателям",
            dimensions: "Натуральный размер черепа",
            image: "images/crystal-skull.webp"
        },
        {
            id: 5,
            title: "СВЯТОЙ ГРААЛЬ",
            year: "1937",
            rating: "★ ★ ★ ☆ ☆",
            details: "Династия: Мин | Материал: нефрит и серебро",
            description: "Святой Грааль — это не чаша, а выбор. Истина не блестит, и часто оказывается проще, чем мы думаем. Жаль, до этого понимания нужно дожить.",
            location: "Тибет • Заброшенный монастырь",
            expedition: "Частная экспедиция 1937 года",
            status: "Частная коллекция (продано)",
            dimensions: "Диаметр: 6 см",
            image: "images/holy-grail.webp"
        }
    ];

    const container = document.getElementById('artifactsGrid');
    if (!container) return;

    // Очищаем контейнер
    container.innerHTML = '';

    // Создаем карточки артефактов
    artifactsData.forEach((artifact, index) => {
        const artifactElement = createArtifactCard(artifact, index);
        container.appendChild(artifactElement);
    });

    // Создаем модальное окно
    createArtifactModal();

    // Инициализируем анимации
    initArtifactsAnimations();
}

function createArtifactCard(artifact, index) {
    const div = document.createElement('div');
    div.className = 'film-card fade-in';
    div.setAttribute('data-artifact-id', artifact.id);
    div.innerHTML = `
        <div class="film-poster" style="background-image: url('${artifact.image}');">
            <div class="film-overlay">
                <div class="film-year">${artifact.year}</div>
                <div class="film-title">${artifact.title}</div>
            </div>
        </div>
        <div class="film-content">
            <p class="film-synopsis">
                <i></i>
            </p>
            <div class="film-details">
                <div class="film-director">${getArtifactDetails(artifact)}</div>
                <div class="film-rating">${artifact.rating}</div>
            </div>
        </div>
    `;
    
    // Добавляем задержку для анимации
    div.style.animationDelay = `${index * 0.2}s`;
    div.style.cursor = 'pointer';
    
    // Добавляем обработчик клика
    div.addEventListener('click', function() {
        openArtifactModal(artifact.id);
    });
    
    return div;
}

function getArtifactDetails(artifact) {
    // Извлекаем первую часть details до первого символа "|"
    const details = artifact.details.split('|')[0].trim();
    return details;
}

function createArtifactModal() {
    // Создаем модальное окно, если его нет
    if (document.getElementById('artifactModal')) return;
    
    const modal = document.createElement('div');
    modal.id = 'artifactModal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        z-index: 3000;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="display: flex; max-width: 1200px; width: 100%; background: linear-gradient(rgba(245, 233, 212, 0.98), rgba(229, 217, 196, 0.98)); border-radius: 15px; overflow: hidden; box-shadow: 0 0 80px rgba(212, 175, 55, 0.6); border: 10px solid var(--leather); position: relative;">
            <div onclick="closeArtifactModal()" style="position: absolute; top: 20px; right: 20px; width: 50px; height: 50px; background: var(--leather); color: var(--parchment); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; cursor: pointer; z-index: 10; border: 3px solid var(--gold); box-shadow: 0 0 20px rgba(0,0,0,0.5); transition: all 0.3s;">
                <i class="fas fa-times"></i>
            </div>

            <div id="polaroidContainer" style="flex: 1; padding: 40px; display: flex; align-items: center; justify-content: center; background: var(--parchment); position: relative; min-height: 600px;">
                <div id="polaroidFrame" style="width: 90%; max-width: 500px; background: white; padding: 20px 20px 80px 20px; box-shadow: 15px 15px 40px rgba(0,0,0,0.3), inset 0 0 30px rgba(0,0,0,0.1); transform: rotate(-3deg); position: relative; border: 1px solid #ddd;">
                    <div id="polaroidImage" style="width: 100%; height: 400px; background-size: cover; background-position: center; filter: sepia(0.4) contrast(1.1);"></div>
                    <div id="polaroidLabel" style="position: absolute; bottom: 20px; left: 0; right: 0; text-align: center; font-family: 'Courier Prime', monospace; color: var(--ink-brown); font-size: 1.2rem; padding: 10px;"></div>
                    <div style="position: absolute; top: 10px; left: 10px; width: 30px; height: 30px; border-top: 2px solid #ccc; border-left: 2px solid #ccc;"></div>
                    <div style="position: absolute; top: 10px; right: 10px; width: 30px; height: 30px; border-top: 2px solid #ccc; border-right: 2px solid #ccc;"></div>
                    <div style="position: absolute; bottom: 60px; left: 10px; width: 30px; height: 30px; border-bottom: 2px solid #ccc; border-left: 2px solid #ccc;"></div>
                    <div style="position: absolute; bottom: 60px; right: 10px; width: 30px; height: 30px; border-bottom: 2px solid #ccc; border-right: 2px solid #ccc;"></div>
                    <div id="polaroidDate" style="position: absolute; top: 15px; right: 15px; background: var(--leather); color: var(--parchment); padding: 5px 10px; border-radius: 3px; font-size: 0.9rem; font-family: 'Courier Prime', monospace;"></div>
                </div>
                <div style="position: absolute; top: 10%; left: 10%; width: 100px; height: 100px; background: rgba(139, 69, 19, 0.05); border-radius: 50%; transform: rotate(45deg);"></div>
                <div style="position: absolute; bottom: 15%; right: 15%; width: 150px; height: 150px; background: rgba(212, 175, 55, 0.05); border-radius: 50%; transform: rotate(-20deg);"></div>
            </div>

            <div style="flex: 1; padding: 60px 40px; display: flex; flex-direction: column; background: rgba(255, 255, 255, 0.95); overflow-y: auto; max-height: 600px;">
                <h3 id="modalTitle" style="font-family: 'IM Fell English SC', serif; font-size: 2.8rem; color: var(--leather-dark); margin-bottom: 20px; border-bottom: 5px double var(--gold); padding-bottom: 15px;"></h3>
                <div style="display: flex; gap: 20px; margin-bottom: 25px;">
                    <div id="modalYear" style="background: var(--leather); color: var(--parchment); padding: 8px 20px; border-radius: 20px; font-size: 1.1rem; font-weight: bold; letter-spacing: 1px; font-family: 'Courier Prime', monospace;"></div>
                    <div id="modalRating" style="color: var(--gold); font-size: 1.5rem; letter-spacing: 5px;"></div>
                </div>
                <div id="modalDetails" style="margin-bottom: 30px; font-family: 'Courier Prime', monospace; color: var(--ink-brown); font-size: 1.1rem; line-height: 1.8;"></div>
                <div id="modalDescription" style="flex: 1; font-size: 1.3rem; line-height: 2; color: var(--ink-dark); text-align: justify; margin-bottom: 30px; font-family: 'Old Standard TT', serif;"></div>
                <div id="modalLocation" style="background: rgba(139, 69, 19, 0.1); padding: 20px; border-radius: 10px; border-left: 5px solid var(--gold); margin-top: 20px;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                        <i class="fas fa-map-marker-alt" style="color: var(--leather); font-size: 1.2rem;"></i>
                        <span id="modalLocationText" style="font-family: 'Metamorphous', cursive; color: var(--leather); font-size: 1.2rem; font-weight: bold;"></span>
                    </div>
                    <div id="modalExpeditionInfo" style="font-family: 'Courier Prime', monospace; color: var(--ink-brown); font-size: 1rem;"></div>
                </div>
                <div style="margin-top: 30px; padding-top: 20px; border-top: 2px dashed var(--leather);">
                    <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                        <div id="modalStatus" style="background: var(--gold); color: var(--ink-dark); padding: 10px 20px; border-radius: 25px; font-family: 'Metamorphous', cursive; font-weight: bold;"></div>
                        <div id="modalDimensions" style="background: rgba(139, 69, 19, 0.2); color: var(--ink-brown); padding: 10px 20px; border-radius: 25px; font-family: 'Courier Prime', monospace;"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Добавляем обработчик для закрытия по клику на фон
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeArtifactModal();
        }
    });
}

// Глобальные функции для работы с модальным окном
window.openArtifactModal = function(artifactId) {
    const artifactsData = [
        {
            id: 0,
            title: "ЗОЛОТОЙ ИДОЛ ХОВИТТО",
            year: "1936",
            rating: "★ ★ ★ ★ ☆",
            details: "Эпоха: доколумбовая | Материал: цельное золото | Вес: 4.5 кг",
            description: "Древнее божество племени Ховитто, найденное в Перу. Заменён мешком с песка, что вызвало обрушение храма. Привело к погоне через джунгли и незабываемому уроку о важности точных измерений веса.",
            location: "Перу • Храм Чахчан",
            expedition: "Экспедиция 1936 года, руководство: Генри Джонс",
            status: "В музее Перу",
            dimensions: "Высота: 25 см",
            image: "images/golden-idol.webp"
        },
        {
            id: 1,
            title: "МЕДАЛЬОН РА",
            year: "1936",
            rating: "★ ★ ★ ★ ★",
            details: "Материал: золото с гравировкой | Возраст: ~3000 лет",
            description: "Древнеегипетский артефакт, ключ к нахождению Ковчега Завета. На одной стороне изображён бог Ра, на другой — иероглифы с координатами Таниса. Принадлежал отцу Марион Рэйвенвуд. Передан мне в Катманду вместе с... убедительным аргументом.",
            location: "Непал • Бар в Катманду",
            expedition: "Приобретён в 1936, использован для экспедиции в Египет",
            status: "Частная коллекция",
            dimensions: "Диаметр: 8 см",
            image: "images/medallion-of-ra.webp"
        },
        {
            id: 2,
            title: "КРЕСТ КОРОНАДО",
            year: "1938",
            rating: "★ ★ ★ ★ ★",
            details: "Происхождение: рыцари-тамплиеры | Материал: золото, рубины",
            description: "Один из трёх крестов, оставленных рыцарями-тамплиерами. Указывает путь к Святому Граалю через серию загадок и испытаний. Найден в катакомбах под венецианской библиотекой после столкновения с крысами и конкурентами.",
            location: "Венеция • Библиотека",
            expedition: "Экспедиция 1938 года с отцом, Генри Джонсом Старшим",
            status: "Музей Ватикана",
            dimensions: "Вес: 2 кг | Длина: 40 см",
            image: "images/cross-cornado.webp"
        },
        {
            id: 3,
            title: "КАМНИ ШАНКАРЫ",
            year: "1935",
            rating: "★ ★ ★ ★ ☆",
            details: "Количество: 5 штук | Материал: неизвестен (светящийся)",
            description: "Пять священных камней, похищенных из индийской деревни. Обладают мистическими свойствами согласно местным верованиям. Возвращены жителям после столкновения с культом Кали Ма и его кровавыми ритуалами.",
            location: "Индия • Деревня Пианкот",
            expedition: "Экспедиция 1935 года, сопровождение: Уилли Скотт",
            status: "Возвращены законным владельцам",
            dimensions: "Размер каждого: 5×5×5 см",
            image: "images/shankhara-stones.webp"
        },
        {
            id: 4,
            title: "ХРУСТАЛЬНЫЙ ЧЕРЕП",
            year: "1957",
            rating: "★ ★ ★ ☆ ☆",
            details: "Материал: горный хрусталь | Возраст: неизвестен",
            description: "Артефакт древней цивилизации Акатора. Выполнен из цельного кристалла кварца. Обладает псионическими свойствами — передаёт знания напрямую в сознание. Некоторые знания человечеству лучше не знать.",
            location: "Амазония • Руины Акатора",
            expedition: "Экспедиция 1957 года, участие: Ирина Спалько",
            status: "Возвращён создателям",
            dimensions: "Натуральный размер черепа",
            image: "images/crystal-skull.webp"
        },
        {
            id: 5,
            title: "СВЯТОЙ ГРААЛЬ",
            year: "1937",
            rating: "★ ★ ★ ☆ ☆",
            details: "Династия: Мин | Материал: нефрит и серебро",
            description: "Нефритовый артефакт династии Мин, найденный в заброшенном монастыре в Тибете. Согласно легенде, позволяет видеть сквозь стены. На практике оказался просто красивой безделушкой.",
            location: "Тибет • Заброшенный монастырь",
            expedition: "Частная экспедиция 1937 года",
            status: "Частная коллекция (продано)",
            dimensions: "Диаметр: 6 см",
            image: "images/holy-grail.webp"
        }
    ];
    
    const artifact = artifactsData.find(a => a.id === artifactId);
    if (!artifact) return;
    
    const modal = document.getElementById('artifactModal');
    if (!modal) return;
    
    // Заполняем данные
    document.getElementById('modalTitle').textContent = artifact.title;
    document.getElementById('modalYear').textContent = artifact.year;
    document.getElementById('modalRating').textContent = artifact.rating;
    document.getElementById('modalDetails').textContent = artifact.details;
    document.getElementById('modalDescription').textContent = artifact.description;
    document.getElementById('modalLocationText').textContent = artifact.location;
    document.getElementById('modalExpeditionInfo').textContent = artifact.expedition;
    document.getElementById('modalStatus').textContent = artifact.status;
    document.getElementById('modalDimensions').textContent = artifact.dimensions;
    
    document.getElementById('polaroidImage').style.backgroundImage = `url('${artifact.image}')`;
    document.getElementById('polaroidLabel').textContent = artifact.title;
    document.getElementById('polaroidDate').textContent = artifact.year;
    
    // Показываем модальное окно
    modal.style.display = 'flex';
    modal.style.animation = 'fadeIn 0.5s ease-out';
    document.body.style.overflow = 'hidden';
    
    // Добавляем обработчик клавиши Escape
    const handleKeydown = function(e) {
        if (e.key === 'Escape') {
            closeArtifactModal();
        }
    };
    document.addEventListener('keydown', handleKeydown);
    modal._keydownHandler = handleKeydown;
};

window.closeArtifactModal = function() {
    const modal = document.getElementById('artifactModal');
    if (!modal) return;
    
    modal.style.animation = 'fadeOut 0.5s ease-out';
    setTimeout(() => {
        modal.style.display = 'none';
        modal.style.animation = '';
    }, 500);
    
    document.body.style.overflow = '';
    
    // Удаляем обработчик клавиши Escape
    if (modal._keydownHandler) {
        document.removeEventListener('keydown', modal._keydownHandler);
        delete modal._keydownHandler;
    }
};

function initArtifactsAnimations() {
    const artifactCards = document.querySelectorAll('#artifacts .film-card');
    
    const artifactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                artifactObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    artifactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        artifactObserver.observe(card);

        // Эффект при наведении
        card.addEventListener('mouseenter', function() {
            const title = this.querySelector('.film-title');
            if (title) {
                title.style.textShadow = '0 0 30px rgba(212, 175, 55, 0.8)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const title = this.querySelector('.film-title');
            if (title) {
                title.style.textShadow = '3px 3px 6px rgba(0, 0, 0, 0.7), 0 0 20px rgba(212, 175, 55, 0.3)';
            }
        });
    });

    // Анимация цитаты
    const artifactsQuote = document.querySelector('#artifacts .films-quote');
    if (artifactsQuote) {
        const quoteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    quoteObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        artifactsQuote.style.opacity = '0';
        artifactsQuote.style.transform = 'translateY(40px)';
        artifactsQuote.style.transition = 'opacity 1s ease, transform 1s ease';
        quoteObserver.observe(artifactsQuote);
    }
}

// Экспортируем функцию для main.js

window.initArtifacts = initArtifacts;



// Модуль снаряжения
function initEquipment() {
    console.log('Инициализация снаряжения...');
    
    const equipmentData = [
        {
            title: "КОЖАНАЯ КУРТКА",
            image: "images/jacket.webp",
            synopsis: "Кожаная куртка из козьей кожи, куплена в Каире в 1925 году. Пережила пули, огонь, падения и атаки змей. С каждой царапиной становится только лучше. Замшевая подкладка заменялась трижды. Карманы специально увеличены для хранения блокнота, пистолета и мелких артефактов.",
            details: "Производитель: неизвестен",
            rating: ""
        },
        {
            title: "КНУТ",
            image: "images/whip.webp",
            synopsis: "10-футовый бычий кнут, сделанный в Аргентине. Кожа высочайшего качества, рукоять из бука. Использовался для качания через пропасти, обезвреживания противников и... иногда для выбивания пыли из ковров. Требует регулярной обработки специальным маслом. Однажды спас жизнь в Катманду.",
            details: "Длина: 3 метра",
            rating: ""
        },
        {
            title: "РЕВОЛЬВЕР S&W",
            image: "images/gun.webp",
            synopsis: "Smith & Wesson Model 1917, калибр .45. Подарен отцом перед первой самостоятельной экспедицией. Прошел через пустыни, джунгли и подземные храмы. Никогда не подводил. Боезапас: 6 патронов. Использовался в основном для устрашения - настоящий археолог решает проблемы интеллектом, а не оружием.",
            details: "Калибр: .45",
            rating: ""
        },
        {
            title: "ШЛЯПА",
            image: "images/hat.webp",
            synopsis: "Коричневая федора из чистой шерсти, куплена в Лондоне. Защищает от солнца, дождя и иногда от небольших падающих камней. Внутри - специальная подкладка для вентиляции. Края слегка загнуты в результате инцидента в Перу. Каждый год отправляется на чистку к специалисту в Нью-Йорке.",
            details: "Материал: шерсть",
            rating: ""
        },
        {
            title: "СУМКА АРХЕОЛОГА",
            image: "images/bag.webp",
            synopsis: "Кожаная полевая сумка немецкого производства. Отделения для: кирок, щёток, увеличительного стекла, блокнота, карандашей, компаса, аптечки, фляги и небольшого артефакта. Имеет скрытый карман для важных документов. Регулярно проверяется на наличие насекомых и скорпионов.",
            details: "Вместимость: 15 кг",
            rating: ""
        },
        {
            title: "ПОЛЕВОЙ ДНЕВНИК",
            image: "images/diary.webp",
            synopsis: "Кожаный блокнот с водонепроницаемыми страницами. Содержит зарисовки, карты, заметки на 12 языках и личные наблюдения за 1934-1957 годы. Использовались специальные чернила, не выцветающие со временем. Включает секретные заметки о местонахождении неучтённых артефактов.",
            details: "Страниц: 300",
            rating: ""
        }
    ];

    const container = document.getElementById('equipmentGrid');
    if (!container) return;

    // Очищаем контейнер
    container.innerHTML = '';

    // Создаем карточки снаряжения
    equipmentData.forEach((item, index) => {
        const itemElement = createEquipmentCard(item, index);
        container.appendChild(itemElement);
    });

    // Инициализируем анимации
    initEquipmentAnimations();
}

function createEquipmentCard(item, index) {
    const div = document.createElement('div');
    div.className = 'film-card fade-in';
    div.innerHTML = `
        <div class="film-poster" style="background-image: url('${item.image}');">
            <div class="film-overlay">
                <div class="film-year"></div>
                <div class="film-title">${item.title}</div>
            </div>
        </div>
        <div class="film-content">
            <p class="film-synopsis">
                ${item.synopsis}
            </p>
            <div class="film-details">
                <div class="film-director">${item.details}</div>
                <div class="film-rating">${item.rating}</div>
            </div>
        </div>
    `;
    
    // Добавляем задержку для анимации
    div.style.animationDelay = `${index * 0.2}s`;
    
    return div;
}

function initEquipmentAnimations() {
    const equipmentCards = document.querySelectorAll('#equipment .film-card');
    
    const equipmentObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                equipmentObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    equipmentCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        equipmentObserver.observe(card);

        // Эффект при наведении
        const poster = card.querySelector('.film-poster');
        
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 768) {
                const cardRect = this.getBoundingClientRect();
                const x = e.clientX - cardRect.left;
                const y = e.clientY - cardRect.top;
                const centerX = cardRect.width / 2;
                const centerY = cardRect.height / 2;
                const rotateY = ((x - centerX) / centerX) * 5;
                const rotateX = ((centerY - y) / centerY) * 5;

                this.style.transform = `
                    translateY(-30px)
                    scale(1.05)
                    rotateY(${rotateY}deg)
                    rotateX(${rotateX}deg)
                `;

                if (poster) {
                    const moveX = (x / cardRect.width) * 30 - 15;
                    const moveY = (y / cardRect.height) * 30 - 15;
                    poster.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
                }
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateY(0deg) rotateX(0deg)';
            this.style.transition = 'all 0.7s ease';
            if (poster) {
                poster.style.transform = 'translate(0, 0) scale(1)';
                poster.style.transition = 'transform 0.7s ease';
            }
        });

        // Клик для разворачивания описания
        card.addEventListener('click', function(e) {
            const synopsis = this.querySelector('.film-synopsis');
            if (synopsis) {
                const isExpanded = synopsis.style.maxHeight && synopsis.style.maxHeight !== 'none';
                if (isExpanded) {
                    synopsis.style.maxHeight = '8em';
                    synopsis.style.overflow = 'hidden';
                } else {
                    synopsis.style.maxHeight = synopsis.scrollHeight + 'px';
                    synopsis.style.overflow = 'visible';
                }
            }
        });

        const synopsis = card.querySelector('.film-synopsis');
        if (synopsis) {
            synopsis.style.maxHeight = '8em';
            synopsis.style.overflow = 'hidden';
        }

        // Эффект при наведении на заголовок
        const title = card.querySelector('.film-title');
        if (title) {
            card.addEventListener('mouseenter', function() {
                title.style.textShadow = '0 0 30px rgba(212, 175, 55, 0.8)';
            });

            card.addEventListener('mouseleave', function() {
                title.style.textShadow = '3px 3px 6px rgba(0, 0, 0, 0.7), 0 0 20px rgba(212, 175, 55, 0.3)';
            });
        }
    });

    // Анимация цитаты
    const equipmentQuote = document.querySelector('#equipment .films-quote');
    if (equipmentQuote) {
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

        equipmentQuote.style.opacity = '0';
        equipmentQuote.style.transform = 'translateY(40px)';
        equipmentQuote.style.transition = 'opacity 1s ease, transform 1s ease';
        quoteObserver.observe(equipmentQuote);
    }
}

// Экспортируем функцию для main.js
window.initEquipment = initEquipment;

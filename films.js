// Модуль фильмов
function initFilms() {
    console.log('Инициализация фильмов...');
    
    const filmsData = [
        {
            year: "1981",
            title: "ИСКАТЕЛИ УТРАЧЕННОГО КОВЧЕГА",
            image: "the lost ark.webp",
            synopsis: "Поиски Ковчега Завета приводят меня в Египет, где я сталкиваюсь с группой искателей сомнительной репутации. Вместе с Марион Рэйвенвуд мы пытаемся найти артефакт до того, как он попадёт в неправильные руки. Приключения, древние ловушки и бегство от погони — обычный рабочий день археолога.",
            director: "Режиссёр: Стивен Спилберг",
            rating: "★ ★ ★ ★ ★"
        },
        {
            year: "1984",
            title: "ИНДИАНА ДЖОНС И ХРАМ СУДЬБЫ",
            image: "temple-of-fate.webp",
            synopsis: "Шанхай, Индия, и снова я в центре событий. Поиски магических камней Шанкары приводят меня в деревню, где дети были похищены тайным культом. Иногда приходится стать героем, даже если очень не хочется. Шанхайские ночные клубы, индийские храмы и вечные погони — всё как обычно.",
            director: "Режиссёр: Стивен Спилберг",
            rating: "★ ★ ★ ★ ☆"
        },
        {
            year: "1989",
            title: "ИНДИАНА ДЖОНС И ПОСЛЕДНИЙ КРЕСТОВЫЙ ПОХОД",
            image: "last-crusade.jpg",
            synopsis: "Мой отец пропал во время поисков Святого Грааля. Пришлось объединиться с ним, чтобы найти Чашу Христа до того, как это сделают те, кто видит в ней лишь источник власти. Семейные дела — самые сложные. Венеция, Стамбул, Петра и вечный вопрос: что важнее — знание или жизнь?",
            director: "Режиссёр: Стивен Спилберг",
            rating: "★ ★ ★ ★ ★"
        }
    ];

    const container = document.getElementById('filmsGrid');
    if (!container) return;

    // Очищаем контейнер
    container.innerHTML = '';

    // Создаем карточки фильмов
    filmsData.forEach((film, index) => {
        const filmElement = createFilmCard(film, index);
        container.appendChild(filmElement);
    });

    // Инициализируем анимации и интерактивность
    initFilmsAnimations();
}

function createFilmCard(film, index) {
    const div = document.createElement('div');
    div.className = 'film-card fade-in';
    div.innerHTML = `
        <div class="film-poster" style="background-image: url('${film.image}');">
            <div class="film-overlay">
                <div class="film-year">${film.year}</div>
                <div class="film-title">${film.title}</div>
            </div>
        </div>
        <div class="film-content">
            <p class="film-synopsis">
                ${film.synopsis}
            </p>
            <div class="film-details">
                <div class="film-director">${film.director}</div>
                <div class="film-rating">${film.rating}</div>
            </div>
        </div>
    `;
    
    // Добавляем задержку для анимации
    div.style.animationDelay = `${index * 0.3}s`;
    
    return div;
}

function initFilmsAnimations() {
    const filmCards = document.querySelectorAll('.film-card');
    const ratings = document.querySelectorAll('.film-rating');

    const filmObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 300);
                filmObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    filmCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        filmObserver.observe(card);

        const poster = card.querySelector('.film-poster');

        // Эффект при наведении
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
            setTimeout(() => {
                this.style.transition = '';
                if (poster) poster.style.transition = '';
            }, 700);
        });

        // Клик для разворачивания синопсиса
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.film-rating')) {
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
            }
        });

        const synopsis = card.querySelector('.film-synopsis');
        if (synopsis) {
            synopsis.style.maxHeight = '8em';
            synopsis.style.overflow = 'hidden';
        }
    });

    // Интерактивные рейтинги
    ratings.forEach(rating => {
        rating.addEventListener('click', function(e) {
            e.stopPropagation();
            const currentRating = this.innerHTML;
            const starsCount = (currentRating.match(/★/g) || []).length;

            if (starsCount < 5) {
                this.innerHTML = '★ '.repeat(starsCount + 1) + '☆ '.repeat(4 - starsCount);
            } else {
                this.innerHTML = '★ ★ ★ ★ ★';
            }

            this.style.transform = 'scale(1.3)';
            this.style.color = 'var(--gold-light)';
            this.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.8)';

            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.color = 'var(--gold)';
                this.style.textShadow = '';
            }, 300);
        });

        rating.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });

        rating.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Анимация цитаты
    const filmsQuote = document.querySelector('.films-quote');
    if (filmsQuote) {
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

        filmsQuote.style.opacity = '0';
        filmsQuote.style.transform = 'translateY(40px)';
        filmsQuote.style.transition = 'opacity 1s ease, transform 1s ease';
        quoteObserver.observe(filmsQuote);

        // Пульсирующая тень
        setInterval(() => {
            filmsQuote.style.boxShadow = `
                25px 25px 70px rgba(0, 0, 0, 0.6),
                0 0 40px rgba(212, 175, 55, ${Math.random() * 0.3 + 0.1}),
                inset 0 0 70px rgba(139, 69, 19, 0.2)
            `;
        }, 3000);
    }
}

// Экспортируем функцию для main.js

window.initFilms = initFilms;

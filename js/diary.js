// Модуль дневника
function initDiary() {
    console.log('Инициализация дневника...');
    
    const diaryEntries = [
        {
            date: "15 МАРТА 1936",
            location: "ПЕРУ • Храм Чахчан",
            icon: "fa-mountain",
            content: "Сегодня наконец добрался до внутреннего святилища. Идол Ховитто оказался именно там, где предсказывали легенды. Маленький, но чертовски тяжёлый. Когда я заменил его мешком с песка, весь храм начал рушиться вокруг меня. Бежал так, что до сих пор дрожат ноги. Местные были не в восторге от моих методов исследований. Пришлось уходить по реке на импровизированном плоту.",
            quote: "\"Первый урок археолога: некоторые вещи не хотят, чтобы их находили. Второй урок: всегда беги быстрее, чем гигантский катящийся валун.\""
        },
        {
            date: "3 ИЮЛЯ 1936",
            location: "ЕГИПЕТ • Раскопки в Танисе",
            icon: "fa-ankh",
            content: "Нашёл вход в подземный комплекс. Воздух внутри был таким древним, что казалось, дышишь самой историей. Свет фонаря выхватывал из тьмы иероглифы, которые не видели солнца три тысячи лет. Маркус был прав — некоторые артефакты лучше оставлять там, где они лежат. Но любопытство — страшная сила. Особенно когда знаешь, что ищешь.",
            quote: "\"Иногда понимаешь, что некоторые знания должны оставаться похороненными. Не потому, что они опасны, а потому, что мир к ним не готов.\""
        },
        {
            date: "12 НОЯБРЯ 1935",
            location: "НЕПАЛ • Бар в Катманду",
            icon: "fa-beer",
            content: "Встретил Марион сегодня. Она всё ещё злится на меня за тот случай в Чикаго, и её удар в челюсть доказал это вполне убедительно. Но она дала медальон. Бар сгорел. Опять. Кажется, везде, где появляюсь я, вскоре начинается пожар. Возможно, стоит сменить профессию. Или хотя бы перестать посещать бары.",
            quote: "\"Прошлое имеет привычку догонять тебя в самый неподходящий момент. Особенно если это прошлое с хорошим правым хуком.\""
        },
        {
            date: "5 ИЮНЯ 1938",
            location: "ВЕНЕЦИЯ • Катакомбы под библиотекой",
            icon: "fa-horse",
            content: "Крысы. Тысячи крыс. Почему всегда крысы? Искали склеп рыцаря-тамплиера, нашли канализацию XIII века. Вода ледяная, и пахнет так, будто история здесь закончилась очень плохо. Нашёл второй крест Коронадо. Он был спрятан в саркофаге, который держался на честном слове и молитве. Когда я его взял, половина катакомб обрушилась. Типичный рабочий день.",
            quote: "\"Археология — это искусство находить красоту в грязи и смысл в разрушении. И иногда — искусство очень быстро плавать.\""
        },
        {
            date: "13 ИЮЛЯ 1938",
            location: "ПЕТРА • Храм Грааля",
            icon: "fa-wine-glass",
            content: "Отец выбрал правильную чашу. Простую глиняную. Не золотую, не усыпанную камнями. В этом была вся мудрость — настоящее не блестит. Оно просто есть. Я мог бы взять её. Вечность была в двух шагах. Но я видел, что она сделала с Риндером. Отец был прав: иногда нужно просто отпустить. Храм начал рушиться сразу после нашего ухода. Как будто он ждал этого.",
            quote: "\"Иногда величайшее открытие — это понимание, что некоторые вещи должны оставаться потерянными. А величайшая мудрость — уметь вовремя уйти.\""
        },
        {
            date: "22 МАЯ 1957",
            location: "АМАЗОНИЯ • Руины Акатора",
            icon: "fa-skull",
            content: "Хрустальный череп... Он смотрит сквозь тебя. Не глазами, а чем-то другим. Ирина хотела его знаний, но не понимала, что его знание — это тишина. Тишина, которая сводит с ума. Он вернулся к своим, к тем, кто его создал. Некоторые двери лучше не открывать. Некоторые истины лучше не знать.",
            quote: "\"Есть вещи, которые человеку не положено знать. Не потому что они запрещены, а потому что наш разум не способен их вынести.\""
        }
    ];

    const container = document.getElementById('diaryEntries');
    if (!container) return;

    // Очищаем контейнер
    container.innerHTML = '';

    // Создаем записи дневника
    diaryEntries.forEach((entry, index) => {
        const entryElement = createDiaryEntry(entry, index);
        container.appendChild(entryElement);
    });

    // Инициализируем анимации
    initDiaryAnimations();
}

function createDiaryEntry(entry, index) {
    const div = document.createElement('div');
    div.className = 'diary-entry fade-in';
    div.innerHTML = `
        <div class="entry-date">${entry.date}</div>
        <h3 class="entry-location">
            <i class="fas ${entry.icon}"></i>
            ${entry.location}
        </h3>
        <div class="entry-content">
            ${entry.content}
        </div>
        <div class="entry-quote">
            ${entry.quote}
        </div>
    `;
    
    // Добавляем задержку для анимации
    div.style.animationDelay = `${index * 0.2}s`;
    
    return div;
}

function initDiaryAnimations() {
    const diaryEntries = document.querySelectorAll('.diary-entry');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const entryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';

                    const dateElement = entry.target.querySelector('.entry-date');
                    if (dateElement) {
                        dateElement.style.animation = 'fadeInUp 0.8s ease-out';
                    }

                    const icon = entry.target.querySelector('.entry-location i');
                    if (icon) {
                        icon.style.transform = 'rotate(360deg)';
                        icon.style.transition = 'transform 1s ease 0.5s';
                    }
                }, index * 200);
                entryObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    diaryEntries.forEach(entry => {
        entry.style.opacity = '0';
        entry.style.transform = 'translateX(-40px)';
        entry.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        entryObserver.observe(entry);

        // Добавляем интерактивность
        entry.addEventListener('click', function(e) {
            if (!e.target.closest('.entry-date')) {
                this.classList.toggle('expanded');
                const content = this.querySelector('.entry-content');
                const quote = this.querySelector('.entry-quote');

                if (this.classList.contains('expanded')) {
                    if (content) content.style.maxHeight = content.scrollHeight + 'px';
                    if (quote) quote.style.maxHeight = quote.scrollHeight + 'px';
                } else {
                    if (content) content.style.maxHeight = '8em';
                    if (quote) quote.style.maxHeight = 'none';
                }
            }
        });

        const content = entry.querySelector('.entry-content');
        const quote = entry.querySelector('.entry-quote');
        if (content) content.style.maxHeight = '8em';
        if (quote) quote.style.maxHeight = 'none';

        // Эффекты при наведении на дату
        const dateElement = entry.querySelector('.entry-date');
        if (dateElement) {
            dateElement.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.08)';
                this.style.boxShadow = '8px 8px 25px rgba(0, 0, 0, 0.4)';
            });

            dateElement.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '5px 5px 15px rgba(0, 0, 0, 0.3)';
            });
        }

        // Эффекты при наведении на иконку
        const locationIcon = entry.querySelector('.entry-location i');
        if (locationIcon) {
            locationIcon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.3) rotate(15deg)';
                this.style.textShadow = '0 0 25px rgba(212, 175, 55, 0.8)';
            });

            locationIcon.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.textShadow = '0 0 15px rgba(212, 175, 55, 0.5)';
            });
        }
    });

    // Анимация заголовка дневника
    const diaryTitle = document.querySelector('.diary-title');
    if (diaryTitle) {
        let shadowState = 0;
        setInterval(() => {
            shadowState = (shadowState + 1) % 3;
            const shadows = [
                '4px 4px 8px rgba(0, 0, 0, 0.3), 0 0 30px rgba(212, 175, 55, 0.2)',
                '4px 4px 8px rgba(0, 0, 0, 0.3), 0 0 40px rgba(212, 175, 55, 0.3)',
                '4px 4px 8px rgba(0, 0, 0, 0.3), 0 0 50px rgba(212, 175, 55, 0.4)'
            ];
            diaryTitle.style.textShadow = shadows[shadowState];
        }, 2000);
    }
}

// Экспортируем функцию для main.js
window.initDiary = initDiary;
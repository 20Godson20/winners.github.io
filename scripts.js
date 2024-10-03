// Можно добавить кастомизацию параметров анимации через JavaScript, если нужно
document.querySelector('.aurora').style.animationDuration = "12s"; // Увеличение скорости

// Получаем кнопки и новостные блоки
const switchButtons = document.querySelectorAll('.switch-btn');
const newsSections = document.querySelectorAll('.news-container');

// Функция для переключения новостей
switchButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Снимаем активный класс у всех кнопок
        switchButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс на нажатую кнопку
        this.classList.add('active');

        // Получаем тип новостей из data-news атрибута кнопки
        const newsType = this.getAttribute('data-news');

        // Переключаем видимость новостных блоков
        newsSections.forEach(section => {
            section.classList.remove('active');
            section.classList.add('hidden'); // Прячем все блоки
        });

        // Показываем только выбранный блок новостей
        document.getElementById(`${newsType}-news`).classList.remove('hidden');
        document.getElementById(`${newsType}-news`).classList.add('active');
    });
});

// По умолчанию показываем Game News
document.getElementById('game-news').classList.add('active');

function fetchTelegramNews() {
    fetch('/path/to/your/server/api') // Запрос к вашему серверу для получения новостей
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.querySelector('#game-news .news-cards');
            data.forEach(news => {
                const newsCard = document.createElement('div');
                newsCard.classList.add('card');
                newsCard.innerHTML = `
                    <h3>${news.title}</h3>
                    <p>${news.description}</p>
                `;
                newsContainer.appendChild(newsCard);
            });
        });
}

// Вызовите эту функцию при загрузке страницы
fetchTelegramNews();
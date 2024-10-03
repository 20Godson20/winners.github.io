const express = require('express');
const fs = require('fs'); // Модуль для работы с файлами
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // Для обработки данных в формате JSON

const TELEGRAM_TOKEN = '7823112579:AAHpAL55d43INfEUhExEk62uL8NmyqfmbTQ'; // Не забудьте заменить на ваш токен
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

// Путь к файлу, где будут храниться новости
const NEWS_FILE = 'news.json';

// Вебхук для получения сообщений от Telegram
app.post('/webhook', (req, res) => {
    const message = req.body.message;

    if (message && message.chat && message.text) {
        const text = message.text;

        // Читаем текущие новости из файла
        let news = [];
        if (fs.existsSync(NEWS_FILE)) {
            // Если файл существует, читаем его содержимое
            news = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf8'));
        }

        // Добавляем новое сообщение как новость
        news.push({
            title: `Новое сообщение от ${message.from.first_name || 'пользователя'}`,
            description: text,
            date: new Date().toLocaleString() // Добавляем дату и время
        });

        // Сохраняем обновленные новости обратно в файл
        fs.writeFileSync(NEWS_FILE, JSON.stringify(news, null, 2));

        console.log(`Новое сообщение сохранено: ${text}`);

        // Отправляем ответ Telegram, чтобы бот не повторял запрос
        res.send('ok');
    } else {
        res.send('no message');
    }
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});

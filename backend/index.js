// index.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config');
const cors = require('cors');
const app = express();
const Request = require('./models/Request'); // Импортируйте вашу модель Request

// Middleware
app.use(cors()); // Разрешает все CORS запросы
app.use(express.json()); // Позволяет парсить JSON в теле запросов
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Проверка соединения с базой данных
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Синхронизация базы данных
sequelize.sync();

// Базовый маршрут
app.get('/', (req, res) => {
    res.send('Привет, мир!');
});

// Получить все заявки (доступно всем пользователям)
app.get('/requests', async (req, res) => {
    try {
        const requests = await Request.findAll(); // Получаем все заявки из базы данных
        res.json(requests);
    } catch (error) {
        console.error('Ошибка при получении заявок:', error);
        res.status(500).json({ message: 'Ошибка при получении заявок' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

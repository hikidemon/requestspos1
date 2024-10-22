const jwt = require('jsonwebtoken');

// Middleware для проверки токена и авторизации
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен' });
    }

    try {
        const decoded = jwt.verify(token, 'secret'); // 'secret' - ключ, который должен быть защищен
        req.user = decoded; // Добавляем информацию о пользователе в запрос
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Неверный или истекший токен' });
    }
};

// Middleware для проверки роли (только для админов)
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Доступ запрещен' });
    }
    next();
};

module.exports = { authenticate, authorizeAdmin };

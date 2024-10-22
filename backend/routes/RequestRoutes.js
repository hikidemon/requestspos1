// routes/RequestRoutes.js
const express = require('express');
const { authenticate, authorizeAdmin } = require('../middleware/authorize');
const Request = require('../models/Request'); // Модель заявки

const router = express.Router();

// Получить все заявки
router.get('/', authenticate, async (req, res) => {
    try {
        const requests = await Request.findAll(); // Получение всех заявок из базы данных
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении заявок' });
    }
});

// Создать новую заявку (только для админов)
router.post('/', authenticate, authorizeAdmin, async (req, res) => {
    const { title, description, status, assignedTo } = req.body;
    try {
        const newRequest = await Request.create({
            title,
            description,
            status,
            assignedTo,
        });
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании заявки' });
    }
});

// Обновить заявку (только для админов)
router.put('/:id', authenticate, authorizeAdmin, async (req, res) => {
    const { id } = req.params;
    const { title, description, status, assignedTo } = req.body;

    try {
        const request = await Request.findByPk(id);
        if (!request) {
            return res.status(404).json({ message: 'Заявка не найдена' });
        }

        request.title = title || request.title;
        request.description = description || request.description;
        request.status = status || request.status;
        request.assignedTo = assignedTo || request.assignedTo;
        await request.save();

        res.json(request);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при обновлении заявки' });
    }
});

// Удалить заявку (только для админов)
router.delete('/:id', authenticate, authorizeAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const request = await Request.findByPk(id);
        if (!request) {
            return res.status(404).json({ message: 'Заявка не найдена' });
        }

        await request.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении заявки' });
    }
});

module.exports = router;

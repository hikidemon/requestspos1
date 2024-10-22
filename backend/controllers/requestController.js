const Request = require('../models/Request');

// Получить все заявки
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.findAll();
        console.log('Полученные заявки:', requests);
        res.json(requests);
    } catch (error) {
        console.error('Ошибка получения заявок:', error.message);
        res.status(500).json({ message: 'Ошибка получения заявок', error: error.message });
    }
};


// Создать новую заявку
// Пример исправления запроса
exports.createRequest = async (req, res) => {
  try {
    const { title, description, assignedTo, status } = req.body; // Убедитесь, что вы используете assignedTo
    const newRequest = await Request.create({ title, description, status ,assignedTo, });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка создания заявки', error: error.message });
  }
};



// Редактирование заявки
exports.updateRequest = async (req, res) => {
    const { id } = req.params;
    const { title, description, assignedTo, status } = req.body;

    try {
        const request = await Request.findByPk(id);
        if (!request) {
            return res.status(404).json({ message: 'Заявка не найдена' });
        }

        request.title = title;
        request.description = description;
        request.assignedTo = assignedTo;
        request.status = status;

        await request.save();
        res.json(request);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка обновления заявки' });
    }
};

// Удаление заявки
exports.deleteRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Request.destroy({
            where: { id }
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Заявка не найдена' });
        }

        res.status(204).send(); // Успешное удаление, без контента
    } catch (error) {
        res.status(500).json({ message: 'Ошибка удаления заявки' });
    }
};

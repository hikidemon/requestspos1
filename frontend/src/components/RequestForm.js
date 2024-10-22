import React, { useState } from 'react';
import axios from 'axios';

const RequestForm = ({ onRequestAdded, userRole }) => { // Добавляем userRole как пропс
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [assignedTo, setAssignedTo] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/requests', {
                title,
                description,
                status,
                assignedTo,
            });
            onRequestAdded(response.data); // Передаем новую заявку в родительский компонент
            setTitle('');
            setDescription('');
            setAssignedTo('');
            setStatus('pending');
        } catch (error) {
            console.error('Ошибка при создании заявки:', error);
        }
    };

    // Если пользователь не администратор, скрываем форму
    if (userRole !== 'admin') {
        return null;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Название"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Описание"
                required
            />
            <input
                type="text"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="Кому назначена"
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pending">В ожидании</option>
                <option value="in_progress">В работе</option>
                <option value="completed">Завершена</option>
            </select>
            <button type="submit">Добавить заявку</button>
        </form>
    );
};

export default RequestForm;

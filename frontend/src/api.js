import React, { useState, useEffect } from 'react';
import { getAllRequests, createRequest, updateRequest, deleteRequest } from './api'; // Импортируем все функции из API

const App = () => {
    const [requests, setRequests] = useState([]); // Состояние для заявок
    const [newRequest, setNewRequest] = useState({ description: '', responsible: '' }); // Состояние для новой заявки
    const [editingRequestId, setEditingRequestId] = useState(null); // Состояние для ID редактируемой заявки
    const [editData, setEditData] = useState({ description: '', responsible: '' }); // Данные для редактирования

    // Функция для загрузки всех заявок
    const fetchRequests = async () => {
        try {
            const data = await getAllRequests();
            setRequests(data); // Устанавливаем данные в состояние
        } catch (error) {
            console.error('Ошибка загрузки заявок:', error);
        }
    };

    // Вызываем fetchRequests при монтировании компонента
    useEffect(() => {
        fetchRequests();
    }, []);

    // Функция для создания новой заявки
    const handleCreateRequest = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        try {
            const data = await createRequest(newRequest); // Создаем новую заявку
            setRequests([...requests, data]); // Добавляем новую заявку в список
            setNewRequest({ description: '', responsible: '' }); // Очищаем форму
        } catch (error) {
            console.error('Ошибка создания заявки:', error);
        }
    };

    // Функция для начала редактирования заявки
    const handleEditRequest = (request) => {
        setEditingRequestId(request.id); // Устанавливаем редактируемую заявку
        setEditData({ description: request.description, responsible: request.responsible }); // Устанавливаем данные для редактирования
    };

    // Функция для обновления заявки
    const handleUpdateRequest = async (e) => {
        e.preventDefault();
        try {
            const updatedRequest = await updateRequest(editingRequestId, editData); // Обновляем заявку
            setRequests(requests.map(req => req.id === editingRequestId ? updatedRequest : req)); // Обновляем список заявок
            setEditingRequestId(null); // Сбрасываем редактируемую заявку
            setEditData({ description: '', responsible: '' }); // Очищаем данные для редактирования
        } catch (error) {
            console.error('Ошибка обновления заявки:', error);
        }
    };

    // Функция для удаления заявки
    const handleDeleteRequest = async (requestId) => {
        try {
            await deleteRequest(requestId); // Удаляем заявку
            setRequests(requests.filter(req => req.id !== requestId)); // Удаляем заявку из списка
        } catch (error) {
            console.error('Ошибка удаления заявки:', error);
        }
    };

    return (
        <div>
            <h1>Список заявок</h1>

            {/* Форма для создания новой заявки */}
            <form onSubmit={handleCreateRequest}>
                <input
                    type="text"
                    placeholder="Описание проблемы"
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Ответственный"
                    value={newRequest.responsible}
                    onChange={(e) => setNewRequest({ ...newRequest, responsible: e.target.value })}
                />
                <button type="submit">Добавить заявку</button>
            </form>

            {/* Отображение всех заявок */}
            <ul>
                {requests.map((request) => (
                    <li key={request.id}>
                        <strong>ID:</strong> {request.id} <br />
                        <strong>Описание:</strong> {request.description} <br />
                        <strong>Ответственный:</strong> {request.responsible} <br />
                        <strong>Статус:</strong> {request.status} <br />
                        <button onClick={() => handleEditRequest(request)}>Редактировать</button>
                        <button onClick={() => handleDeleteRequest(request.id)}>Удалить</button>
                    </li>
                ))}
            </ul>

            {/* Форма для редактирования заявки */}
            {editingRequestId && (
                <form onSubmit={handleUpdateRequest}>
                    <input
                        type="text"
                        placeholder="Описание проблемы"
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Ответственный"
                        value={editData.responsible}
                        onChange={(e) => setEditData({ ...editData, responsible: e.target.value })}
                    />
                    <button type="submit">Сохранить изменения</button>
                </form>
            )}
        </div>
    );
};

export default App;

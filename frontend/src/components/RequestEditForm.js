import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestEditForm = ({ request, onUpdate }) => {
    const [title, setTitle] = useState(request.title);
    const [description, setDescription] = useState(request.description);
    const [status, setStatus] = useState(request.status);
    const [assignedTo, setAssignedTo] = useState(request.assignedTo);

    useEffect(() => {
        setTitle(request.title);
        setDescription(request.description);
        setStatus(request.status);
        setAssignedTo(request.assignedTo);
    }, [request]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/requests/${request.id}`, {
                title,
                description,
                status,
                assignedTo,
            });
            onUpdate(response.data);
        } catch (error) {
            console.error('Ошибка при обновлении заявки:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
            />
            <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
            />
            <input 
                type="text" 
                value={assignedTo} 
                onChange={(e) => setAssignedTo(e.target.value)} 
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pending">В ожидании</option>
                <option value="in_progress">В работе</option>
                <option value="completed">Завершена</option>
            </select>
            <button type="submit">Сохранить изменения</button>
        </form>
    );
};

export default RequestEditForm;

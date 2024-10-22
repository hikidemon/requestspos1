// src/components/RequestItem.js
import React from 'react';

const RequestItem = ({ request, onEdit, onDelete }) => {
    return (
        <li>
            <h3>{request.title}</h3>
            <p>{request.description}</p>
            <p><strong>Статус:</strong> {request.status}</p>
            <p><strong>Кому назначено:</strong> {request.assignedTo}</p>
            <button onClick={() => onEdit(request)}>Редактировать</button>
            <button onClick={() => onDelete(request.id)}>Удалить</button>
        </li>
    );
};

export default RequestItem;

import React from 'react';

const RequestList = ({ requests, onUpdateRequest, onDeleteRequest }) => {
    return (
        <div>
            {requests.map((request) => (
                <div
                    key={request.id}
                    style={{
                        border: '2px solid purple', // Фиолетовая рамка
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '5px'
                    }}
                >
                    <h2>{request.title}</h2>
                    <p>{request.description}</p>
                    <p>Статус: {request.status}</p>
                    <p>Назначено: {request.assignedTo}</p>
                    <button onClick={() => onUpdateRequest(request)}>Редактировать</button>
                    <button onClick={() => onDeleteRequest(request.id)}>Удалить</button>
                </div>
            ))}
        </div>
    );
};

export default RequestList;

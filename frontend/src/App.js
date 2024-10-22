// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:3000/requests');
                setRequests(response.data);
            } catch (error) {
                console.error('Ошибка при получении заявок:', error);
            }
        };
        fetchRequests();
    }, []);

    return (
        <div>
            <h1>Заявки</h1>
            <div style={{ border: '2px solid violet', padding: '10px', margin: '10px' }}>
                {requests.map((request) => (
                    <div key={request.id} style={{ marginBottom: '20px' }}>
                        <h3>{request.title}</h3>
                        <p>{request.description}</p>
                        <p>Статус: {request.status}</p>
                        <p>Назначено: {request.assignedTo}</p>
                        <button>Редактировать</button>
                        <button>Удалить</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;

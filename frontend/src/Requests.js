import React, { useEffect, useState } from 'react';
import { getAllRequests, createRequest } from './api';

const Requests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const data = await getAllRequests();
            setRequests(data);
        };

        fetchRequests();
    }, []);

    const handleCreateRequest = async () => {
        const newRequest = {
            title: 'New Request',
            description: 'Description of new request',
            status: 'Open',
            assignedTo: 'User 1',
        };
        await createRequest(newRequest);
        // Обновите состояние или перезагрузите запросы
    };

    return (
        <div>
            <h1>Requests</h1>
            <button onClick={handleCreateRequest}>Create Request</button>
            <ul>
                {requests.map((request) => (
                    <li key={request.id}>{request.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Requests;

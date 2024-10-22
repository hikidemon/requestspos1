import React, { useState } from 'react';
import axios from 'axios';

const AddRequest = () => {
    const [requestData, setRequestData] = useState({
        request_number: '',
        request_date: '',
        equipment: '',
        issue_type: '',
        description: '',
        client: '',
        status: 'In Progress',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequestData({ ...requestData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/requests', requestData);
            alert('Заявка добавлена успешно!');
        } catch (error) {
            console.error('Ошибка при добавлении заявки:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="request_number" placeholder="Номер заявки" onChange={handleChange} required />
            <input type="date" name="request_date" onChange={handleChange} required />
            <input type="text" name="equipment" placeholder="Оборудование" onChange={handleChange} required />
            <input type="text" name="issue_type" placeholder="Тип неисправности" onChange={handleChange} required />
            <textarea name="description" placeholder="Описание проблемы" onChange={handleChange} required />
            <input type="text" name="client" placeholder="Клиент" onChange={handleChange} required />
            <button type="submit">Добавить заявку</button>
        </form>
    );
};

export default AddRequest;

import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = async (username, password) => {
  
  try {
    const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Authorization': token },
          body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      setRequests(data);

      if (data.token) {
          localStorage.setItem('token', data.token); // Сохраняем токен в локальном хранилище
          setRole(data.role);  // Устанавливаем роль
      }
  } catch (error) {
      console.error('Ошибка входа:', error);
  }


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Логин"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                required
            />
            <button type="submit">Войти</button>
        </form>
    );
};

export default LoginForm;

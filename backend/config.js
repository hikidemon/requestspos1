const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydatabase', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

// Проверка соединения
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;  // Экспортируйте экземпляр Sequelize

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mydatabase', 'postgres', 'password', {
    dialect: 'postgres',
});

const Request = sequelize.define('Request', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    assignedTo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
    tableName: 'Requests', // Ensure this matches your table name
});

module.exports = Request;

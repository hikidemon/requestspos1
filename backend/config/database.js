const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/mydatabase', {
  dialect: 'postgres',
});

module.exports = sequelize;

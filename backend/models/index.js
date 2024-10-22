const sequelize = require('../config'); // Import sequelize instance
const Request = require('./Request'); // Import the Request model

// Sync all models
const models = {
    Request: Request(sequelize), // Pass sequelize instance to Request model
};

// Export models
module.exports = { sequelize, models };

const Sequalize = require('sequelize');
const sequalize = require('../util/database');

const User = sequalize.define('users', {
    id: {
        type: Sequalize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequalize.STRING,
        allowNull: false
    },
    email: {
        type: Sequalize.STRING,
        allowNull: false
    },
});

module.exports = User;
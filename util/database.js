const Sequelize = require('sequelize/index');

const sequelize = new Sequelize(
    'node-complete',
    'root',
    'senhas2019',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

module.exports = sequelize;
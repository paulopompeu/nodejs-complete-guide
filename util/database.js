const mysql = require('mysql2');

const pools = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'senhas2019'
});

module.exports = pools.promise();
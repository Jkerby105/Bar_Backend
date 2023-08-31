const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'MyBar2',
    password: '105Kerby@sql'
});

module.exports = pool.promise();
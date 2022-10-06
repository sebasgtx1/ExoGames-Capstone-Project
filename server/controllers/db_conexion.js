const { createPool } = require('mysql2/promise');

const pool = createPool({
    user: 'root',
    host: 'localhost',
    password: '0227',
    database: 'public',
    port: '3306',
    multipleStatements:true
});

module.exports = {
  pool
};
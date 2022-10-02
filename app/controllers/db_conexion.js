const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '',
    password: 'Exogames1*',
    database: 'exogames-db', // cloud-database
    port: '5432'
});

module.exports = {
    pool
}
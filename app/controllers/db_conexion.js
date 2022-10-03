const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '0227',
    database: 'exogames_test_local', // testing_database
    port: '5432'
});

module.exports = {
    pool
}
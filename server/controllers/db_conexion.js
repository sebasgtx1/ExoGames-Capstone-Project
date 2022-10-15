const { createPool } = require('mysql2/promise');

const pool = createPool({
  user: 'doadmin',
  password: 'AVNS_WubkqMpUFWMYcioxmKE',
  host: 'db-mysql-nyc1-55886-do-user-12661680-0.b.db.ondigitalocean.com',
  port: '25060',
  database: 'public',
  multipleStatements: true
});

module.exports = {
  pool
};
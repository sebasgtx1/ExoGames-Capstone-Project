const mysql = require('mysql');

const pool = mysql.createConnection({
    user: 'admin',
    host: 'exogames-database.c0sknxrn5p3x.us-east-1.rds.amazonaws.com',
    password: 'Exogames1*',
    database: 'public',
    port: '3306'
});

pool.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
  
    console.log('Connected to database.');
  });

module.exports = {
    pool
}
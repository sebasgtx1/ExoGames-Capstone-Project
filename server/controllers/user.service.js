const { pool } = require("./db_conexion");

module.exports = {
  create: async (data, callBack) => {
    await pool.query(
      "INSERT INTO users(username, email, password, status) VALUES(?, ?, ?, ?)",
      [
        data.username, data.email, data.password, data.status,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
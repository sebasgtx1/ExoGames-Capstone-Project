const pool = require("./db_conexion");

module.exports = {
  create: async (data, callBack) => {
    await pool.query(
      "INSERT INTO users(username, email, password, status) VALUES(?, ?, ?, ?)",
      [
        data.username, data.email, data.password, data.status
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsers: async (callBack) => {
    pool.query(
      "SELECT user_id, username, email, status FROM users",
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  getUserByUserId: async (id, callBack) => {
    pool.query(
      "SELECT user_id, username, email, status FROM users WHERE user_id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    )
  },
  updateUser: async (data, callBack) => {
    pool.query(
      "UPDATE users SET username = ?, email = ?, status = ? WHERE user_id = ?",
      [
        data.username, data.email, data.status, data.user_id,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    )
  },
  deleteUser: async (data, callBack) => {
    pool.query(
      "DELETE FROM users WHERE user_id = ?",
      [data.user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserEmail: async (email, callBack) => {
    pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
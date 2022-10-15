const { pool } = require("./db_conexion");
const { genSaltSync, hashSync } = require("bcrypt");


  const createUser = async (req, res) => {
    try {

      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      const [result] = await pool.query(
        "INSERT INTO users(username, email, password, status) VALUES(?, ?, ?, ?)",
        [
          body.username, body.email, body.password, 'active'
        ])
      res.json({
        user_id: result.insertId,
        username: body.username,
        email: body.email
    });

    } catch (error) {

      return res.status(500).json({ message: error.message });

    }

  }

  module.exports = {
    createUser
  };


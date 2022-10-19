const { pool } = require("./db_conexion");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");


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

    return res.status(500).json({
      success: 0,
      data: "This account alredy exists",
    })
  }
}

const getUserByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query("SELECT user_id, username, email, status FROM users WHERE user_id = ?",
      [id]);
    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(result[0]);

  } catch (error) {
    return res.status(500).json({ message: error.message });

  }
}

const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT username, email, status FROM users WHERE status = (?)", ['active']);
    res.json(result);

  } catch (error) {
    return res.status(500).json({ message: error.message });

  }

}

const updateUsers = async (req, res) => {

  try {
    const body = req.body;

    if (body.password) {
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
    }

    const [result] = await pool.query(
      'UPDATE users SET ? WHERE user_id = (?)', [
      body,
      req.params.id
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query(
      'UPDATE users SET status = (?) WHERE user_id = (?)', [
      'inactive',
      req.params.id
    ]);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const login = async (req, res) => {
  const body = req.body;

  try {
    const [result] = await pool.query("SELECT * FROM users WHERE (email = ? AND status = ?)", [body.email, 'active']);
    if (result.length === 0)
      return res.status(404).json({
        success: 0,
        data: "Invalid email",
      })
    const comp = compareSync(body.password, result[0].password);
    if (comp) {
      const jsontoken = sign({ comp: result[0] }, "qwe1234", {
        expiresIn: "390h",
      });
      return res.json({
        success: 1,
        message: "login successfully",
        user_id: result[0].user_id,
        username: result[0].username,
        token: jsontoken,
      });
    } else {
      return res.status(404).json({
        success: 0,
        data: "Invalid password",
      });
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });

  }

}

module.exports = {
  createUser,
  getUserByUserId,
  getUsers,
  login,
  updateUsers,
  deleteUser
};


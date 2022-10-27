const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { Users } = require("../models/Users.js");

const createUser = async (req, res) => {
  try {
    const { username, email, status } = req.body;
    const salt = genSaltSync(10);
    let { password } = req.body;
    password = hashSync(password, salt);
    const result = await Users.create({
      username,
      password,
      email,
      status,
    });
    res.json({
      user_id: result.insertId,
      username: username,
      email: email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: 0,
      data: "This account alredy exists",
    });
  }
};

const getUserByUserId = async (req, res) => {
  try {
    const { id } = req.params.id;
    const user = await Users.findAll({
      attributes: ["user_id", "username", "email", "status"],
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["username", "email", "status"],
      where: {
        status: "active",
      },
    });
    res.json(users);
    if (!users) {
      return res.status(404).json({
        message: "Users not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUsers = async (req, res) => {
  try {
    const body = req.body;

    if (body.password) {
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
    }
    const [result] = await Users.update(body, {
      where: {
        user_id: req.params.id,
      },
    });

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params.id;
    const [result] = await Users.update(
      {
        status: "inactive",
      },
      {
        where: {
          id,
        },
      }
    );
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const body = req.body;

  try {
    const body = req.body;
    const result = await Users.findAll({
      where: {
        email: body.email,
        status: "active",
      },
    });
    if (result.length === 0)
      return res.status(404).json({
        success: 0,
        data: "Invalid email",
      });
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
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getUserByUserId,
  getUsers,
  login,
  updateUsers,
  deleteUser,
};

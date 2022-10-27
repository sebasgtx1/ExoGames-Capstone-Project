const { DataTypes } = require("sequelize");
const { sequelize } = require("../controllers/db_conexion.js");

const Users = sequelize.define("users", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(12),
    unique: true,
  },
  email: {
    type: DataTypes.STRING(45),
    unique: true,
  },
  password: {
    type: DataTypes.STRING(500),
  },
  status: {
    type: DataTypes.STRING(45),
    defaultValue: "active",
  },
});

module.exports = {
  Users,
}
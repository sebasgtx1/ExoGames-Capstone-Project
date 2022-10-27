const { DataTypes } = require("sequelize");
const { sequelize } = require("../controllers/db_conexion.js");
const { Users } = require("./Users.js");

const Events = sequelize.define("events", {
  event_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  event_name: {
    type: DataTypes.STRING(256),
  },
  description: {
    type: DataTypes.STRING(500),
  },
  sport: {
    type: DataTypes.STRING(45),
  },
  image: {
    type: DataTypes.TEXT("long"),
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  wins: {
    type: DataTypes.INTEGER,
  },
  losses: {
    type: DataTypes.INTEGER,
  },
  public_status: {
    type: DataTypes.STRING(45),
  },
  status: {
    type: DataTypes.STRING(45),
  },
});

module.exports = {
  Events,
};

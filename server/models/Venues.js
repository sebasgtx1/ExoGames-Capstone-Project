const { DataTypes } = require("sequelize");
const { sequelize } = require("../controllers/db_conexion.js");
const { Users } = require("./Users.js");

const Venues = sequelize.define("venues", {
  venue_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(45),
  },
  description: {
    type: DataTypes.STRING(500),
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  image: {
    type: DataTypes.TEXT("long"),
  },
  public_status: {
    type: DataTypes.STRING(45),
  },
  status: {
    type: DataTypes.STRING(45),
  },
});

module.exports = {
  Venues,
};

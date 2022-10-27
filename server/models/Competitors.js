const { DataTypes } = require("sequelize");
const { sequelize } = require("../controllers/db_conexion.js");
const { Users } = require("./Users.js");

const Competitors = sequelize.define(
  "competitors",
  {
    competitor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING(250),
    },
    sport: {
      type: DataTypes.STRING(45),
    },
    wins: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    losses: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    name: {
      type: DataTypes.STRING(45),
    },
    team_players: {
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
      defaultValue: "active",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  Competitors,
};

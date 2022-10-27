const { DataTypes } = require("sequelize");
const { sequelize } = require("../controllers/db_conexion.js");
const { Competitors } = require("./Competitors.js");
const { Events } = require("./Events.js");

const Matches = sequelize.define("matches", {
  match_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  competitor1_id: {
    type: DataTypes.INTEGER,
  },
  competitor2_id: {
    type: DataTypes.INTEGER,
  },
  event_id: {
    type: DataTypes.INTEGER,
  },
  venue_id: {
    type: DataTypes.INTEGER,
  },
  competitor1_group: {
    type: DataTypes.STRING(45),
    defaultValue: "A",
  },
  competitor2_group: {
    type: DataTypes.STRING(45),
    defaultValue: "B",
  },
  date: {
    type: DataTypes.STRING(45),
  },
  time: {
    type: DataTypes.STRING(45),
  },
});

module.exports = {
  Matches,
};

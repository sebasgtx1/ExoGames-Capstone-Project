const { Competitors } = require("./Competitors");
const { Events } = require("./Events");
const { Matches } = require("./Matches");
const { Venues } = require("./Venues");
const { Users } = require("./Users");

const setAssociations = function () {
  //Venues

  Venues.belongsTo(Users, {
    foreignKey: "user_id",
    sourceKey: "user_id",
  });

  Users.hasMany(Venues, {
    foreignKey: "user_id",
    targetId: "user_id",
  });

  //Competitors
  Competitors.belongsTo(Users, {
    foreignKey: "user_id",
    sourceKey: "user_id",
  });

  Users.hasMany(Competitors, {
    foreignKey: "user_id",
    targetId: "user_id",
  });

  //Events
  Events.belongsTo(Users, {
    foreignKey: "user_id",
    targetId: "user_id",
  });

  Users.hasMany(Events, {
    foreignKey: "user_id",
    sourceKey: "user_id",
  });

  //Matches

  Competitors.hasMany(Matches, {
    foreignKey: "competitor1_id",
    sourceKey: "competitor_id",
  });

  Competitors.hasMany(Matches, {
    foreignKey: "competitor2_id",
    sourceKey: "competitor_id",
  });

  Matches.hasMany(Competitors, {
    foreignKey: "competitor_id",
    sourceKey: "competitor1_id",
  });

  Matches.hasMany(Competitors, {
    foreignKey: "competitor_id",
    sourceKey: "competitor2_id",
  });

  Events.hasMany(Matches, {
    foreignKey: "event_id",
    sourceKey: "event_id",
  });

  Matches.belongsTo(Events, {
    foreignKey: "event_id",
    targetId: "event_id",
  });
};

module.exports = setAssociations;

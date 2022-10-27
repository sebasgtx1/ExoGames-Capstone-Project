const Sequelize = require("sequelize");

const sequelize = new Sequelize("defaultdb", "doadmin", "AVNS_Iux7HlByaV2ih-VMiav", {
  host: "db-mysql-nyc1-61838-do-user-12661680-0.b.db.ondigitalocean.com",
  port: "25060",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

module.exports = {
  sequelize,
};
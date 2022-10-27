const express = require('express');
const cors = require('cors');
const path = require('path');
const userRouter = require('./routes/user.routes');
const { sequelize } = require("./controllers/db_conexion");
const relations = require("./models/relations");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(require('./routes/events.routes'));
app.use(require('./routes/competitors.routes'));
app.use(require('./routes/matches.routes'));
app.use(require('./routes/venues.routes'));
app.use(require('./routes/user.routes'));
app.use(require("./routes/upload.routes"));


async function main() {
  try {
    relations();
    await sequelize.authenticate();
    app.listen("4000", "0.0.0.0", () => {
      console.log("server is listening on 4000 port");
    });
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}
main();

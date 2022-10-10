const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/events.routes'));
app.use(require('./routes/competitors.routes'));
app.use(require('./routes/matches.routes'));
app.use(require('./routes/venues.routes'));

app.listen(4000);
console.log('Server on port', 4000);
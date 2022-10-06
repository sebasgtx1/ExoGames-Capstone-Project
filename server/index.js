const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/controllers/public')));

// Routes
app.use(require('./routes/routes'));

app.listen(4000);
console.log('Server on port', 4000);
const express = require('express');
const path = require('path');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/controllers/public')));

// Routes
app.use(require('./routes/routes'));

app.listen(3000);
console.log('Server on port', 3000);
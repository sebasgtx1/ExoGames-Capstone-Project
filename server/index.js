const express = require('express');
const cors = require('cors');
const path = require('path');
/* To jtw */
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express();

/* Motor de plantillas */
app.set('view engine', 'ejs');

/* Setear carpeta public para archivos estáticos */
app.use(express.static('public'));

// middlewares
app.use(cors());
/* Extended true para procesar datos enviados desde forms*/
app.use(express.urlencoded({extended: false}));
app.use(express.json());


/* Set variables de entorno */
dotenv.config({path: './env/.env'});

/* Para usar las cookies */
/* app.use(cookieParser()); */

/* Index JWT */
/* Llamar router */
app.use('/jwt', require('./routes/router'));



// Routes
app.use(require('./routes/events.routes'));
app.use(require('./routes/competitors.routes'));
app.use(require('./routes/matches.routes'));
app.use(require('./routes/venues.routes'));

/* Routes to jwt */


app.listen(4000);
console.log('Server on port', 4000);
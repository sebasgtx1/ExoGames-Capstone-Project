const express = require('express');
const cors = require('cors');
const path = require('path');
const userRouter = require('./routes/user.routes');

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
app.use(require('./routes/user.routes'));

app.listen('4000','0.0.0.0',()=>{
    console.log("server is listening on 4000 port");
})

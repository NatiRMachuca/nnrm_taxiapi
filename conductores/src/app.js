const express = require('express');
const app = express();
const router = require('./routes');


app.use('/conductores', router);

module.exports =app;
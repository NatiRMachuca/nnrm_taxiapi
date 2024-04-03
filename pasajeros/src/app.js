const express = require('express');
const app = express();
const router = require('./routes');

app.use(express.json());
app.use('/pasajeros', router);

module.exports =app;
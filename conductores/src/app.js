const express = require('express');
const app = express();
const router = require('./routes');

app.use(express.json());
app.use('/conductores', router);

module.exports =app;
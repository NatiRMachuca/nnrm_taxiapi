
const express = require('express');
const app = express();
const router = require('./routes');

const mongoose = require('mongoose');
require('./bus');
require('dotenv').config();
const appid = process.env.APPID;
//const app = require('./app');

app.use(express.json());

mongoose
  .connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
           {useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected - conductores'))
  .catch(err => console.log(err));

app.use('/conductores', router);

app.listen(appid, () => console.info(`${appid} is listening on ${appid}`));


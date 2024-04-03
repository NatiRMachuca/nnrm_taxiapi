const express = require('express');
const app = express();
const router = require('./routes');
const mongoose = require('mongoose');
require('dotenv').config();
const appid = process.env.APPID;
require('./bus');

app.use(express.json());

mongoose
  .connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, 
          { useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected - pasajeros'))
  .catch(err => console.log(err));

app.use('/pasajeros', router);

app.listen(appid, () => console.info(`${appid} is listening on ${appid}`));
const app = require('./app');
require('dotenv').config();
const mongoose = require('mongoose');
const appid = process.env.APPID;


console.log(process.env.MONGO_HOST);
mongoose
  .connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`)
  .then(() => console.log('MongoDB Connected - viajes'))
  .catch(err => console.log(err));

const server=app.listen(appid, () => console.info(`${appid} is listening on ${appid}`));

module.exports=server;
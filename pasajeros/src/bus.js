const nats = require('node-nats-streaming');
const { randomBytes } = require('crypto');
const Conductor = require('./schemas/conductores');

const stan = nats.connect('nats_example', 'buscador_conductores' + randomBytes(6).toString('hex'), {
  url: `http://${process.env.NATS_HOST}:${process.env.NATS_PORT}`
});

stan.on('connect', async () => {
  console.log('estoy en pasajeros y me voy a suscribir a  conductores');

  stan.subscribe('conductores:get').on('message', msg => {
    console.log(msg.getData());
    const data = JSON.parse(msg.getData());
    console.log("mando esta data",data);
    if (data) Conductor.create(data);
  });
});

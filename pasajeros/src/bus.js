const nats = require('node-nats-streaming');
const { randomBytes } = require('crypto');


const stan = nats.connect('nats_example', 'buscador_conductores' + randomBytes(6).toString('hex'), {
  url: `http://${process.env.NATS_HOST}:${process.env.NATS_PORT}`
});

stan.on('connect', async () => {
  console.log('estoy en pasajeros y me voy a suscribir a  conductores');

});

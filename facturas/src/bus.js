const nats = require('node-nats-streaming');
const { randomBytes } = require('crypto');
const Factura = require('./model');

const stan = nats.connect('nats_example', 'buscador_client' + randomBytes(6).toString('hex'), {
  url: `http://${process.env.NATS_HOST}:${process.env.NATS_PORT}`
});

stan.on('connect', async () => {
  //suscribe
  stan.subscribe('facturas:crear').on('message',async (msg) => {
    const data = JSON.parse(msg.getData());

    if (data) {
      const item =await Factura.create(data);
      console.log(item);
    }
  });

  
});

module.exports = stan;
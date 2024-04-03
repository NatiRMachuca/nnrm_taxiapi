const nats = require('node-nats-streaming');
const { randomBytes } = require('crypto');
const Conductor = require('./model');

const stan = nats.connect('nats_example', 'buscador_client' + randomBytes(6).toString('hex'), {
  url: `http://${process.env.NATS_HOST}:${process.env.NATS_PORT}`
});

stan.on('connect', async () => {
  console.log('connected bus conductores to NATS');
  //suscribe
  stan.subscribe('conductores:updateOcupado').on('message',async (msg) => {
    const data = JSON.parse(msg.getData());
    console.log("data en event bus updateOcupado :",data);

    if (data) {
      const id = data.id;
      const updatedData = {"estatus": "Ocupado"};
      const options = { new: true }
      const item =await Conductor.findByIdAndUpdate(id,updatedData,options);
      console.log(item);
    }
  });

  stan.subscribe('conductores:updateDisponible').on('message',async (msg) => {
    const data = JSON.parse(msg.getData());
    console.log("data en event bus updateDisponible :",data);

    if (data) {
      const id = data.id;
      const updatedData = {"estatus": "Disponible"};
      const options = { new: true }
      const item =await Conductor.findByIdAndUpdate(id,updatedData,options);
      console.log(item);
    }
  });
  
  
});

module.exports = stan;
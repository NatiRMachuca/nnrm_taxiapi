const { Schema, model } = require('mongoose');

const viajesSchema = Schema(
  {
    pasajero: String,
    conductor: String,
    puntoinicio: JSON,
    puntofinal: JSON,
    estatus: String,
    comentarios: String,
  },
  { versionKey: false }
);

module.exports = model('Viaje', viajesSchema);
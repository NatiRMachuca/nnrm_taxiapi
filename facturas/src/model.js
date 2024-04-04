const { Schema, model } = require('mongoose');

const facturasSchema = Schema(
  {
    viaje: String,
    distancia: String,
    precio: String,
    fechaCreacion: Date
  },
  { versionKey: false }
);

module.exports = model('Facturas',facturasSchema);
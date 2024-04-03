const { Schema, model } = require('mongoose');

const pasajerosSchema = Schema(
  {
    nombre: String,
    apellidos: String,
    sexo: String,
    celular: Number,
    correo: String
  },
  { versionKey: false }
);

module.exports = model('Pasajero', pasajerosSchema);
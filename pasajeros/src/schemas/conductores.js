const { Schema, model } = require('mongoose');

const conductoresSchema = Schema(
  {
    nombre: String,
    apellidos: String,
    sexo: String,
    celular: Number,
    correo: String,
    estatus: String,
    latitud: Number,
    longitud: Number
  },
  { versionKey: false }
);

module.exports = model('Conductor', conductoresSchema);
const { Schema, model } = require('mongoose');

const conductoresSchema = Schema(
  {
    nombre: String,
    apellidos: String,
    sexo: String,
    celular: Number,
    correo: String,
    estatus: String,
    ubicacion: {
      type: { type: String },
      coordinates: []
    },
  },
  { versionKey: false }
);

conductoresSchema.index({ ubicacion: "2dsphere" });

module.exports = model('Conductor', conductoresSchema);
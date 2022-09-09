import { Schema, model } from "mongoose";

const consultorioSchema = new Schema(
  {
    // Generales
    no: Number,
    userReg: String,
    userMod: String,
    // Entidad
    edificio: String,
    planta: String,
    descripcion: String,
    responsible: String,
    ultimoPago: Date,
    notas: String,
    numero: String,
    monto: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("consultorio", consultorioSchema);

import { Schema, model } from "mongoose";

const activoSchema = new Schema(
  {
    no: Number,
    busqueda: String,
    categoria: String,
    ubicacion: String,
    departamentoArea: String,
    tipoActivo: String,
    descripcion: String,
    marca: String,
    modelo: String,
    serie: String,
    color: String,
    asignadoA: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("activo", activoSchema);

import { Schema, model } from "mongoose";

const reporteSchema = new Schema(
  {
    no: Number,
    solicitante: String,
    solicitado: String,
    solicitadoAll: [String],
    description: String,
    detalles: String,
    type: String,
    status: String,
    userReg: String,
    userMod: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("reporte", reporteSchema);

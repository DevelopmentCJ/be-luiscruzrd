import { Schema, model } from "mongoose";

const usuarioSchema = new Schema(
  {
    no: Number,
    email: {
      unique: true,
      type: String,
    },
    cedula: {
      unique: true,
      type: String,
    },
    password: String,
    role: String,
    nombre: String,
    apellido: String,
    telefono: String,
    provincia: String,
    sector: String,
    quiero: String,
    grupo: String,
    puedeVer: [String],
    estatus: [String],
    aseguradoras: [String],
    defaultStatus: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("usuario", usuarioSchema);

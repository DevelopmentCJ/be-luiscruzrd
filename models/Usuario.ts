import { Schema, model } from "mongoose";

const usuarioSchema = new Schema(
  {
    no: Number,
    email: {
      unique: true,
      type: String,
    },
    password: String,
    role: String,
    nombre: String,
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

import { Schema, model } from "mongoose";

const medicoSchema = new Schema(
  {
    // Generales
    no: Number,
    // Entidad
    edificio: String,
    consultorio: String,
    medico: String,
    especialidad: String,
    diasConsulta: String,
    horario: String,
    telefono: String,
    secretaria: String,
    precios: String,
    telSecretaria: String,
    telConsultorio: String,
    procedimientos: String,
    preciosPrivado: String,
    preciosDiferencia: String,
    preciosProcedimientos: String,
    notas: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("medico", medicoSchema);

import { Schema, model } from "mongoose";

const facturaSchema = new Schema(
  {
    idfact: {
      type:String,
      unique: true
    },
    no: Number,
    id_ars: String,
    nom: String,
    nro_autorizacion_salida: String,
    fecha: Date,
    numero_afiliado: String,
    rnc: String,
    tipo_factura: String,
    cobertura: Number,
    total_empleado: Number,
    status: String,
    actividad: [Object]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("factura", facturaSchema);

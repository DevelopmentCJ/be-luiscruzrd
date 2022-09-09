import { Schema, model } from "mongoose";

const productoSchema = new Schema(
  {
    // Generales
    no: Number,
    userReg: String,
    userMod: String,
    // Entidad
    fecha: Date,
    division: String,
    lineaGrupo: String,
    codigo: String,
    present: String,
    desc: String,
    ref: String,
    vence: Date,
    mesVenc: Number,
    anoVenc: Number,
    lote: String,
    barcode: String,
    farmaco: String,
    fab: String,
    supdr: String,
    regInd: String,
    regSan: String,
    precVenta: Number,
    precCaja: Number,
    itbis: Number,
    costoUnit: Number,
    costCaja: Number,
    solPor: String,
    autPor: String,
    almacn: String,
    subAlmacn: String,
    cant: Number,
    uniMed: String,
    equiv: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("producto", productoSchema);

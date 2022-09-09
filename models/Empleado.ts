import { Schema, model } from "mongoose";

const empleadoSchema = new Schema(
  {
    // Generales
    no: Number,
    userReg: String,
    userMod: String,
    // Entidad
    nomb: String,
    nacio: String,
    apell: String,
    telef: String,
    pass: String,
    cedu: String,
    sex: String,
    stat: String,
    emp: String,
    puest: String,
    ars: String,
    suc: String,
    otrsIngs: String,
    finVac: Date,
    iniVac: Date,
    noDepe: Number,
    turn: String,
    cod: String,
    dpto: String,
    fechaNac: Date,
    fechaCont: Date,
    salario: Number,
    cuenta: String,
    edad: Number,
    acciones: [Object],
    notas: String,
    supervisor: String,
    direccion: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("empleado", empleadoSchema);

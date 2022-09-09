import { Schema, model } from "mongoose";

const mejoraSchema = new Schema(
  {
    no: Number,
    order: Number,
    title: String,
    description: String,
    type: String,
    userReg: String,
    userMod: String,
    estatus: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("mejora", mejoraSchema);

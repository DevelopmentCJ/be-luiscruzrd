import { Schema, model } from "mongoose";

const areaSchema = new Schema(
  {
    no: Number,
    superior: Number,
    description: String,
    type: String,
    userReg: String,
    userMod: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("area", areaSchema);

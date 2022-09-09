const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

export const startConnection = async (): Promise<void> => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database");
  } catch (error) {
    console.error(error);
  }
};

import app from "./app";
import { startConnection } from "./db";
const dotenv = require("dotenv").config();

startConnection();

const port = process.env.PORT;
app.listen(port);
console.log("Server on port", port);

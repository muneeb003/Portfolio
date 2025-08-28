import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connection } from "./db/connection.js";
import routes from "../backend/routes/routes.js";
dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());

app.use("/api", routes);

const port = process.env.PORT;
app.listen(port, () => {
  connection(), console.log("Connected to Backend at ", port);
});

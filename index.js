import express from "express";
import userRouter from "./src/modules/User/user.routes.js";
import db_connection from "./DB/connection.js";
import { config } from "dotenv";
import { globalResponse } from "./src/middlewares/globalResponse.js";
config({ path: "./config/dev.config.env" });

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/uploads", express.static("src/uploads"))
app.use("/user", userRouter);

app.use(globalResponse);

db_connection();

app.listen(port, () => console.log("server is life"));
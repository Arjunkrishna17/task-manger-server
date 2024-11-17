import express from "express";
import cors from "cors";

import StartDb from "./Utils/StartDb";
import authRoutes from "./Routes/AuthRoutes";

const app = express();

app.use(cors());

StartDb();

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(8080, () => {
  console.log("listening");
});

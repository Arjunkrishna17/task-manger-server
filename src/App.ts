import express from "express";
import cors from "cors";

import StartDb from "./Utils/StartDb";
import authRoutes from "./Routes/AuthRoutes";
import taskRoutes from "./Routes/TaskRoutes";

const app = express();

app.use(cors());

StartDb();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.listen(8080, () => {
  console.info("listening at 8080");
});

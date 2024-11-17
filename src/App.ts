import express from "express";
import cors from "cors";

import StartDb from "./Utils/StartDb";
import authRoutes from "./Routes/AuthRoutes";
import taskRoutes from "./Routes/TaskRoutes";

const app = express();

app.use(cors());

StartDb();

app.use(express.json());

app.use("/health", (req, res, next) => {
  // Helps Aws to keep the server running
  res.status(200).end();
});
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.listen(8080, () => {
  console.info("listening at 8080");
});

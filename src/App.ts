import express from "express";
import cors from "cors";

import StartDb from "./Utils/StartDb";
import authRoutes from "./Routes/AuthRoutes";
import taskRoutes from "./Routes/TaskRoutes";
import { googleAuthController } from "./Controllers/Auth";
import errorHandler from "./Middlewares/ErrorHandler";
import userRoutes from "./Routes/UserRoutes";
import collectionRouter from "./Routes/CollectionRoutes";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

StartDb();

app.use(express.json());

app.use("/health", (req, res, next) => {
  // Helps Aws to keep the server running
  res.status(200).end();
});
app.post("/api/auth/google", googleAuthController);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/collections", collectionRouter);

app.use(errorHandler);

app.listen(8080, () => {
  console.info("listening at 8080");
});

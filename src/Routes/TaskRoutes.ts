import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  getSingleTaskController,
  updateTaskController,
} from "../Controllers/Tasks";
import { TokenValidator } from "../Middlewares/TokenValidator";

const taskRoutes = Router();

taskRoutes.get("", TokenValidator, getAllTasksController);
taskRoutes.post("", TokenValidator, createTaskController);
taskRoutes.get("/:taskId", TokenValidator, getSingleTaskController);
taskRoutes.put("/:taskId", TokenValidator, updateTaskController);
taskRoutes.delete("/:taskId", TokenValidator, deleteTaskController);

export default taskRoutes;

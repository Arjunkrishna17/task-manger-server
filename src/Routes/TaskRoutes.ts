import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  getSingleTaskController,
  updateTaskController,
  updateTaskSortOrderController,
} from "../Controllers/Tasks";
import { TokenValidator } from "../Middlewares/TokenValidator";
import { createTaskValidator } from "../Middlewares/Validations/TaskValidator";
import {
  updateTaskValidate,
  validateGetAllTasks,
} from "../Middlewares/Validations/updateTaskValidator";

const taskRoutes = Router();

taskRoutes.get("", TokenValidator, validateGetAllTasks, getAllTasksController);
taskRoutes.post("", TokenValidator, createTaskValidator, createTaskController);
taskRoutes.get("/:taskId", TokenValidator, getSingleTaskController);
taskRoutes.put(
  "/:taskId",
  TokenValidator,
  updateTaskValidate,
  updateTaskController
);
taskRoutes.put("", TokenValidator, updateTaskSortOrderController);
taskRoutes.delete("/:taskId", TokenValidator, deleteTaskController);

export default taskRoutes;

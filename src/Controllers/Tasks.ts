import { asyncHandler } from "./../Utils/AsyncHandler";
import { RequestHandler } from "express";

import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getSingleTaskService,
  updateTaskService,
  updateTaskSortOrderService,
} from "../Services/TaskService";

export const getAllTasksController: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = res.locals.userId;
    const { search, sortOrder } = req.query;

    const tasks = await getAllTasksService(
      userId,
      search as string,
      (sortOrder || "none") as "asc" | "desc" | "none"
    );

    res.status(200).json(tasks);
  }
);

export const getSingleTaskController: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = res.locals.userId;
    const taskId = req.params.taskId;

    const task = await getSingleTaskService(taskId, userId);

    res.status(200).json(task);
  }
);

export const createTaskController: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = res.locals.userId;
    const taskInfo = req.body;

    await createTaskService(taskInfo, userId);

    res.status(200).json("Task created successfully");
  }
);

export const deleteTaskController: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = res.locals.userId;
    const taskId = req.params.taskId;

    await deleteTaskService(taskId, userId);

    res.status(200).json("Task deleted successfully");
  }
);

export const updateTaskController: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = res.locals.userId;
    const task = req.body;

    await updateTaskService(task, userId);

    res.status(200).json("Task status updated successfully");
  }
);

export const updateTaskSortOrderController: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = res.locals.userId;
    const tasks = req.body;

    await updateTaskSortOrderService(tasks, userId);

    res.status(200).json("Tasks updated successfully");
  }
);

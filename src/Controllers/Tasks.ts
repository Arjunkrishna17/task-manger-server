import { asyncHandler } from "./../Utils/AsyncHandler";
import { RequestHandler } from "express";

import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getSingleTaskService,
  updateTaskService,
} from "../Services/TaskService";

export const getAllTasksController: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = res.locals.userId;
    const { search, sortOrder } = req.query;

    const tasks = await getAllTasksService(
      userId,
      search as string,
      (sortOrder || "asc") as "asc" | "desc"
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

    res.status(200).json("Task updated successfully");
  }
);

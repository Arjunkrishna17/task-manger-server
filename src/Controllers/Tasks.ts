import { RequestHandler } from "express";

import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getSingleTaskService,
  updateTaskService,
} from "../Services/TaskService";

export const getAllTasksController: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.userId;

    const tasks = await getAllTasksService(userId);

    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json(`Something went wrong: ${error.message}`);
  }
};

export const getSingleTaskController: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const userId = res.locals.userId;
    const taskId = req.params.taskId;

    const task = await getSingleTaskService(taskId, userId);

    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json(`Something went wrong: ${error.message}`);
  }
};

export const createTaskController: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const taskInfo = req.body;

    await createTaskService(taskInfo, userId);

    res.status(200);
  } catch (error: any) {
    res.status(500).json(`Something went wrong: ${error.message}`);
  }
};

export const deleteTaskController: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const taskId = req.params.taskId;

    await deleteTaskService(taskId, userId);

    res.status(200);
  } catch (error: any) {
    res.status(500).json(`Something went wrong: ${error.message}`);
  }
};

export const updateTaskController: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const task = req.body;

    await updateTaskService(task, userId);

    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json(`Something went wrong: ${error.message}`);
  }
};

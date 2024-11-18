import { v4 as uuidv4 } from "uuid";

import {
  createTaskDAL,
  deleteTaskDAL,
  getAllTaskDAL,
  getSingleTaskDAL,
  updateTaskDAL,
} from "../DataAccessLayer/TaskDAL";
import { task } from "../Types/task";

export const getAllTasksService = async (
  userId: string,
  searchTerm?: string,
  sortOrder?: "asc" | "desc"
) => {
  const tasks = await getAllTaskDAL(userId, searchTerm, sortOrder);

  return tasks;
};

export const getSingleTaskService = async (taskId: string, userId: string) => {
  const task = await getSingleTaskDAL(taskId, userId);

  return task;
};

export const createTaskService = async (task: task, userId: string) => {
  const uniqueId = uuidv4();

  const taskDetails = { ...task, user_id: userId, task_id: uniqueId };

  await createTaskDAL(taskDetails);
};

export const updateTaskService = async (task: task, userId: string) => {
  await updateTaskDAL(task, userId);
};

export const deleteTaskService = async (taskId: string, userId: string) => {
  await deleteTaskDAL(taskId, userId);
};

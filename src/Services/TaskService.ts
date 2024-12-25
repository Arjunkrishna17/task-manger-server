import { v4 as uuidv4 } from "uuid";

import {
  createTaskDAL,
  deleteTaskDAL,
  getAllTaskDAL,
  getSingleTaskDAL,
  updateTaskDAL,
  updateTaskSortOrderDAL,
} from "../DataAccessLayer/TaskDAL";
import { task } from "../Types/task";

export const getAllTasksService = async (
  userId: string,
  collectionId: string,
  searchTerm?: string,
  sortOrder?: "asc" | "desc" | "none",
  priority?: string
) => {
  const tasks = await getAllTaskDAL(
    userId,
    collectionId,
    searchTerm,
    sortOrder === "none" ? "asc" : sortOrder,
    sortOrder === "none" ? "sortOrder" : "createdAt",
    priority
  );

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

export const updateTaskSortOrderService = async (
  tasks: task[],
  userId: string
) => {
  await updateTaskSortOrderDAL(tasks, userId);
};

export const deleteTaskService = async (taskId: string, userId: string) => {
  await deleteTaskDAL(taskId, userId);
};

import Task from "../Models/Tasks";
import { task } from "../Types/task";

export const getAllTaskDAL = async (
  userId: string,
  searchTerm?: string,
  sortOrder: "asc" | "desc" = "asc",
  sortField: string = "createdAt"
) => {
  let query: any = { user_id: userId };

  // Add the search filter if a searchTerm is provided
  if (searchTerm) {
    query = {
      ...query,
      title: { $regex: searchTerm, $options: "i" },
    };
  }

  // Add sorting by a dynamic field (sortField and sortOrder)
  const sortOptions: any = {};
  sortOptions[sortField] = sortOrder === "asc" ? 1 : -1; // 1 for ascending, -1 for descending

  const response = await Task.find(query).sort(sortOptions);

  return response;
};

export const getSingleTaskDAL = async (taskId: string, userId: string) => {
  const response = await Task.find({ task_id: taskId, user_id: userId });

  return response;
};

export const deleteTaskDAL = async (taskId: string, userId: string) => {
  await Task.findOneAndDelete({ user_id: userId, task_id: taskId });
};

export const updateTaskDAL = async (task: task, userId: string) => {
  const replacedDoc = await Task.findOneAndReplace(
    { user_id: userId, task_id: task.task_id },
    task,
    { new: true }
  );

  if (replacedDoc) {
    console.log("Document replaced:", replacedDoc);
  } else {
    console.log("No document found with the specified taskId and userId.");
  }
};

export const createTaskDAL = async (task: task) => {
  const response = await Task.create(task);
};

import Task from "../Models/Tasks";
import { task } from "../Types/task";
import { InternalServerError } from "../Utils/Error";

export const getAllTaskDAL = async (
  userId: string,
  searchTerm?: string,
  sortOrder: "asc" | "desc" = "asc",
  sortField: string = "createdAt"
) => {
  try {
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
  } catch (error) {
    console.error("Error in getAllTaskDAL:", error);
    throw new InternalServerError("Unable to retrieve tasks.");
  }
};

export const getSingleTaskDAL = async (taskId: string, userId: string) => {
  try {
    const response = await Task.find({ task_id: taskId, user_id: userId });

    return response;
  } catch (error) {
    console.error("Error in getSingleTaskDAL:", error);
    throw new InternalServerError("Error fetching the task.");
  }
};

export const deleteTaskDAL = async (taskId: string, userId: string) => {
  try {
    await Task.findOneAndDelete({ user_id: userId, task_id: taskId });
  } catch (error) {
    console.error("Error in deleteTaskDAL:", error);
    throw new InternalServerError("Error in deleting the task.");
  }
};

export const updateTaskDAL = async (task: task, userId: string) => {
  try {
    const replacedDoc = await Task.findOneAndReplace(
      { user_id: userId, task_id: task.task_id },
      task,
      { new: true }
    );

    return replacedDoc;
  } catch (error) {
    console.error("Error in updateTaskDAL:", error);
    throw new InternalServerError("Error updating the task.");
  }
};

export const createTaskDAL = async (task: task) => {
  try {
    const response = await Task.create(task);
  } catch (error) {
    console.error("Error in createTaskDAL:", error);
    throw new InternalServerError("Error creating the task.");
  }
};

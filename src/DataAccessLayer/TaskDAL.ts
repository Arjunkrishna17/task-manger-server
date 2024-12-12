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

    const order = sortOrder === "asc" ? 1 : -1;

    const sortOptions: any = {};
    sortOptions[sortField] = order; // 1 for ascending, -1 for descending

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

export const updateTaskSortOrderDAL = async (tasks: task[], userId: string) => {
  try {
    // Create bulk operations
    const bulkOps = tasks.map(
      (task: { task_id: string; sortOrder: number; status: string }) => ({
        updateOne: {
          filter: { task_id: task.task_id, user_id: userId },
          update: { sortOrder: task.sortOrder, status: task.status },
        },
      })
    );

    // Execute bulkWrite
    await Task.bulkWrite(bulkOps);
  } catch (error) {
    console.error("Error in updating the updateTaskSortOrderDAL:", error);
    throw new InternalServerError("Error creating the task.");
  }
};

export const getAllTasksByCollectionId = async (
  collectionId: string,
  userId: string
) => {
  try {
    const tasks = await Task.find({
      user_id: userId,
      collection_id: collectionId,
    });

    return tasks;
  } catch (error) {
    console.error("Error in get tasks using collectionId in db:", error);
    throw new InternalServerError("Failed to get Tasks.");
  }
};

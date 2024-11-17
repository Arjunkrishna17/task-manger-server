// models/Task.ts
import mongoose, { Schema } from "mongoose";
import { taskDoc } from "../Types/task";

// Create the Task schema
const TaskSchema: Schema = new Schema(
  {
    task_id: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    assigned_to: {
      type: {
        id: {
          type: Schema.Types.ObjectId,
          ref: "User", // Reference to the User model
          required: true, // This is required, a task must have an assigned user
        },
        name: {
          type: String,
          required: true,
        },
        avatar_url: {
          type: String,
          required: true,
        },
      },
      required: false, // This field is optional initially
    },
    status: {
      type: String,
      required: true,
      enum: ["To Do", "In Progress", "Done"], // Possible task statuses
    },
    user_id: {
      type: String,
      ref: "User", // Reference to the User model
      required: true, // Each task must be assigned to a user
    },

    due_date: {
      type: Date,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
  },
  {
    timestamps: true, // Automatically handle created_at and updated_at
  }
);

const Task = mongoose.model<taskDoc>("Task", TaskSchema);

export default Task;

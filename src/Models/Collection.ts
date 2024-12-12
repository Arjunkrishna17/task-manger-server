import mongoose, { Schema } from "mongoose";

const collectionSchema: Schema = new Schema(
  {
    collection_id: {
      type: "string",
      required: true,
      unique: true,
    },
    user_id: { type: "string", required: true },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    columns: {
      type: [String], // Array of column names as strings
      default: ["To Do", "In Progress", "Done"], // Default columns
    },
  },
  {
    timestamps: true, // Automatically handle created_at and updated_at
  }
);

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;

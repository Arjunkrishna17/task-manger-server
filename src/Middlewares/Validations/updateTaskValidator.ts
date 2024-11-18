// Middlewares/validateTask.ts
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Validation for Task creation and updating
export const updateTaskValidate: any = [
  // Title should be a non-empty string
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title is required"),

  // Description should be a string (optional)
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  // Status should be one of the allowed values: "To Do", "In Progress", or "Done"
  body("status")
    .isIn(["To Do", "In Progress", "Done"])
    .withMessage("Status must be one of 'To Do', 'In Progress', or 'Done'"),

  // Priority should be one of the allowed values: "Low", "Medium", or "High"
  body("priority")
    .optional()
    .isIn(["Low", "Medium", "High"])
    .withMessage("Priority must be one of 'Low', 'Medium', or 'High'"),

  // User ID should be a valid MongoDB ObjectId (as you're referencing a User model)
  body("user_id").notEmpty().withMessage("User ID must be a valid ObjectId"),

  // Assigned to (if provided) should be an object with valid fields
  body("assigned_to")
    .optional()
    .isObject()
    .withMessage("Assigned to must be an object")
    .custom((value) => {
      if (value && (!value.id || !value.name || !value.avatar_url)) {
        throw new Error(
          "Assigned to must contain 'id', 'name', and 'avatar_url'"
        );
      }
      return true;
    }),

  // Due date should be a valid date (optional)
  body("due_date")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date"),

  // Custom validation for errors
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => err.msg),
      });
    }
    next();
  },
];

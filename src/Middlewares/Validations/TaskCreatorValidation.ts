// Middlewares/validateTask.ts
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Validation for Task creation and updating (Title, Description, Status)
export const createTaskValidator: any = [
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

import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const signInValidation: any = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 6 characters long"),

  // Handle validation result and send error response if validation fails
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

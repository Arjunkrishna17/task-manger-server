import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const ResetPasswordValidation: any = [
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),

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

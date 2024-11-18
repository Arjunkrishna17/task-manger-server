import { Request, Response, NextFunction } from "express";
import { AppError } from "../Utils/Error";

const errorHandler: any = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later.",
  });
};

export default errorHandler;

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, 500);
  }
}

export class InvalidTokenError extends AppError {
  constructor(message: string = "Invalid Token") {
    super(message, 400); // 400 for client-side errors like bad request
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = "Internal server error.") {
    super(message, 500); // 500 for server error
  }
}

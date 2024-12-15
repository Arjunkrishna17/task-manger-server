import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

import { asyncHandler } from "./../Utils/AsyncHandler";
import { user } from "../Types/user";
import {
  forgotPasswordService,
  googleAuthService,
  resetPasswordService,
  signinService,
  signupService,
} from "../Services/AuthService";
import { UnauthorizedError, ValidationError } from "../Utils/Error";


export const signupController: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userInfo: user = req.body;

    await signupService(userInfo);

    const token = await signinService(
      userInfo.email,
      userInfo.password as string
    );

    res.status(200).json({ success: true, token });
  }
);

export const signinController: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError("Invalid email or password");
    }

    const token = await signinService(email, password);

    res.status(200).json({ success: true, token: token });
  }
);

export const googleAuthController: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const { token } = req.body;

    const {
      success,
      status,
      message,
    }: { status: number; success: boolean; message: string } =
      await googleAuthService(token);

    if (success) {
      res.status(status).json({ success: success, token: message });
    } else {
      throw new UnauthorizedError(message);
    }
  }
);

export const forgotPassword: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const { email } = req.body;

    await forgotPasswordService(email);

    res.status(200).json("Password reset email sent successfully");
  }
);

export const resetPassword: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const { password, token } = req.body;

    const logInToken = await resetPasswordService(token, password);

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      token: logInToken,
    });
  }
);

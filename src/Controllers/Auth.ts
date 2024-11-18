import { asyncHandler } from "./../Utils/AsyncHandler";
import { RequestHandler } from "express";

import { user } from "../Types/user";
import {
  googleAuthService,
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

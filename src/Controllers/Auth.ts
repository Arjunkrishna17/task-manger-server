import { RequestHandler } from "express";

import { user } from "../Types/user";
import {
  googleAuthService,
  signinService,
  signupService,
} from "../Services/AuthService";

export const signupController: RequestHandler = async (req, res, next) => {
  try {
    const userInfo: user = req.body;

    await signupService(userInfo);

    const token = await signinService(
      userInfo.email,
      userInfo.password as string
    );

    res.status(200).json({ success: true, token });
  } catch (error: any) {
    console.error(error);
    res.status(500).json(`Something went wrong, error:${error.message}`);
  }
};

export const signinController: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await signinService(email, password);

    res.status(200).json({ success: true, token: token });
  } catch (error: any) {
    console.error(error);
    res.status(500).json(`Something went wrong, error:${error.message}`);
  }
};

export const googleAuthController: RequestHandler = async (req, res, next) => {
  try {
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
      res.status(status).json(message);
    }
  } catch (error: any) {
    res.status(500).json(`Something went wrong, error:${error.message}`);
  }
};

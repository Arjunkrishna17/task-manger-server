import { RequestHandler } from "express";

import { user } from "../../Types/user";
import { signinService, signupService } from "../../Services/AuthService";

export const signupController: RequestHandler = async (req, res, next) => {
  try {
    const userInfo: user = req.body;

    await signupService(userInfo);

    res.status(200).json({ success: true });
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

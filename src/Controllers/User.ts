import { RequestHandler } from "express";

import { asyncHandler } from "../Utils/AsyncHandler";
import {
  getUserDetailService,
  updateUserDetailService,
} from "../Services/UserService";

export const getUserDetailsController: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = req.params.userId;

    const userDetails = await getUserDetailService(userId);

    res.status(200).json(userDetails);
  }
);

export const updateUserController: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const userId = req.params.userId;
    const name = req.body.name;

    await updateUserDetailService(userId, name);

    res.status(200).json("Profile updated successfully");
  }
);

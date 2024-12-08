import { Router } from "express";

import { TokenValidator } from "../Middlewares/TokenValidator";
import {
  getUserDetailsController,
  updateUserController,
} from "../Controllers/User";

const userRoutes = Router();

userRoutes.get("/:userId", TokenValidator, getUserDetailsController);
userRoutes.put("/:userId", TokenValidator, updateUserController);

export default userRoutes;

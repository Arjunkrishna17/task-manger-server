import { Router } from "express";
import {
  googleAuthController,
  signinController,
  signupController,
} from "../Controllers/Auth";

const authRoutes = Router();

authRoutes.post("/sign_in", signinController);
authRoutes.post("/sign_up", signupController);

export default authRoutes;

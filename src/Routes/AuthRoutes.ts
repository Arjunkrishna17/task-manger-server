import { Router } from "express";
import { signinController, signupController } from "../Controllers/Auth/Auth";

const authRoutes = Router();

authRoutes.post("/sign_in", signinController);
authRoutes.post("/sign_up", signupController);

export default authRoutes;

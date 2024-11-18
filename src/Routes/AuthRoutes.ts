import { Router } from "express";

import { signinController, signupController } from "../Controllers/Auth";
import { signUpValidation } from "../Middlewares/Validations/SignupValidation";
import { signInValidation } from "../Middlewares/Validations/SignInValidation";

const authRoutes = Router();

authRoutes.post("/sign_in", signInValidation, signinController);
authRoutes.post("/sign_up", signUpValidation, signupController);

export default authRoutes;

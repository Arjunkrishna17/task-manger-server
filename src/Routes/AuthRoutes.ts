import { Router } from "express";

import {
  forgotPassword,
  resetPassword,
  signinController,
  signupController,
} from "../Controllers/Auth";
import { signUpValidation } from "../Middlewares/Validations/SignupValidation";
import { signInValidation } from "../Middlewares/Validations/SignInValidation";
import { ResetPasswordValidation } from "../Middlewares/Validations/ResetPassword";

const authRoutes = Router();

authRoutes.post("/sign_in", signInValidation, signinController);
authRoutes.post("/sign_up", signUpValidation, signupController);
authRoutes.post("/forgot-password", forgotPassword);
authRoutes.post("/reset-password", ResetPasswordValidation, resetPassword);

export default authRoutes;

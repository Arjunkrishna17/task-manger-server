import { Router } from "express";

import { TokenValidator } from "../Middlewares/TokenValidator";
import { getUserDetailsController } from "../Controllers/User";

const userRoutes = Router();

userRoutes.get("/:userId", TokenValidator, getUserDetailsController);

export default userRoutes;

import express from "express";
import { registerUser, verifyUser } from "../controllers/auth.controllers.js";
import validate from "../middlewares/validate.js";
import { registerUserSchema } from "../validators/user.validation.js";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerUser);
router.post("/verify/:token", verifyUser);

export default router;

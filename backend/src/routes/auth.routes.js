import express from "express";
import { registerUser } from "../controllers/auth.controllers.js";
import validate from "../middlewares/validate.js";
import { registerUserSchema } from "../validators/user.validation.js";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerUser);

export default router;

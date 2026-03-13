import express from "express";
import {
  loginUser,
  registerUser,
  verifyUser,
} from "../controllers/auth.controllers.js";
import {
  loginUserSchema,
  registerUserSchema,
} from "../validators/user.validation.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerUser);
router.post("/verify/:token", verifyUser);
router.post("/login", validate(loginUserSchema), loginUser);

export default router;

import asyncHandler from "../utils/asyncHandler.js";
import createHttpError from "http-errors";
import redisClient from "../config/redis.js";
import { User } from "../routes/auth.routes.js";
import bcrypt from "bcryptjs";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.validatedData;

  if (!name || !email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  //ip+email rate limiting
  const rateLimitKey = `register-rate-limit:${req.ip}:${email}`;
  if (await redisClient.get(rateLimitKey)) {
    return next(
      createHttpError(429, "Too many requets. Please try again later"),
    );
  }

  //check existing user in database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(createHttpError(400, "User already exists"));
  }

  //password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: { name, email, password },
  });
});

import asyncHandler from "../utils/asyncHandler.js";
import createHttpError from "http-errors";
import redisClient from "../config/redis.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.validatedData;

  if (!name || !email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  const rateLimitKey = `register-rate-limit:${req.ip}:${email}`;
  if (await redisClient.get(rateLimitKey)) {
    return next(
      createHttpError(429, "Too many requets. Please try again later"),
    );
  }
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: { name, email, password },
  });
});

import asyncHandler from "../utils/asyncHandler.js";
import { registerUserSchema } from "../validators/user.validation.js";
import sanitize from "mongo-sanitize";
import createHttpError from "http-errors";
import ApiResponse from "../utils/ApiResponse.js";
import redisClient from "../config/redis.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";

export const registerUser = asyncHandler(async (req, res, next) => {
  const sanitizedBody = sanitize(req.body);
  const validation = registerUserSchema.safeParse(sanitizedBody);

  if (!validation.success) {
    const zodError = validation.error;
    let firstErrorMessage = "Validation failed";
    let allErrors = [];

    if (zodError?.issues && Array.isArray(zodError.issues)) {
      allErrors = zodError.issues.map((issue) => ({
        field: issue.path ? issue.path.join(".") : "unkown",
        message: issue.message || "Validation Error",
        code: issue.code,
      }));

      firstErrorMessage = allErrors[0]?.message || "Validation Error";
    }

    return res.status(400).json({
      success: false,
      message: firstErrorMessage,
      errors: allErrors,
    });
  }

  const { name, email, password } = validation.data;

  //generate unique rate limit key for combine ip and email
  const rateLimitKey = `register-rate-limit:${req.ip}:${email}`;

  //fetch current request count
  if (await redisClient.get(rateLimitKey)) {
    return res.status(429).json({
      success: false,
      message: "Too many requests, try again later",
    });
  }

  //check existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(createHttpError(400, "User already exists"));
  }

  //passsword hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  //generate verify token
  const verifyToken = crypto.randomBytes(32).toString("hex");

  //generate verify key
  const verifyKey = `verify:${verifyToken}`;

  //data to store in redis
  const dataToStore = JSON.stringify({
    name,
    email,
    password: hashedPassword,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, { name, email }, "User Register successfully"));
});

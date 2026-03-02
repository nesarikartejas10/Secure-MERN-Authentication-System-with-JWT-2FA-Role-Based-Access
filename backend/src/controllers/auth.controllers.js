import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { registerUserService } from "../services/auth.service.js";
import { ApiError } from "../utils/ApiError.js";
import redisClient from "../config/redis.js";
import { User } from "../models/user.model.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email } = await registerUserService(req.validatedData, req.ip);
  console.log(name, email);
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { name, email },
        "If your email is valid, a verification link has been sent to your email. It will expire in 5 minutes",
      ),
    );
});

export const verifyUser = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    throw new ApiError(400, "Verification token is required");
  }

  //find verify key in redis
  const verifyKey = `verify:${token}`;
  const userData = await redisClient.get(verifyKey);

  if (!userData) {
    throw new ApiError(400, "Verification link is expired");
  }

  //delete user data from redis
  await redisClient.del(verifyKey);

  const user = JSON.parse(userData);

  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  //create user
  const newUser = await User.create({
    name: user.name,
    email: user.email,
    password: user.password,
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { id: newUser._id, name: newUser.name, email: newUser.email },
        "Email verified successfully! your account has been created",
      ),
    );
});

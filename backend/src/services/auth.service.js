import redisClient from "../config/redis.js";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { getVerifyEmailHtml } from "../utils/emailTemplates.js";
import { sendMail } from "../utils/sendMail.js";

export const registerUserService = async (data, ip) => {
  const { name, email, password } = data;
  //generate unique rate limit key for combine ip and email
  const rateLimitKey = `register-rate-limit:${ip}:${email}`;

  //fetch current request count
  if (await redisClient.get(rateLimitKey)) {
    throw new ApiError(429, "Too many requests, try again later");
  }

  //check existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  //passsword hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  //generate verify token
  const verifyToken = crypto.randomBytes(32).toString("hex");

  //generate verify key
  const verifyKey = `verify:${verifyToken}`;

  //data to store in redis for 5 min
  const dataToStore = JSON.stringify({
    name,
    email,
    password: hashedPassword,
  });

  await redisClient.set(verifyKey, dataToStore, { EX: 5 * 60 });

  const subject = "Verify your email for account creation";
  const html = getVerifyEmailHtml({ email, token: verifyToken });

  await sendMail({ email, subject, html });

  await redisClient.set(rateLimitKey, "true", { EX: 60 });

  return { name, email };
};

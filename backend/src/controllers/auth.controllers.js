import asyncHandler from "../utils/asyncHandler.js";
import createHttpError from "http-errors";
import redisClient from "../config/redis.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { getVerifyEmailHtml } from "../utils/emailTemplates.js";
import { sendMail } from "../utils/sendMail.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.validatedData;

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

  //create token
  const verifyToken = crypto.randomBytes(32).toString("hex");

  //create verify key
  const verifyKey = `verify:${verifyToken}`;

  //data to store in redis
  const dataToStore = JSON.stringify({ name, email, password: hashedPassword });
  await redisClient.set(verifyKey, dataToStore, { EX: 5 * 60 }); //5min

  //send mail
  const subject = "Verify your email for account creation";
  const html = getVerifyEmailHtml({ email, token: verifyToken });
  await sendMail({ email, subject, html });

  await redisClient.set(rateLimitKey, "true", { EX: 60 });

  return res.status(200).json({
    success: true,
    message:
      "If your email is valid, a verification link has been sent. It will expire in 5 minutes",
  });
});

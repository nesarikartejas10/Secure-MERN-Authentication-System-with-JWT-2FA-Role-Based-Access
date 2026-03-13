import asyncHandler from "../utils/asyncHandler.js";
import createHttpError from "http-errors";
import redisClient from "../config/redis.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { getOtpHtml, getVerifyEmailHtml } from "../utils/emailTemplates.js";
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
  const token = crypto.randomBytes(32).toString("hex");

  //create verify key
  const verifyKey = `verify:${token}`;

  //data to store in redis
  const dataToStore = JSON.stringify({ name, email, password: hashedPassword });
  await redisClient.set(verifyKey, dataToStore, { EX: 5 * 60 }); //5min

  //send mail
  const subject = "Verify your email for account creation";
  const html = getVerifyEmailHtml({ email, token });

  try {
    await sendMail({ email, subject, html });
  } catch (error) {
    console.log("Error while sending email", error.message);
  }

  await redisClient.set(rateLimitKey, "true", { EX: 60 });

  return res.status(200).json({
    success: true,
    message:
      "If your email is valid, a verification link has been sent. It will expire in 5 minutes",
  });
});

export const verifyUser = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    return next(createHttpError(400, "Verification token is required"));
  }

  const verifyKey = `verify:${token}`;

  const redisUserData = await redisClient.get(verifyKey);

  if (!redisUserData) {
    return next(createHttpError(400, "Verification link is expired"));
  }

  const userData = JSON.parse(redisUserData);

  //check existing user in database
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    return next(createHttpError(400, "User already exists"));
  }

  const newUser = await User.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });

  await redisClient.del(verifyKey);

  return res.status(201).json({
    success: true,
    message: "Email verified successfully! Your account has been created",
    user: { id: newUser._id, name: newUser.name, email: newUser.email },
  });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.validatedData;

  const rateLimitKey = `login-rate-limit:${req.ip}:${email}`;
  if (await redisClient.get(rateLimitKey)) {
    return next(
      createHttpError(429, "Too many requests! Please try again later"),
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(createHttpError(401, "Invalid credentials"));
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return next(createHttpError(401, "Incorrect password"));
  }

  const otp = crypto.randomInt(100000, 1000000).toString();
  const otpKey = `otp:${otp}`;
  await redisClient.set(otpKey, JSON.stringify(otp), { EX: 5 * 60 });

  const subject = "Your OTP for Verification";
  const html = getOtpHtml({ email, otp });

  try {
    await sendMail({ email, subject, html });
  } catch (error) {
    console.log("Error while sending mail", error);
  }

  await redisClient.set(rateLimitKey, "true", { EX: 60 });

  return res.status(200).json({
    success: true,
    message:
      "If your email is valid, a otp has been sent. It will expire in 5 minutes",
  });
});

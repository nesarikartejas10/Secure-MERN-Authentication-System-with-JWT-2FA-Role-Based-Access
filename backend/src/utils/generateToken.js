import jwt from "jsonwebtoken";
import { config } from "../config/envConfig.js";
import redisClient from "../config/redis.js";

export const generateToken = async (id, res) => {
  const accessToken = jwt.sign({ id }, config.accessJwtSecret, {
    expiresIn: "1m",
  });

  const refreshToken = jwt.sign({ id }, config.refreshJwtSecret, {
    expiresIn: "7d",
  });

  const refreshTokenKey = `refresh_token:${id}`;
  await redisClient.setEx(refreshTokenKey, 7 * 24 * 60 * 60, refreshToken);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    // secure: config.env === "production" ? true : false,
    sameSite: "strict",
    maxAge: 1 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    // secure: config.env === "production" ? true : false,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return { accessToken, refreshToken };
};

import jwt from "jsonebtoken";
import { config } from "../config/envConfig.js";
import redisClient from "../config/redis.js";

const generateToken = async (id, res) => {
  const accessToken = jwt.sign({ id }, config.accessJwtSecret, {
    exppresIn: "1m",
  });

  const refreshToken = jwt.sign({ id }, config.refreshJwtSecret, {
    exppresIn: "7d",
  });

  const refreshTokenKey = `refresh_token:${id}`;
  await redisClient.setEx(refreshTokenKey, 7 * 24 * 60 * 60, refreshToken);

  res.cookie("accesstoken", accessToken, {
    httpOnly: true,
    secure: config.env === "production" ? true : false,
    sameSite: "strict",
    maxAge: 1 * 60 * 1000,
  });
};

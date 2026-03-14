import jwt from "jsonebtoken";
import { config } from "../config/envConfig.js";

const generateToken = (id, res) => {
  const accessToken = jwt.sign({ id }, config.accessJwtSecret, {
    exppresIn: "1m",
  });

  const refreshToken = jwt.sign({ id }, config.refreshJwtSecret, {
    exppresIn: "7d",
  });
};

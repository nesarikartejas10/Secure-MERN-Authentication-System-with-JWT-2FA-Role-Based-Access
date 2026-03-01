import { createClient } from "redis";
import { config } from "./envConfig.js";

const redisURL = config.redisURL;

if (!redisURL) {
  console.log("Missing redis url");
  process.exit(1);
}

const redisClient = createClient({
  url: redisURL,
});

redisClient.on("coonect", () => {
  console.log("Redis connected successfully");
});

redisClient.on("error", (error) => {
  console.log("Redis connected failed:", error.message);
});

await redisClient.connect();

export default redisClient;

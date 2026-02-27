import express from "express";
import authRouter from "./routes/auth.routes.js";
import mongoSanitize from "express-mongo-sanitize";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

const app = express();
app.use(express.json());
app.use(
  mongoSanitize({
    replaceWith: "_",
  }),
);

app.use("/api/v1", authRouter);

app.use(globalErrorHandler);

export default app;

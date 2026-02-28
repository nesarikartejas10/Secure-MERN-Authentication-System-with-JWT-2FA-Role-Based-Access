import express from "express";
import authRouter from "./routes/auth.routes.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use(globalErrorHandler);

export default app;

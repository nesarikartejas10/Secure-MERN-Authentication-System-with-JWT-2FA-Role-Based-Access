import asyncHandler from "../utils/asyncHandler.js";
import { registerUserSchema } from "../validators/user.validation.js";
import sanitize from "mongo-sanitize";
import createHttpError from "http-errors";
import ApiResponse from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const sanitizedBody = sanitize(req.body);
  const validation = registerUserSchema.safeParse(sanitizedBody);

  if (!validation.success) {
    const zodError = validation.error;
    let firstErrorMessage = "Validation failed";
    let allErrors = [];

    if (zodError?.issues && Array.isArray(zodError.issues)) {
      allErrors = zodError.issues.map((issue) => ({
        field: issue.path ? issue.path.join(".") : "unkown",
        message: issue.message || "Validation Error",
        code: issue.code,
      }));

      firstErrorMessage = allErrors[0]?.message || "Validation Error";
    }

    return res.status(400).json({
      success: false,
      message: firstErrorMessage,
      errors: allErrors,
    });
  }

  const { name, email, password } = validation.data;

  return res
    .status(201)
    .json(new ApiResponse(201, { name, email }, "User Register successfully"));
});

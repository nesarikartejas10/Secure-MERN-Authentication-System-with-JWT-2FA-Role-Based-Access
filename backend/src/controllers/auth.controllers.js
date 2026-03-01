import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { registerUserService } from "../services/auth.service.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email } = await registerUserService(req.validatedData, req.ip);
  console.log(name, email);
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { name, email },
        "If your email is valid, a verification link has been sent to your email. It will expire in 5 minutes",
      ),
    );
});

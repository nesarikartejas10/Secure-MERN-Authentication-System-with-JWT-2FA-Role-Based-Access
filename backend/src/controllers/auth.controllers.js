import asyncHandler from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
});

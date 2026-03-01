import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 3,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 3,
  },
  password: {
    type: String,
    required: true,
    maxlength: 8,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

export const User = mongoose.model("User", userSchema);

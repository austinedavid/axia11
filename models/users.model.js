import mongoose from "mongoose";

// create a schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    state: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Rejected", "Successful"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

// create a model
const userModel = mongoose.model("user", userSchema);

export default userModel;

import userModel from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const allUser = await userModel.find();
    return res.json(allUser);
  } catch (error) {
    return res.send(error.message);
  }
};

export const createUser = async (req, res) => {
  const { password, ...others } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // CHECK IF USER EXIST
    const isUser = await userModel.findOne({ email: others.email });
    if (isUser) return res.send("User already exist!!");
    // Continue with registration
    const user = new userModel({ ...others, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: "registration successful!!" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const updateUser = async (req, res) => {
  const { id, email, ...others } = req.body;
  try {
    await userModel.findByIdAndUpdate(id, { ...others });
    return res.json({ message: "user updated successfully" });
  } catch (error) {
    return res.send(error.message);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    await userModel.findByIdAndDelete(id);
    return res.json({ message: "account deleted successfully!!" });
  } catch (error) {
    return res.send(error.message);
  }
};

export const loginUser = async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email)
    return res.status(400).json({ message: "enter all credentials" });
  try {
    const isUser = await userModel.findOne({ email });
    if (!isUser) {
      return res
        .status(404)
        .json({ message: "User does not exist, register now" });
    }
    const correctPassword = await bcrypt.compare(password, isUser.password);
    if (!correctPassword) {
      return res.json({ message: "Incorrect credentials" });
    }
    const payload = { id: isUser.id, email: isUser.email };
    const token = jwt.sign(payload, process.env.JWT_SECRETE);
    const body = { email: isUser.email, name: isUser.name, token };
    return res.status(200).json(body);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

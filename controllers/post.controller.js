import postModel from "../models/post.model.js";
import jwt from "jsonwebtoken";

export const createPost = async (req, res) => {
  // Verify jwt token first
  const token = req.headers.authorization;
  if (!token) return res.json({ message: "token not found" });

  jwt.verify(token, "secrete", (error, payload) => {
    if (error) return res.json({ message: "token expired or tamparted" });
    var jwtPayload = payload;
  });

  const body = req.body;
  try {
    const newPost = new postModel({ ...body, creatorId: jwtPayload.id });
    await newPost.save();
    return res.json({ message: "post created successfully" });
  } catch (error) {
    return res.send(error.message);
  }
};
export const getAllPost = async (req, res) => {
  try {
    const allPost = await postModel.find();
    return res.json(allPost);
  } catch (error) {
    return res.send(error.message);
  }
};

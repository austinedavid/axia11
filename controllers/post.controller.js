import postModel from "../models/post.model.js";
import jwt from "jsonwebtoken";

export const createPost = async (req, res) => {
  const body = req.body;
  try {
    const newPost = new postModel({
      ...body,
      creatorId: req.user.id,
    });
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

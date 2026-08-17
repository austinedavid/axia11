import express from "express";
import { createPost, getAllPost } from "../controllers/post.controller.js";

const routes = express.Router();

routes.get("/post", getAllPost);

routes.post("/post", createPost);

export default routes;

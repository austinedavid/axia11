import express from "express";
import { createPost, getAllPost } from "../controllers/post.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const routes = express.Router();

routes.get("/post", getAllPost);

routes.post("/post", authenticationMiddleware, createPost);

export default routes;

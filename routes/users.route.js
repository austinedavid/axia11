import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/users.controller.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const routes = express.Router();

routes.get("/users", getAllUsers);

routes.post("/users", createUser);

routes.put("/users", authenticationMiddleware, updateUser);

routes.delete("/users", authenticationMiddleware, deleteUser);
routes.post("/user-login", loginUser);

export default routes;

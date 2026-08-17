import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/users.controller.js";

const routes = express.Router();

routes.get("/users", getAllUsers);

routes.post("/users", createUser);

routes.put("/users", updateUser);

routes.delete("/users", deleteUser);
routes.post("/user-login", loginUser);

export default routes;

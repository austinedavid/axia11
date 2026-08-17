import express from "express";
import usersRoute from "./routes/users.route.js";
import postRoute from "./routes/post.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const name = "david";

function connectDB() {
  mongoose
    .connect(process.env.DBURL)
    .then(() => console.log("DB connected"))
    .catch((error) => console.log(error.message));
}

const app = express();
app.use(express.json());

app.use(usersRoute);
app.use(postRoute);

app.listen(4000, () => {
  connectDB();
  console.log("app is running, change made ");
});

import express from "express";
import usersRoute from "./routes/users.route.js";
import postRoute from "./routes/post.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import errorHandlingMiddleware from "./middlewares/errorhandling.middleware.js";
dotenv.config();
import cors from "cors";
import multer from "multer";
const uploads = multer({ dest: "./uploads" });
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRETE,
});

function connectDB() {
  mongoose
    .connect(process.env.DBURL)
    .then(() => console.log("DB connected"))
    .catch((error) => console.log(error.message));
}

const app = express();
// universal middleware
app.use(express.json());
app.use(express.text({ type: "text/plain" }));
app.use(express.text({ type: "application/javascript" }));
app.use(express.text({ type: "text/html" }));
app.use(express.text({ type: "application/xml" }));
app.use(express.urlencoded());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.post("/", (req, res) => {
  console.log(req.body);
  return res.json({ message: "successful" });
});
app.use(usersRoute);
app.use(postRoute);
// multer learning
// single field with single file
app.post("/single-field-single-file", uploads.single("dp"), (req, res) => {
  cloudinary.uploader
    .upload(req.file.path, {
      resource_type: "auto",
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  return res.json({ message: "welcome to multer" });
});
// single field with multiple files
app.post(
  "/single-field-multiple-files",
  uploads.array("cert", 10),
  (req, res) => {
    console.log(req.body);
    console.log(req.files);
    return res.json({ message: "successful" });
  },
);
// multiple fields with multiple or single file
app.post(
  "/multi-fields-multi-files",
  uploads.fields([
    { name: "dp", maxCount: 1 },
    { name: "cert", maxCount: 10 },
    { name: "resume", maxCount: 1 },
  ]),
  (req, res) => {
    console.log(req.body);
    console.log(req.files);
    return res.json({ message: "multiple files" });
  },
);
app.post("/no-files", uploads.none(), (req, res) => {
  console.log(req.body);
  return res.json({ message: "no file " });
});
// Error handling middleware
app.use(errorHandlingMiddleware);

app.listen(4000, () => {
  connectDB();
  console.log("app is running, change made ");
});

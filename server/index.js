import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import { fileURLToPath } from "url";

import {register} from "./controllers/auth.js";
import {createPost} from "./controllers/posts.js";
import {createTask} from "./controllers/tasks.js";


import { verifyToken } from "./middleware/auth.js";

import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import groupRoutes from "./routes/group.js"
import postRoutes from "./routes/posts.js"
import taskRoutes from "./routes/tasks.js"
import shoppingListRoutes from "./routes/shoppingList.js";

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts",verifyToken, upload.single("picture"), createPost)
app.post("/tasks",verifyToken, upload.single("picture"), createTask)


/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes )
app.use("/groups", groupRoutes )
app.use("/posts", postRoutes )
app.use("/tasks", taskRoutes )
app.use("/shoppinglists", shoppingListRoutes)

/* MONGOOSE  SETUP*/
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

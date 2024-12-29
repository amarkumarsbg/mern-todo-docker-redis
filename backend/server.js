import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import todoRouter from "./routes/todoRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Redis } from "ioredis";
import axios from "axios";

dotenv.config();
connectDB();

const app = express();

const redisClient = new Redis();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//Redis implementation
app.get("/posts", async (req, res) => {
  try {
    const cachedData = await redisClient.get("posts");
    if (cachedData !== null) {
      console.log("cached data");
      return res.json(JSON.parse(cachedData));
    } else {
      console.log("Not cached data");
      const { data } = await axios(
        "https://jsonplaceholder.typicode.com/posts"
      );
      await redisClient.setex("posts", 20, JSON.stringify(data));

      return res.json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import todoRouter from "./routes/todoRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

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

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controller/todoController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/", isAuthenticated, createTodo);
router.get("/", isAuthenticated, getAllTodos);
router.put("/:id", isAuthenticated, updateTodo);
router.delete("/:id", isAuthenticated, deleteTodo);

export default router;

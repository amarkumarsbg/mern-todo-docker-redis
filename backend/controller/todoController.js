import mongoose from "mongoose";
import Todo from "../model/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newTodo = await Todo.create({ title, description });

    return res
      .status(200)
      .json({ success: true, message: "Todo created", todo: newTodo });
  } catch (error) {
    console.log("error in creating todo", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    return res.status(200).json({
      success: true,
      message: "Todo fetched successfully",
      data: todos,
    });
  } catch (error) {
    console.log("error in getting todo", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product id" });
    }

    const updatedTodos = await Todo.findByIdAndUpdate(
      id,
      { title, description },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Todos updated successfully",
      data: updatedTodos,
    });
  } catch (error) {
    console.log("error in updating todo", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    console.log("error in deleting todo", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

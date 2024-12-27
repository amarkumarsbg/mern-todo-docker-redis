import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;

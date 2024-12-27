import { Input } from "@/components/ui/input";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Import icons
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null); // State for tracking which todo is being edited

  // Add Todo handler
  const addTodoHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/todo/",
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTodos([...todos, res.data.todo]);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  // Fetch all todos
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/todo/", {
          withCredentials: true,
        });
        if (res.data.success) {
          setTodos(res.data.data || []);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch todos");
      }
    };
    fetchTodo();
  }, []);

  // Delete Todo handler
  const deleteTodoHandler = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/todo/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTodos(todos.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  // Edit Todo handler
  const editTodoHandler = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditingTodo(todo); // Set the current todo to be edited
  };

  // Update Todo handler
  const updateTodoHandler = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/todo/${editingTodo._id}`,
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        // Update the todo in the state
        setTodos(
          todos.map((todo) =>
            todo._id === editingTodo._id
              ? { ...todo, title, description }
              : todo
          )
        );
        setEditingTodo(null); // Reset editing state
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center gap-5 mt-5">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Add a new todo..."
          className="w-1/4"
        />
        <Button onClick={editingTodo ? updateTodoHandler : addTodoHandler}>
          {editingTodo ? "Update Todo" : "Add Todo"}
        </Button>
      </div>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write a description..."
        className="w-1/4 mt-2"
      />
      <div className="grid grid-cols-5 gap-2 mt-3">
        {todos.length > 0 ? (
          todos.map((todo) => {
            if (!todo || !todo._id || !todo.title || !todo.description) {
              return null;
            }

            return (
              <Card
                key={todo._id}
                className="bg-gray-800 text-white w-80 h-60 p-4 relative"
              >
                <CardHeader>
                  <CardTitle>{todo.title}</CardTitle>
                  <CardDescription>{todo.description}</CardDescription>

                  <button
                    onClick={() => editTodoHandler(todo)} // Edit Todo
                    className="absolute top-2 right-16 text-blue-500 hover:text-blue-700 text-sm mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteTodoHandler(todo._id)} // Delete Todo
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                  >
                    <FaTrashAlt />
                  </button>
                </CardHeader>
              </Card>
            );
          })
        ) : (
          <div>No todos found.</div>
        )}
      </div>
    </div>
  );
}

export default Home;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div>
        <Input
          value={user.email}
          name="email"
          onChange={changeHandler}
          type="text"
          placeholder="Email"
        />
      </div>
      <div className="mt-5">
        <Input
          value={user.password}
          name="password"
          onChange={changeHandler}
          type="password"
          placeholder="Password"
        />
      </div>

      <div className="flex justify-center mt-6">
        <Button
          onClick={loginHandler}
          navigate="/home"
          classname="max-w-md mx-auto mt-10"
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;

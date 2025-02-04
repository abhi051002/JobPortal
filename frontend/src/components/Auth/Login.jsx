import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio-group";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/constant";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // You can install lucide-react or use any other icon library
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInputData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5">Login</h1>
        <div className="my-2">
          <Label>Email</Label>
          <Input
            className="mt-2"
            type="email"
            placeholder="email@example.com"
            name="email"
            value={input.email}
            onChange={(e) => changeEventHandler(e)}
          />
        </div>
        <div className="my-2">
          <Label>Password</Label>
          <div className="relative">
            <Input
              className="mt-2 pr-10" // Added right padding for the icon
              type={showPassword ? "text" : "password"}
              placeholder="your password"
              name="password"
              value={input.password}
              onChange={(e) => changeEventHandler(e)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <RadioGroup className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                id="student"
                value="student"
                className="cursor-pointer"
                checked={input.role === "student"}
                onChange={(e) => changeEventHandler(e)}
              />
              <Label htmlFor="student">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                id="recruiters"
                value="recruiters"
                checked={input.role === "recruiters"}
                onChange={(e) => changeEventHandler(e)}
                className="cursor-pointer"
              />
              <Label htmlFor="recruiters">Recruiters</Label>
            </div>
          </RadioGroup>
        </div>
        {loading ? (
          <Button className="w-full my-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
          </Button>
        ) : (
          <Button type="submit" className="w-full my-4">
            Login
          </Button>
        )}

        <span className="text-sm">
          Don't have an Account?{" "}
          <Link to={"/signup"} className="text-blue-600">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;

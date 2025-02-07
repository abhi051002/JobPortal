import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio-group";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/constant";
import { Eye, EyeOff, Loader2 } from "lucide-react";
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
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-8 mx-auto max-w-7xl">
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        className="w-full md:w-2/3 lg:w-1/2 border border-gray-200 rounded-md p-4 sm:p-6 md:p-8 my-4 sm:my-6 md:my-10 bg-white shadow-sm"
      >
        <h1 className="font-bold text-xl sm:text-2xl mb-5">Login</h1>

        <div className="space-y-4">
          <div>
            <Label className="text-sm sm:text-base">Email</Label>
            <Input
              className="mt-2"
              type="email"
              placeholder="email@example.com"
              name="email"
              value={input.email}
              onChange={(e) => changeEventHandler(e)}
            />
          </div>

          <div>
            <Label className="text-sm sm:text-base">Password</Label>
            <div className="relative">
              <Input
                className="mt-2 pr-10"
                type={showPassword ? "text" : "password"}
                placeholder="your password"
                name="password"
                value={input.password}
                onChange={(e) => changeEventHandler(e)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
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

          <div className="flex flex-row justify-center sm:justify-between">
            <RadioGroup className="flex flex-row justify-center items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  id="student"
                  value="student"
                  className="h-4 w-4 cursor-pointer accent-blue-600"
                  checked={input.role === "student"}
                  onChange={(e) => changeEventHandler(e)}
                />
                <Label
                  htmlFor="student"
                  className="text-sm sm:text-base cursor-pointer"
                >
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  id="recruiters"
                  value="recruiters"
                  className="h-4 w-4 cursor-pointer accent-blue-600"
                  checked={input.role === "recruiters"}
                  onChange={(e) => changeEventHandler(e)}
                />
                <Label
                  htmlFor="recruiters"
                  className="text-sm sm:text-base cursor-pointer"
                >
                  Recruiters
                </Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button disabled className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}

          <div className="text-center sm:text-left">
            <span className="text-sm sm:text-base">
              Don't have an Account?{" "}
              <Link
                to={"/signup"}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Signup
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

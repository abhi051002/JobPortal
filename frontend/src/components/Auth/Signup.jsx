import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/constant";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
    file: "",
  });
  const { loading, user } = useSelector((store) => store.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changeFileHandler = (e) => {
    setInput((prev) => ({ ...prev, file: e.target.files?.[0] }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("password", input.password);
      formData.append("confirmPassword", input.confirmPassword);
      formData.append("role", input.role);
      if (input.file) {
        formData.append("file", input.file);
      }
      const response = await axios.post(
        `${USER_API_ENDPOINT}/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
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
        onSubmit={(event) => onSubmitHandler(event)}
        className="w-full md:w-2/3 lg:w-1/2 border border-gray-200 rounded-md p-4 sm:p-6 md:p-8 my-4 sm:my-6 md:my-10 bg-white shadow-sm"
      >
        <h1 className="font-bold text-xl sm:text-2xl mb-5">Sign up</h1>

        <div className="space-y-4">
          <div>
            <Label className="text-sm sm:text-base">Full Name</Label>
            <Input
              className="mt-2"
              type="text"
              placeholder="Your Name"
              name="fullname"
              value={input.fullname}
              onChange={(e) => changeEventHandler(e)}
            />
          </div>

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
            <Label className="text-sm sm:text-base">Phone Number</Label>
            <Input
              className="mt-2"
              type="tel"
              placeholder="xxxxx-xxxxx"
              name="phoneNumber"
              value={input.phoneNumber}
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

          <div>
            <Label className="text-sm sm:text-base">Confirm Password</Label>
            <div className="relative">
              <Input
                className="mt-2 pr-10"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={(e) => changeEventHandler(e)}
                placeholder="repeat password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <RadioGroup className="flex flex-row justify-center items-start sm:items-center gap-8 sm:gap-4">
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
                <Label htmlFor="student" className="text-sm sm:text-base">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  id="recruiters"
                  value="recruiters"
                  checked={input.role === "recruiters"}
                  onChange={(e) => changeEventHandler(e)}
                  className="h-4 w-4 cursor-pointer accent-blue-600"
                />
                <Label htmlFor="recruiters" className="text-sm sm:text-base">
                  Recruiters
                </Label>
              </div>
            </RadioGroup>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Label className="text-sm sm:text-base">Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer text-sm sm:text-base"
                name="file"
                onChange={(e) => changeFileHandler(e)}
              />
            </div>
          </div>

          {loading ? (
            <Button disabled className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}

          <div className="text-center sm:text-left">
            <span className="text-sm sm:text-base">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;

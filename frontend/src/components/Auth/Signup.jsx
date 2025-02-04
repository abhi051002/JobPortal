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
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        onSubmit={(event) => onSubmitHandler(event)}
        className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5">Sign up</h1>
        <div className="my-2">
          <Label>Full Name</Label>
          <Input
            className="mt-2"
            type="text"
            placeholder="Your Name"
            name="fullname"
            value={input.fullname}
            onChange={(e) => changeEventHandler(e)}
          />
        </div>
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
          <Label>Phone Number</Label>
          <Input
            className="mt-2"
            type="tel"
            placeholder="xxxxx-xxxxx"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={(e) => changeEventHandler(e)}
          />
        </div>
        <div className="my-2">
          <Label>Password</Label>
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
        <div className="my-2">
          <Label>Confirm Password</Label>
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
          <div className="flex items-center gap-2">
            <Label>Profile</Label>
            <Input
              accept="image/*"
              type="file"
              className="cursor-pointer"
              name="file"
              onChange={(e) => changeFileHandler(e)}
            />
          </div>
        </div>
        {loading ? (
          <Button className="w-full my-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
          </Button>
        ) : (
          <Button type="submit" className="w-full my-4">
            Signup
          </Button>
        )}
        <span className="text-sm">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;

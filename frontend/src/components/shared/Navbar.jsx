import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/constant";
import { setUser } from "@/redux/authSlice";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const ProfileContent = () => (
    <div>
      <div className="flex gap-4 space-y-2">
        <Avatar>
          <AvatarImage
            src={
              user?.profile?.profilePhoto
                ? user?.profile?.profilePhoto
                : "https://github.com/shadcn.png"
            }
          />
        </Avatar>
        <div>
          <h4 className="font-medium">{user?.fullname}</h4>
          <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
        </div>
      </div>
      <div className="flex flex-col my-3 text-gray-600">
        {user && user.role === "student" && (
          <div className="flex w-fit items-center gap-2 cursor-pointer">
            <User2 />
            <Button variant="link" className="h-8">
              <Link to={"/profile"}>View Profile</Link>
            </Button>
          </div>
        )}
        <div className="flex w-fit items-center gap-2 cursor-pointer">
          <LogOut />
          <Button variant="link" onClick={logoutHandler} className="h-8">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 lg:px-0">
        <div>
          <Link to={"/"}>
            <h1 className="text-2xl font-bold">
              Job <span className="text-[#F83002]">Portal</span>
            </h1>
          </Link>
        </div>

        {/* Mobile Header Actions */}
        <div className="flex items-center gap-4 lg:hidden">
          {user && (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer h-8 w-8">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto
                        ? user?.profile?.profilePhoto
                        : "https://github.com/shadcn.png"
                    }
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <ProfileContent />
              </PopoverContent>
            </Popover>
          )}
          <button
            className="p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-4">
            {user && user?.role === "recruiters" ? (
              <>
                <li>
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li>
                  <Link to={"/browse"}>Browse</Link>
                </li>
              </>
            )}
          </ul>
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto
                        ? user?.profile?.profilePhoto
                        : "https://github.com/shadcn.png"
                    }
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <ProfileContent />
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center gap-2">
              <Link to={"/login"}>
                <Button className="" variant="outline">
                  Login
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button
                  className="bg-[#6A38C2] hover:bg-[#5b3Ba6] text-white"
                  variant="outline"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 p-4">
            <ul className="flex flex-col space-y-4">
              {user && user?.role === "recruiters" ? (
                <>
                  <li>
                    <Link to={"/admin/companies"} onClick={toggleMobileMenu}>
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link to={"/admin/jobs"} onClick={toggleMobileMenu}>
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to={"/"} onClick={toggleMobileMenu}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to={"/jobs"} onClick={toggleMobileMenu}>
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link to={"/browse"} onClick={toggleMobileMenu}>
                      Browse
                    </Link>
                  </li>
                </>
              )}
              {!user && (
                <li className="flex flex-col gap-2 pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4">
                    <Link to={"/login"} onClick={toggleMobileMenu}>
                      <Button className="w-full" variant="outline">
                        Login
                      </Button>
                    </Link>
                    <Link to={"/signup"} onClick={toggleMobileMenu}>
                      <Button
                        className="w-full bg-[#6A38C2] hover:bg-[#5b3Ba6] text-white"
                        variant="outline"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

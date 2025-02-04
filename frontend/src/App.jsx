import React from "react";
import Navbar from "./components/shared/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/nav/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/Admin/Companies";
import CreateCompanies from "./components/Admin/CreateCompanies";
import CompanySetup from "./components/Admin/CompanySetup";
import Job from "./components/Admin/Job";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/authSlice";
import PostJob from "./components/Admin/PostJob";
import Applicants from "./components/Admin/Applicants";
import ProtectedRoute from "./components/Admin/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Invalid token:", error);
      return true;
    }
  };
  const token = localStorage.getItem("token");
  if (token && isTokenExpired(token)) {
    navigate("/login");
    dispatch(setUser(null));
    localStorage.removeItem("token");
  } else {
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/description/:id" element={<JobDescription />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin Routes */}
        <Route
          path="/admin/companies"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/companies/create"
          element={
            <ProtectedRoute>
              <CreateCompanies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/companies/:id"
          element={
            <ProtectedRoute>
              <CompanySetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute>
              <Job />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs/create"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs/:id/applicants"
          element={
            <ProtectedRoute>
              <Applicants />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

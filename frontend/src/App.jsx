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
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";

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
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/description/:id"
          element={
            <ProtectedRoute>
              <JobDescription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/browse"
          element={
            <ProtectedRoute>
              <Browse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/companies"
          element={
            <AdminProtectedRoute>
              <Companies />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/companies/create"
          element={
            <AdminProtectedRoute>
              <CreateCompanies />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/companies/:id"
          element={
            <AdminProtectedRoute>
              <CompanySetup />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <AdminProtectedRoute>
              <Job />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs/create"
          element={
            <AdminProtectedRoute>
              <PostJob />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs/:id/applicants"
          element={
            <AdminProtectedRoute>
              <Applicants />
            </AdminProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

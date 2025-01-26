import React from "react";
import Navbar from "./components/shared/Navbar";
import { Route, Routes } from "react-router-dom";
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

const App = () => {
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
        <Route path="/admin/companies" element={<Companies />} />
        <Route path="/admin/companies/create" element={<CreateCompanies />} />
        <Route path="/admin/companies/:id" element={<CompanySetup />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

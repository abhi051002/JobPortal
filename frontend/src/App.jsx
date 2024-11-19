import React from "react";
import Navbar from "./components/shared/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

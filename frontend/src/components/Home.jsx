import React, { useEffect } from "react";
import HeroSection from "./home/HeroSection";
import CategoryCarousel from "./home/CategoryCarousel";
import LatestJobs from "./home/LatestJobs";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiters") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div className="container mx-auto px-4">
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </div>
  );
};

export default Home;

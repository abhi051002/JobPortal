import React from "react";
import HeroSection from "./home/HeroSection";
import CategoryCarousel from "./home/CategoryCarousel";
import LatestJobs from "./home/LatestJobs";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Home = () => {
  useGetAllJobs();
  return (
    <div>
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </div>
  );
};

export default Home;

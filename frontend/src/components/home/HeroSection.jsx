import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-6 md:my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm md:text-base">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-2xl md:text-4xl font-bold px-4">
          Search , Apply &<br />
          Get Your <span className="text-[#6A38C2]">Dream Job Today</span>
        </h1>
        <p className="text-muted-foreground px-4 text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore,
          dicta. Tempora repellat aspernatur labore ut?
        </p>
        <div className="flex w-full md:w-[60%] lg:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find Your Dream Jobs"
            value={query}
            name="query"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full text-sm md:text-base py-2"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6A38C2]"
          >
            <Search className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

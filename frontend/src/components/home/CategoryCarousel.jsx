import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphics",
  "Designer",
  "Technical Content Writer",
  "Full Stack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (item) => {
    dispatch(setSearchQuery(item));
    navigate("/browse");
  };
  return (
    <div className="py-8 md:py-12 lg:py-20">
      <Carousel className="w-full max-w-[90%] sm:max-w-lg md:max-w-xl mx-auto">
        <CarouselContent>
          {category.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 px-2"
            >
              <Button
                onClick={() => searchJobHandler(item)}
                className="rounded-full w-full text-xs sm:text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis"
                variant="outline"
              >
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="scale-75 sm:scale-100 sm:flex ml-2 sm:ml-0" />
        <CarouselNext className="scale-75 sm:scale-100 sm:flex mr-2 sm:mr-0" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;

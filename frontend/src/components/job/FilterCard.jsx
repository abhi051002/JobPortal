import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { Button } from "../ui/button";

const filterData = [
  {
    filterType: "Location",
    array: ["BBSR", "Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Internship",
      "Content Writer",
      "Business Analyst",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-14k", "14-50k", "50k-1Lakh", "1-5 Lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelecedValue] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState();
  const dispatch = useDispatch();
  const clearFilter = () => {
    setSelecedValue(null);
    setTempValue(null);
    setIsOpen(false);
  };
  const changeHandler = (value) => {
    if (window.innerWidth >= 1024) {
      setSelecedValue(value);
    } else {
      setTempValue(value);
    }
  };
  const applyFilter = () => {
    setSelecedValue(tempValue);
    setIsOpen(false);
  };
  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue]);
  return (
    <>
      <div className="lg:hidden flex gap-2 mb-4">
        <Button onClick={() => setIsOpen(true)} className="flex-1 bg-[#7209b7]">
          Open Filters
        </Button>
        {selectedValue && (
          <Button
            onClick={clearFilter}
            variant="outline"
            className="bg-red-50 text-red-500 hover:bg-red-100"
          >
            Clear
          </Button>
        )}
      </div>

      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`
          fixed lg:relative top-0 right-0 h-full w-[80%] lg:w-full 
          bg-white z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"} 
          lg:translate-x-0 lg:block overflow-y-auto
          p-4 lg:p-3 rounded-l-lg lg:rounded-md
        `}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold">Filter Jobs</h1>
          <div className="flex gap-2 items-center">
            {selectedValue && (
              <Button
                onClick={clearFilter}
                variant="outline"
                size="sm"
                className="hidden lg:block bg-red-50 text-red-500 hover:bg-red-100"
              >
                Clear
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="lg:hidden"
            >
              ✕
            </Button>
          </div>
        </div>

        <hr className="mt-3" />

        {filterData.map((item, index) => (
          <RadioGroup
            key={index}
            className="mt-4"
            value={window.innerWidth >= 1024 ? selectedValue : tempValue}
            onValueChange={changeHandler}
          >
            <h2 className="font-bold text-base lg:text-lg mb-2">
              {item.filterType}
            </h2>
            {item.array.map((data, subIndex) => (
              <div
                key={subIndex}
                className="flex items-center space-x-2 text-sm lg:text-base mb-2"
              >
                <RadioGroupItem value={data} id={`id${index}-${subIndex}`} />
                <Label htmlFor={`id${index}-${subIndex}`}>{data}</Label>
              </div>
            ))}
          </RadioGroup>
        ))}

        <Button
          onClick={applyFilter}
          className="w-full mt-4 bg-[#7209b7] lg:hidden"
        >
          Apply Filter
        </Button>
      </div>
    </>
  );
};

export default FilterCard;

import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "BBSR",
      "Delhi NCR",
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Mumbai",
    ],
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
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelecedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-semibold">Filter Jobs</h1>
      <hr className="mt-3" />
      {filterData.map((item, index) => (
        <RadioGroup
          key={index}
          className="mt-4"
          value={selectedValue}
          onValueChange={changeHandler}
        >
          <h2 className="font-bold text-lg mb-2">{item.filterType}</h2>
          {item.array.map((data, subIndex) => {
            const itemId = `id${index}-${subIndex}`;
            return (
              <div key={subIndex} className="flex items-center space-x-2">
                <RadioGroupItem value={data} id={itemId} />
                <Label htmlFor={itemId}>{data}</Label>
              </div>
            );
          })}
        </RadioGroup>
      ))}
    </div>
  );
};

export default FilterCard;

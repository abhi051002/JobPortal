import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

const Job = () => {
  return (
    <div className="border border-gray-200 shadow-xl bg-white rounded-md p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="rounded-full" size="icon">
          <Avatar>
            <AvatarImage src="https://static.vecteezy.com/system/resources/previews/008/214/517/non_2x/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-md">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-xl">Job Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Nulla accusamus maxime at perferendis voluptatum
          impedit.
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          12 Positions
        </Badge>
        <Badge className={"text-[#F83B02] font-bold"} variant="ghost">
          Full Time
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          24 LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline">Details</Button>
        <Button className="bg-[#7209b7] ">Save for Later</Button>
      </div>
    </div>
  );
};

export default Job;

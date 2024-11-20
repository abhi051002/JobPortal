import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Contact, Mail, Pen } from "lucide-react";
import { Label } from "../ui/label";
import AppliedJobTable from "../job/AppliedJobTable";

const skills = ["HTML", "CSS", "JavaScript", "React"];
const Profile = () => {
  const isHaveResume = false;
  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src="https://static.vecteezy.com/system/resources/previews/008/214/517/non_2x/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg"
              alt="Profile"
              className="w-24 h-24"
            />
          </Avatar>
          <div>
            <h1 className="font-medium text-xl">Full Name</h1>
            <p className="text-sm text-gray-600">
              Add Your Bio here Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Molestiae reiciendis excepturi veritatis, quos
              id distinctio?
            </p>
          </div>
        </div>
        <Button className="text-right" variant="outline">
          <Pen />
        </Button>
      </div>
      <div className="my-5">
        <div className="flex items-center gap-3 my-2">
          <Mail />
          <span>abhijit@gmail.com</span>
        </div>
        <div className="flex items-center gap-3 my-2">
          <Contact />
          <span>8249001710</span>
        </div>
      </div>
      <div className="my-5">
        <h1 className="font-semibold text-md mb-3">Skills</h1>
        <div className="flex items-center gap-1">
          {skills.length
            ? skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            : "N/A"}
        </div>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label className="text-md font-bold">Resume</Label>
        {isHaveResume ? (
          <a
            target="_blank"
            href="https:abhi051002.github.io/portfolio"
            className="font-medium text-sm hover:underline text-blue-500 w-full"
          >
            Abhijit Nanda
          </a>
        ) : (
          <span className="text-red-400 font-medium text-md">N/A</span>
        )}
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl my-4">
        <h1 className="font-semibold text-xl my-5">Applied Jobs</h1>
        <hr />
        <AppliedJobTable />
      </div>
    </div>
  );
};

export default Profile;

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Contact, Mail, Pen } from "lucide-react";
import { Label } from "../ui/label";
import AppliedJobTable from "../job/AppliedJobTable";
import UpdateProfileDialog from "../UpdateProfileDialog";
import { useSelector } from "react-redux";
import store from "@/redux/store";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const isHaveResume = user?.profile?.resume;
  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src={
                user?.profile?.profilePhoto
                  ? user?.profile?.profilePhoto
                  : "https://static.vecteezy.com/system/resources/previews/008/214/517/non_2x/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg"
              }
              alt="Profile"
              className="w-24 h-24"
            />
          </Avatar>
          <div>
            <h1 className="font-medium text-xl">{user?.fullname}</h1>
            <p className="text-sm text-gray-600">{user?.profile?.bio}</p>
          </div>
        </div>
        <Button
          onClick={() => setOpen(true)}
          className="text-right"
          variant="outline"
        >
          <Pen />
        </Button>
      </div>
      <div className="my-5">
        <div className="flex items-center gap-3 my-2">
          <Mail />
          <span>{user?.email}</span>
        </div>
        <div className="flex items-center gap-3 my-2">
          <Contact />
          <span>{user?.phoneNumber}</span>
        </div>
      </div>
      <div className="my-5">
        <h1 className="font-semibold text-md mb-3">Skills</h1>
        <div className="flex items-center gap-1">
          {user?.profile?.skills.length
            ? user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            : "N/A"}
        </div>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label className="text-md font-bold">Resume</Label>
        {isHaveResume ? (
          <a
            target="_blank"
            href={user?.profile?.resume}
            className="font-medium text-sm hover:underline text-blue-500 w-full"
          >
            {user?.profile?.resumeOriginalName}
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
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const UserAvatar = () => {
  return (
    <div>
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default UserAvatar;

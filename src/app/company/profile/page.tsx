import { NavBar } from "@/components/NavBar";
import React from "react";
import ProfileAvatar from "./(profilePage)/ProfileAvatar";
import AboutRectangle from "./(profilePage)/aboutRectangle/AboutRectangle";
import BioRectangle from "./(profilePage)/BioRectangle/BioRectangle";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface User {
  id: string;
  name: string;
  age: number;
  headlines: string;
  bio: string;
  gender: string;
  place: string;
  role: string;
  skills: string[];
  dob: string;
  email: string;
  profileImage?: string;

  professionalRole?: string;
  password: string;
}
const page = async () => {
  let userData: User | null = null;
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  //  console.log("token from profile",token);

  try {
    const UserData = await axios.get(
      `http://localhost:3000/api/user-api/profile/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    userData = UserData.data.userDetails as User;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
      redirect("auth/login");
    }
  }
  return (
    <div className="">
      <div>
        <NavBar />
      </div>

      <div className="flex flex-col gap-5 items-center justify-center mt-5">
        <div className="flex flex-col gap-5 items-center">
          <ProfileAvatar />
          <div className="flex flex-col items-center justify-between gap-5">
            <h1 className="text-2xl font-Josefin_Sans font-bold">
              {userData?.name}
            </h1>
            <p className="font-Josefin_Sans text-lg  font-semibold">
              {userData?.headlines
                ? userData?.headlines
                : " HeadLines about the user"}
            </p>
          </div>

          {userData && (
            <div className="flex flex-col gap-5">
              <AboutRectangle userData={userData} />
              <div className=" w-[90%] h-28 max-w-[90%] justify-center">
                <BioRectangle userData={userData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;

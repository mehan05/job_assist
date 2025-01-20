"use client";
import { Badge } from "@/components/ui/badge";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Textarea } from "@/components/ui/textarea";
import {toast} from "sonner";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import React, {  useEffect, useState } from "react";
import Link from "next/link";
const UserSignup = () => {
  const words = "Job_Assist";
  const [skills, SetSkills] = useState<string[]>([]);
  const [skill, setSkill] = useState<string>("");
  const [date, setDate] = React.useState<Date|null>();
  const [userData, setUserData] = useState({
    name: "",
    age: 0,
    email: "",
    gender: "",
    password: "",
    skills: skills,
    place: "",
    headlines: "",
    bio: "",
  });

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (skill.trim()) {
        e.preventDefault();
        SetSkills((prev) => [...prev, skill]);
        setSkill("");
      }
    }
  };

  const handleFormSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Creating Account...");
    console.log(userData);
      try {

        const response = await axios.post("http://localhost:3000/api/auth/signup",userData);
        console.log("response",response);
        if(response)
        {
          toast.success("User Created Successfully",{id:toastId});
        }
      } catch (error) {
            if(error instanceof AxiosError)
            {
              console.log(error.response?.data);
              toast.error("Something went wrong",{id:toastId});
            }
      }
  
  };

  const handleOnchange = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>{
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    if (date) {
      const calculatedAge = new Date().getFullYear() - date.getFullYear();
      setUserData((prev) => ({
        ...prev,skills,
        dob: date.toISOString(),
        age: calculatedAge,
      }));
    }
  }, [date,skills]);
  
  return (
    <div className="">
      <div className="flex justify-center items-center mb-5">
        <div className="">
          <TextGenerateEffect words={words} />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="border-2 border-foreground rounded-3xl w-full max-w-full h-auto p-10 bg-background text-foreground ">
          <div className="flex justify-around items-center gap-5 ">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 items-center justify-start overflow-hidden">
                <h1 className="text-7xl  dark:text-[var(--primary)] font-bold font-Josefin_Sans">
                  Welcome
                </h1>
                <p className="font-Josefin_Sans font-semibold ">
                  Register to Find Your Job
                </p>

                <form onSubmit={handleFormSubmit} className="w-full">
                  <div className="flex flex-col gap-5 mt-5">
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      onChange={handleOnchange}
                      name="name"
                      
                      className="p-2 w-full border-2 rounded-lg focus:outline-none bg-background text-foreground border-foreground"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      onChange={handleOnchange}
                      name="email"
                      className="p-2 w-full border-2 rounded-lg focus:outline-none bg-background   border-foreground text-foreground"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      onChange={handleOnchange}
                      name="password"
                      className="p-2 w-full border-2 rounded-lg focus:outline-none bg-background text-foreground border-foreground"
                    />

                    <select
                            id="gender"
                            value={userData.gender}
                            onChange={handleOnchange}
                            name="gender"
                            
                            className="border p-2 rounded font-Josefin_Sans bg-black"
                          >
                            <option hidden >Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                    </select>

                    <input type="date" onChange={(e) => setDate(e.target.valueAsDate)
                    
                    } className="p-2 w-full border-2 rounded-lg focus:outline-none bg-background text-foreground border-foreground" />

                    <input
                      type="text"
                      placeholder="Place"
                      required
                      onChange={handleOnchange}
                      name="place"
                      className="p-2 w-full border-2 rounded-lg focus:outline-none bg-background text-foreground border-foreground"
                    />
                    <input
                      type="text"
                      placeholder="Add Skills"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      onKeyDown={handleAddSkill}
                      className="p-2 w-full border-2 rounded-lg focus:outline-none bg-background text-foreground border-foreground"
                    />
                    {skills.length > 0 && (
                      <div className="flex gap-1 items-center  ">

                        <p className="font-Josefin_Sans font-semibold">
                          Skills:
                        </p>
                      <div className="m-1 p-1 flex gap-2   scrollable-element overflow-x-auto w-full max-w-[300px]">

                        {skills.map((ele, index) => (
                          <Badge key={index} variant={"outline"}>
                            {ele}
                          </Badge>
                        ))}
                      </div>
                      </div>
                    )}
                    <div className="grid w-full gap-2">
                      <Textarea placeholder="Add Bio" name="bio" onChange={handleOnchange} />
                    </div>
                    <div></div>
                    <button
                      type="submit"
                      className="bg-foreground hover:scale-105 hover:rounded-xl text-primary-foreground font-bold py-2 px-4 rounded-xl dark:bg-white dark:text-black"
                    >
                      signup
                    </button>
                  </div>
                </form>
                <Link href="/user/auth/login " className="mt-5">
                    <p className="font-Josefin_Sans font-semibold  text-xl hover:text-white text-[#9574e2]">Already have an account</p>
                </Link>
                <p className="font-Josefin_Sans font-semibold mt-2 text-xl dark:text-[var(--primary)]">
                signup with Other Platform
                </p>

                <button
                  type="button"
                  className="bg-foreground hover:scale-105 text-primary-foreground font-bold py-1 px-4 rounded-xl border-2 items-center justify-center  border-secondary-foreground w-full dark:bg-white dark:text-black"
                >
                  <div className="flex justify-center gap-5 mt-5 items-center">
                    <Image
                      src="/google_logo.png"
                      alt="Google"
                      width={25}
                      height={10}
                    />
                    <span className="font-Josefin_Sans font-semibold">
                    signup   With Google
                    </span>
                  </div>
                </button>
              </div>
            </div>
            <div>
              <Image
                src="/loginPageImage.png"
                className="rounded-3xl"
                alt="Login"
                width={500} 
                height={600}
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;

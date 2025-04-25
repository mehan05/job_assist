"use client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Textarea } from "@/components/ui/textarea";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
const CompanySignup = () => {
  const words = "Job_Assist";
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [userData, setUserData] = useState({
    name: "",
    age: 0,
    email: "",
    gender: "",
    dob: date,
    password: "",
    place: "",
    headlines: "",
    bio: "",
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let toastId;
    try {
      toastId = toast.loading("Creating User...");

      const response = await axios.post(
        "https://job-assist.vercel.app/api/auth/signup",
        userData
      );

      if (response.status === 200) {
        toast.success("User Created Successfully", { id: toastId });
        router.replace("/company/dashboard");
      } else if (response.status === 401) {
        toast.warning("Invalid Data", { id: toastId });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 500) {
          toast.error("Something went wrong", { id: toastId });
        }
      }
    }
  };

  const handleOnchange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    setUserData((prev) => ({ ...prev, dob: date }));
    userData.age =
      ((date && date?.getFullYear()) ?? 0) - new Date().getFullYear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);
  return (
    <div className="max-w-7xl mx-auto scale-90">
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
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>

                    <input
                      type="date"
                      onChange={(e) => setDate(new Date(e.target.value))}
                    />

                    <input
                      type="text"
                      placeholder="Place"
                      required
                      onChange={handleOnchange}
                      name="place"
                      className="p-2 w-full border-2 rounded-lg focus:outline-none bg-background text-foreground border-foreground"
                    />

                    <div className="grid w-full gap-2">
                      <Textarea
                        placeholder="Add Bio"
                        name="bio"
                        onChange={handleOnchange}
                      />
                    </div>
                    <div></div>
                    <button
                      type="submit"
                      className="bg-foreground hover:scale-105 hover:rounded-xl text-primary-foreground font-bold py-2 px-4 rounded-xl dark:bg-white dark:text-black"
                    >
                      Login
                    </button>
                  </div>
                </form>
                <Link href="/company/auth/login " className="mt-5">
                  <p className="font-Josefin_Sans font-semibold  text-xl hover:text-white text-[#9574e2]">
                    Already have an account
                  </p>
                </Link>
                <p className="font-Josefin_Sans font-semibold mt-2 text-xl  dark:text-[var(--primary)]">
                  Login with Other Platform
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
                      Login With Google
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySignup;

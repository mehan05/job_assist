"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Dock, DockIcon } from "@/components/ui/dock";
import Link from "next/link";
import { BorderBeam } from "./ui/border-beam";
import RippleButton from "./ui/ripple-button";
import ThemeSwitch from "./ThemeSwitcher";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { usePathname } from "next/navigation";

export type IconProps = React.HTMLAttributes<SVGElement>;

export function NavBar() {
  const words = "Job_Assist";
  const pathName = usePathname();
  console.log(pathName.startsWith("/user/auth"));

  return (
    <div className="relative mt-3 ml-3 mr-3   border-b-1 border-gray-500 p-5">
      {!pathName.includes("auth") && (
        <div className="flex gap-5 justify-between items-center ">
          <div className="flex flex-col gap-1">
            <TextGenerateEffect words={words} className="text-4xl " />
            <p className="font-Josefin_Sans font-semibold">
              Get Your Dream Job
            </p>
          </div>

          <div className="">
            <Dock direction="middle">
              <BorderBeam />
              <DockIcon>
                <Link href="/">
                  <div className="realtive text-sm sm:text-md lg:text-md font-semibold px-2 sm:px-3 lg:px-3 py-1 sm:py-2 bg-foreground text-background dark:bg-foreground dark:text-background ">
                    <RippleButton
                      rippleColor="#ADD8E6"
                      className="font-Josefin_Sans"
                    >
                      DashBoard
                    </RippleButton>
                  </div>
                </Link>
              </DockIcon>
              <DockIcon>
                <Link href="/">
                  <div className="realtive text-sm sm:text-md lg:text-md font-semibold px-2 sm:px-3 lg:px-3 py-1 sm:py-2 ">
                    <RippleButton rippleColor="#ADD8E6">
                      WorkSpaces
                    </RippleButton>
                  </div>
                </Link>
              </DockIcon>
              <DockIcon>
                <Link href="/">
                  <div className="realtive text-sm sm:text-md lg:text-md font-semibold px-2 sm:px-3 lg:px-3 py-1 sm:py-2 ">
                    <RippleButton rippleColor="#ADD8E6">JobBoards</RippleButton>
                  </div>
                </Link>
              </DockIcon>
              <DockIcon>
                <Link href="/">
                  <div className="realtive text-sm sm:text-md lg:text-md font-semibold px-2 sm:px-3 lg:px-3 py-1 sm:py-2 ">
                    <RippleButton rippleColor="#ADD8E6">Messages</RippleButton>
                  </div>
                </Link>
              </DockIcon>
            </Dock>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
            </Link>
            <ThemeSwitch />
          </div>
        </div>
      )}
    </div>
  );
}

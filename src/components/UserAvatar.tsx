"use client";

import { nameAbreviation } from "@/utils/nameAbreviation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PiSignOut } from "react-icons/pi";
import { signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

interface UserProps {
  currentUser: User | undefined;
}

export const UserAvatar = (props: UserProps) => {
  const { currentUser } = props;

  if (currentUser)
    return (
      <div className="flex items-center gap-5">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex gap-2 items-center">
            <Avatar className="w-8 h-8 rounded-full cursor-pointer object-cover">
              <AvatarImage src={currentUser?.image || ""} alt="user" />
              <AvatarFallback className="font-semibold">
                {nameAbreviation(currentUser?.name as string)}
              </AvatarFallback>
            </Avatar>
            <h1>{currentUser?.name}</h1>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{currentUser?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className=" cursor-pointer"
              onClick={() =>
                signOut({
                  redirect: true,
                  redirectTo: "/login",
                })
              }
            >
              Sign Out
              <PiSignOut className="size-50 text-destructive" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  return (
    <div className="flex items-center gap-5">
      <Skeleton className="size-10 rounded-full" />
      <Skeleton className="w-32 h-8" />
    </div>
  );
};

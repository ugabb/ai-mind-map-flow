'use client'

import { nameAbreviation } from "@/utils/nameAbreviation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ExtendedUser } from "@/lib/authjs/auth";
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

interface UserProps {
  currentUser: ExtendedUser | undefined;
}

export const UserAvatar = (props: UserProps) => {
  const { currentUser } = props;
  return (
    <>
      {currentUser ? (
        <div className="flex items-center gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-10 h-10 rounded-full cursor-pointer object-cover">
                <AvatarImage src={currentUser?.image || ""} alt="user" />
                <AvatarFallback className="font-semibold">
                  {nameAbreviation(currentUser?.name as string)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{currentUser?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className=" cursor-pointer" onClick={() => signOut({
                redirect: true,
                redirectTo: "/login",
              })}>
                Sign Out
                <PiSignOut className="size-50 text-destructive" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <h1>{currentUser?.name}</h1>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="w-32 h-8" />
        </div>
      )}
    </>
  );
};

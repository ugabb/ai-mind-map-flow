import { nameAbreviation } from "@/utils/nameAbreviation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ExtendedUser } from "@/lib/authjs/auth";
import { Skeleton } from "./ui/skeleton";

interface UserProps {
  currentUser: ExtendedUser | undefined;
}

export const UserAvatar = async (props: UserProps) => {
  const { currentUser } = props;
  return (
    <>
      {currentUser ? (
        <div className="flex items-center gap-5">
          <Avatar className="w-10 h-10 rounded-full">
            <AvatarImage src={currentUser?.image || ""} alt="user" />
            <AvatarFallback className="font-semibold">
              {nameAbreviation(currentUser?.name as string)}
            </AvatarFallback>
          </Avatar>
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

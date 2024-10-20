import { nameAbreviation } from "@/utils/nameAbreviation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserProps {
    currentUser: any;
}

export const UserAvatar = async (props: UserProps) => {
    const { currentUser } = props;
  return (
    <div className="flex items-center gap-5">
      <Avatar className="w-10 h-10 rounded-full">
        <AvatarImage src={currentUser?.image as string} alt="user" />
        <AvatarFallback className="font-semibold">
          {nameAbreviation(currentUser?.name as string)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

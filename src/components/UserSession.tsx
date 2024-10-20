import { auth } from "@/lib/authjs/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { nameAbreviation } from "@/utils/nameAbreviation";

export const UserSession = async () => {
  const session = await auth();
  console.log(session)

  return (
    <div className="flex items-center gap-5">
      <Avatar className="w-10 h-10 rounded-full">
        <AvatarImage src={session?.user?.image as string} alt="user" />
        <AvatarFallback className="font-semibold">{nameAbreviation(session?.user?.name as string)}</AvatarFallback>
      </Avatar>
    </div>
  );
};

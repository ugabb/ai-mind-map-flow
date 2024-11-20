import { User } from "next-auth";
import { UserAvatar } from "./UserAvatar";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

interface HomeHeaderProps {
  currentUser: User | undefined;
}

const linkSocials = {
  github: 'https://github.com/ugabb/ai-mind-map-flow',
  linkedin: 'https://www.linkedin.com/in/ugab/',
}

export const HomeHeader = (props: HomeHeaderProps) => {
  const { currentUser } = props;
  return (
    <div className="hidden md:flex items-center justify-between gap-5 p-3 w-full h-16 overflow-hidden">
      <UserAvatar currentUser={currentUser} />
      <div className="flex items-center gap-3">
        <Link href={linkSocials.github} target="_blank">
          <FaGithub className="size-14 text-indigo-500 cursor-pointer translate-y-8 hover:-translate-y-0 ease-in-out duration-200" />
        </Link>
        <Link href={linkSocials.linkedin} target="_blank">
          <FaLinkedin className="size-14 text-indigo-500 cursor-pointer translate-y-8 hover:-translate-y-0 ease-in-out duration-200" />
        </Link>
      </div>
    </div>
  );
};

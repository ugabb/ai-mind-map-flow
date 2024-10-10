import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { PiHouseSimple, PiSquaresFour, PiUser } from "react-icons/pi";
import Link from "next/link";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: any[];
}

export function Sidebar({ className, playlists }: SidebarProps) {
  return (
    <div className={cn("hidden md:block pb-12 border-r border-zinc-100 max-w-xs", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            AI Mind Map
          </h2>
          <div className="space-y-1">
            <Button asChild variant="secondary">
              <Link href={"/home"} className="w-full justify-start">
                <PiHouseSimple className="h-5 w-5 mr-2 text-indigo-500" />
                Home
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href={"/mind-map"} className="w-full justify-start">
                <PiSquaresFour className="h-5 w-5 mr-2 text-indigo-500" />
                Canva
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href={"/profile"} className="w-full justify-start">
                <PiUser className="h-5 w-5 mr-2 text-indigo-500" />
                Profile
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";

export const Header = () => {
  return (
    <div className="z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex items-center justify-between p-3">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="outline" size="sm" className="rounded-full">
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  );
};

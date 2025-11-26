"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Header = () => (
  <div className="z-20 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="flex items-center justify-between p-3">
      <SidebarTrigger />
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button className="rounded-full" size="sm" variant="outline">
          Upgrade
        </Button>
      </div>
    </div>
  </div>
);

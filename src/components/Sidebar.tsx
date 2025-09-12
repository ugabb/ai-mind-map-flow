"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserAvatar } from "./UserAvatar";
import { motion } from "framer-motion";
import { Plus, Search, Clock, LayoutGrid, LifeBuoy } from "lucide-react";
import { User } from "next-auth";

interface AppSidebarProps {
  currentUser?: User;
}

export function AppSidebar({ currentUser }: AppSidebarProps) {
  const { state } = useSidebar();
  return (
    <Sidebar className="p-3 px-2 bg-sidebar">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-1">
          <LayoutGrid className="size-5" />
          <span className="font-semibold">YouLearn</span>
        </div>
        <div className="relative">
          <SidebarInput placeholder="Search" className="pl-8" />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Quick actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <Button className="w-full" asChild>
              <Link href="#">
                <Plus className="mr-2 size-4" /> Add content
              </Link>
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Recents</SidebarGroupLabel>
          <SidebarMenu>
            {["Você tá CANSADO…", "Machine Learning - CS22…"].map((title) => (
              <SidebarMenuItem key={title}>
                <SidebarMenuButton className="justify-start">
                  <Clock className="size-4" />
                  <span>{title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Spaces</SidebarGroupLabel>
          <SidebarMenu>
            {["Gabriel's Space"].map((space) => (
              <SidebarMenuItem key={space}>
                <SidebarMenuButton className="justify-start">
                  <LayoutGrid className="size-4" />
                  <span>{space}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="justify-start" asChild>
                <Link href="#">
                  <LifeBuoy className="size-4" />
                  <span>Help & Tools</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="mt-2 px-2">
            <UserAvatar currentUser={currentUser} />
          </div>
        </motion.div>
      </SidebarFooter>
    </Sidebar>
  );
}

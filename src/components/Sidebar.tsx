'use client'

import { motion } from 'framer-motion'
import { Clock, LayoutGrid, LifeBuoy, Plus, Search } from 'lucide-react'
import Link from 'next/link'
import type { User } from 'next-auth'
import { Button } from '@/components/ui/button'
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
} from '@/components/ui/sidebar'
import { UserAvatar } from './UserAvatar'

type AppSidebarProps = {
  currentUser?: User
}

export function AppSidebar({ currentUser }: AppSidebarProps) {
  const { state } = useSidebar()
  return (
    <Sidebar className="bg-sidebar p-3 px-2">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-1">
          <LayoutGrid className="size-5" />
          <span className="font-semibold">YouLearn</span>
        </div>
        <div className="relative">
          <SidebarInput className="pl-8" placeholder="Search" />
          <Search className="-translate-y-1/2 absolute top-1/2 left-2 size-4 text-muted-foreground" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Quick actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <Button asChild className="w-full">
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
            {['Você tá CANSADO…', 'Machine Learning - CS22…'].map((title) => (
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
        <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="justify-start">
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
  )
}

'use client'

import { useRouter } from 'next/navigation'
import type { User } from 'next-auth'
import { PiSignOut } from 'react-icons/pi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { authClient } from '@/lib/authClient'
import { nameAbreviation } from '@/utils/nameAbreviation'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Skeleton } from './ui/skeleton'

type UserProps = {
  currentUser: User | undefined
}

export const UserAvatar = (props: UserProps) => {
  const { currentUser } = props

  const router = useRouter()

  if (currentUser) {
    return (
      <div className="flex items-center gap-5">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <Avatar className="h-8 w-8 cursor-pointer rounded-full object-cover">
              <AvatarImage alt="user" src={currentUser?.image || ''} />
              <AvatarFallback className="font-semibold">
                {nameAbreviation(currentUser?.name as string)}
              </AvatarFallback>
            </Avatar>
            <h1>{currentUser?.name}</h1>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{currentUser?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push('/login')
                    },
                  },
                })
              }
            >
              Sign Out
              <PiSignOut className="size-50 text-destructive" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-5">
      <Skeleton className="size-10 rounded-full" />
      <Skeleton className="h-8 w-32" />
    </div>
  )
}

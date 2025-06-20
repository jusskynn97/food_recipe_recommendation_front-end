"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Heart, LogOut, Settings, Star } from "lucide-react"
import { useAccount } from "@/hooks/useAccount"

export function UserAvatarMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const {user,handleLogout } = useAccount();
  console.log(user?.email)

  // Mock user data - in a real app, this would come from authentication
  const userData = {
    email: user?.email,
    image: "/placeholder.svg?height=40&width=40",
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full outline-none ring-2 ring-[#f26950] ring-offset-2">
          <Avatar className="h-11 w-11 border-2 border-white hover:border-[#f26950] transition-all duration-200">
            <AvatarImage src={userData.image || "/placeholder.svg"} alt={userData.email || ""} />
            <AvatarFallback className="bg-[#f26950] text-white">
              {userData?.email 
              ? (() => {
                  const local = userData.email.split("@")[0];
                  return local.length > 4
                    ? local[0] + local.slice(-3)
                    : local;
                })()
              : ""}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            {/* <p className="text-sm font-medium leading-none">{userData.name}</p> */}
            <p className="text-xs leading-none text-muted-foreground">{userData.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/account">
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Account</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/rated-recipes">
          <DropdownMenuItem className="cursor-pointer">
            <Star className="mr-2 h-4 w-4" />
            <span>Rated</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/settings">
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

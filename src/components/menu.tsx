import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from 'lucide-react'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'


const Menu = () => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger className={buttonVariants({variant: 'ghost'})} >
      <MoreVertical className="w-4 h-4"/>
      </DropdownMenuTrigger>
    <DropdownMenuContent>
      <Link href="/dashboard">
      <DropdownMenuItem>All Posts</DropdownMenuItem>
      </Link>
      <Link href="/dashboard/draft">
      <DropdownMenuItem>Draft</DropdownMenuItem>
      </Link>
      <Link href="/dashboard/published">
      <DropdownMenuItem>Published</DropdownMenuItem>
      </Link>
      <Link href="/dashboard/unpublished">
      <DropdownMenuItem>Unpublished</DropdownMenuItem>
      </Link>
      <Link href="/dashboard/unsaved">
      <DropdownMenuItem>Unsaved</DropdownMenuItem>
      </Link>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default Menu
import { Metadata } from "next"
import Image from "next/image"

import { SidebarNav } from "@components/dashboard/sidebar-nav"
import { Separator } from "@components/ui/separator"

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "Posts",
    href: "/dashboard",
    icon: "post"
  },
  {
    title: "Published",
    href: "/Publish",
    icon: "published"

  },
  {
    title: "Draft",
    href: "/examples/forms/appearance",
    icon: "draft"

  },
  {
    title: "Unpublished",
    href: "/examples/forms/appearance",
    icon: "unpublished"

  },
  {
    title: "Unsaved",
    href: "/examples/forms/appearance",
    icon: "unsaved"

  },
 
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    
      
      <div className=" space-y-6 p-10 pb-16">
       <div className="flex flex-row  ">
          <aside className="-mx-4 lg:w-1/5 hidden  md:block mr-10 ">
            <SidebarNav items={sidebarNavItems} />

          </aside>
      
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    
  )
}
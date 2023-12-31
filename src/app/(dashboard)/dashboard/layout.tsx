import { Metadata } from "next"
import Image from "next/image"

import { SidebarNav } from "@components/dashboard/sidebar-nav"
import { Separator } from "@components/ui/separator"
import NavBar from "@components/NavBar"

export const metadata: Metadata = {
  title: "Post Editor ",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "All Posts",
    href: "/dashboard",
    icon: "post"
  },
  {
    title: "Published",
    href: "/dashboard/published",
    icon: "published"

  },
  {
    title: "Draft",
    href: "/dashboard/draft",
    icon: "draft"

  },
  {
    title: "Unpublished",
    href: "/dashboard/unpublished",
    icon: "unpublished"

  },
  {
    title: "Unsaved",
    href: "/dashboard/unsaved",
    icon: "unsaved"

  },
 
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div>
      
      <NavBar/>
      <div className=" space-y-6 ">
       <div className="flex flex-row  ">
          <aside className=" h-full lg:w-1/5 hidden  md:block mr-10 ">
            <SidebarNav items={sidebarNavItems} />

          </aside>
      
          <div className="py-10 px-5  flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
          </div>

    
  )
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { Icons } from "@components/Icon";
import DynamicIcons from "@components/DynamicIcons";
import UserNav from "./user-nav";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="ml-2 min-h-[89vh] flex justify-center  xl:justify-start w-full rounded-xl ">
      <div className="w-46 rounded-md flex flex-col  justify-between ">
        <div className="px-2 pt-4">
          <ul className="flex flex-col space-y-2 pt-5">
            {/* Other list items... */}

            {items.map((item) => (
              <li
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  pathname === item.href
                    ? " dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                    : "hover:bg-transparent hover:underline hover:bg-zinc-200 dark:hover:bg-zinc-700",
                  "justify-start rounded-xl"
                )}
              >
                <Link key={item.href} href={item.href} className="flex ">
                  <DynamicIcons title={item.icon} className="!mr-2 h-4 w-4" />

                  {item.title}
                </Link>
              </li>
            ))}
            {/* Other list items... */}
          </ul>
        </div>

        {/* Other sections... */}
        <UserNav/>
       
      </div>
    </div>
  );
}

// <div className="flex flex-col h-screen justify-between">
//     <div className="mb-4 h-3">Item 1</div>
//     <div className="mb-4 ">

//     </div>

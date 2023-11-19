"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { Icons } from "@components/Icon";
import DynamicIcons from "@components/DynamicIcons";

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
    <div className="ml-2 flex justify-center  xl:justify-start w-full rounded-xl ">
      <div className="w-64 bg-gray- dark:bg-zinc-900 rounded-md flex flex-col h-[85vh] justify-between ">
        <div className="px-2 pt-4">
          <ul className="flex flex-col space-y-2">
            {/* Other list items... */}

            {items.map((item) => (
              <li
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  pathname === item.href
                    ? " dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                    : "hover:bg-transparent hover:underline hover:bg-zinc-200 dark:hover:bg-zinc-900",
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

        <div className="m-2  pl-6 pr-4 py-4 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-between rounded-xl">
          <div className="flex items-center">
            {/* <div className="relative w-8 h-8 rounded-full ">
              <img
                className="rounded-full"
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                alt=""
              />
            </div> */}
            <div className="flex flex-col pl-3">
              <div className="text-sm text-gray-950 dark:text-zinc-50">
                Jane Doeson
              </div>
              <span className="text-xs text-gray-800  dark:text-zinc-200 font-light tracking-tight">
                janedoeson@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// <div className="flex flex-col h-screen justify-between">
//     <div className="mb-4 h-3">Item 1</div>
//     <div className="mb-4 ">

//     </div>

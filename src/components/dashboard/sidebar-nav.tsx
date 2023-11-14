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
    <nav
      className={cn(
        "flex flex-col lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      
      {items.map((item) => (
        
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "secondary" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline hover:bg-zinc-200 dark:hover:bg-zinc-900",
            "justify-start rounded-xl"
          )}
        >
      
          <DynamicIcons title={item.icon} className="!mr-2 h-4 w-4"/> 

          {item.title}
        </Link>
      ))}
    </nav>
  );
}

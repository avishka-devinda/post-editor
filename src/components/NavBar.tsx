"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Menu from "./menu";

const NavBar = () => {
  const { setTheme } = useTheme();

  return (
    <div className="bg-gray-100 dark:bg-zinc-900 py-2">
      <div className="flex items-center justify-between mx-5">
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-zinc-900 dark:text-white h-7 w-7"
            viewBox="0 0 24 24"
          >
            <rect
              x="0"
              y="0"
              width="24"
              height="24"
              fill="none"
              stroke="none"
            />
            <path
              fill="currentColor"
              d="M6.94 14.033a29.79 29.79 0 0 0-.606 1.782c.96-.696 2.101-1.138 3.418-1.303c2.513-.314 4.746-1.974 5.876-4.059L14.172 9l1.413-1.415l1-1.002c.43-.429.915-1.224 1.428-2.367c-5.593.867-9.018 4.291-11.074 9.818ZM17 8.997l1 1c-1 3-4 6-8 6.5c-2.669.333-4.336 2.166-5.002 5.5H3c1-6 3-20 18-20c-1 2.997-1.998 4.996-2.997 5.997L17 8.997Z"
            />
          </svg>
        </div>
        <div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun
                  onClick={() => setTheme("light")}
                  className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <Moon
                  onClick={() => setTheme("dark")}
                  className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Menu/>
        </div>
        
      </div>
    </div>
  );
};

export default NavBar;

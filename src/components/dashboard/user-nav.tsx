import React from 'react'
import { useSession } from "next-auth/react";


const UserNav = () => {
    const { data: session } = useSession();

    console.log(session)
  return (
    <div className="m-2  pl-6 pr-4 py-4 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-between rounded-xl">
    <div className="flex items-center">
      <div className="relative w-8 h-8 rounded-full ">
        <img
          className="rounded-full"
          src={`${session?.user.image}`}
          alt=""
        />
      </div>
      <div className="flex flex-col pl-3">
        <div className="text-sm text-gray-950 dark:text-zinc-50">
          {session?.user.name}
        </div>
        <span className="text-xs text-gray-800  dark:text-zinc-200 font-light tracking-tight">
          {session?.user.email}
        </span>
      </div>
    </div>
  </div>
  )
}

export default UserNav
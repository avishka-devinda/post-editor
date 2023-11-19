import React from "react";
import { useSession } from "next-auth/react";

const UserAccount = () => {
    const { data: session } = useSession();

  return (
    <div>
      <div className="flex flex-col items-center m-2  pl-4 pr-4 py-4 bg-zinc-200 dark:bg-zinc-800  justify-between rounded-xl">
        <div className="flex flex-col pl-3">
          <div className="text-sm text-gray-950 dark:text-zinc-50">
            user
          </div>
          <span className="text-xs text-gray-800  dark:text-zinc-200 font-light tracking-tight">
             {session?.user.email}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;

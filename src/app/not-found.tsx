import Link from "next/link";
import { headers } from "next/headers";
import { Button, buttonVariants } from "@components/ui/button";

export default async function NotFound() {
  return (
    <div className="flex justify-center items-center h-[89vh]">
      <div className="text-center">
        <h2 className="3xl font-normal text-black dark:text-white">
          Page not found
        </h2>
        <Link href={'/dashboard'}  className={`${buttonVariants({variant: 'outline'})} mt-3 `}>Back to Dashboard</Link>
      </div>
    </div>
  );
}

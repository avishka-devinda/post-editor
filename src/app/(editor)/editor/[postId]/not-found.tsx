import Link from "next/link";
import { headers } from "next/headers";
import { Button, buttonVariants } from "@components/ui/button";

export default async function NotFound() {
  return (
    <div className="flex justify-center items-center h-[80vh] mx-auto">
      <div className="mx-auto text-center">
        <h2 className="3xl font-normal text-black dark:text-white">
        This post cound not be found. Please try again.
        </h2>
        <Link href={'/dashboard'}  className={`${buttonVariants({variant: 'outline'})} mt-3 `}>Go to Dashboard</Link>
      </div>
    </div>
  );
}

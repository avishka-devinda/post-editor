import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[800px]">
      <div>Uh oh! Not Found</div>
      <div>
        This post cound not be found. Please try again.
      </div>
      <Link href="/dashboard" className={buttonVariants({ variant: "ghost" })}>
        Go to Dashboard
      </Link>
    </div>
  )
}

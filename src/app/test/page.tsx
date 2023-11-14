import Image from 'next/image'
import { Button } from "@/components/ui/button"
import NavBar from '@components/NavBar'

import { getCurrentUser } from "@/lib/session"
import { getServerSession } from 'next-auth';


export default async function Home() {
  const user = await getCurrentUser()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <NavBar/>
     <pre><code>{JSON.stringify(user)}</code></pre>
     
    </main>
  )
}

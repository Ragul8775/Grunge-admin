'use client'

import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
export default function Home() {
  const {data : session} = useSession()
  
return <Layout>
<div className="flex gap-1">
  <h1>Hello ,</h1>
  <h2>{session?.user?.name}</h2>
</div>
</Layout>
}

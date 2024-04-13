"use client";

import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="text-brown flex justify-between">
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden items-center">
          <img src={session?.user?.image} alt="?" className="w-10 h-10" />
          <span className="px-2 text-center">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}

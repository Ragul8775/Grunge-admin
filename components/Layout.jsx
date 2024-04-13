"use client";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import Nav from "@/components/Nav";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);
  if (!session) {
    return (
      <div className="pattern-1 w-screen h-screen flex items-center justify-center">
        <div className="py-8 px-6 max-w-md bg-gray-600 bg-opacity-20 rounded-lg shadow-lg backdrop-blur-xl backdrop-filter">
          <div className="py-8 px-10 flex flex-col gap-8">
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-grunge text-6xl text-cream">Grunge</h1>
              <p className="font-mono text-cream opacity-65 text-2xl">
                Clothing <sup className="text-sm">Admin</sup>
              </p>
            </div>
            <div className="text-center w-full">
              <button
                onClick={() => signIn("google")}
                className="flex gap-4 bg-brown text-cream font-grunge  hover:bg-cream hover:text-brown  font-bold py-2 px-4 rounded  items-center"
              >
                <Image
                  src="/assets/images/google.svg"
                  width={25}
                  height={25}
                  alt="google logo"
                />
                <span>Login with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-brown min-h-screen">
      <div className="md:hidden flex items-center p-1">
        <button className="p-2 text-cream " onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="bg-brown flex min-h-screen">
        <Nav show={showNav} />
        <div className="text-brown font-sans md:mt-2  md:mr-2 bg-cream flex-grow   rounded-lg p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

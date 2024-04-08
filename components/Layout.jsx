'use client'
import Image from "next/image";
import {useSession, signIn, getProviders} from 'next-auth/react'
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
export default function Layout({children}) {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    
    useEffect(() => {
      const setUpProviders = async () => {
        const response = await getProviders();
        setProviders(response);
      };
      setUpProviders();
    }, []);
  if(!session){
    return (
      <div className="pattern-1 w-screen h-screen flex items-center justify-center">
        <div className="py-8 px-6 max-w-md bg-gray-600 bg-opacity-20 rounded-lg shadow-lg backdrop-blur-xl backdrop-filter">
        <div className="py-8 px-10 flex flex-col gap-8">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-grunge text-6xl text-cream">
            Grunge
           </h1>
           <p className="font-mono text-cream opacity-65 text-2xl">Clothing <sup className="text-sm">Admin</sup></p>
        </div>
       <div className="text-center w-full">
       <button 
       onClick={()=> (signIn('google'))}
       className="flex gap-4 bg-brown text-cream font-grunge  hover:bg-cream hover:text-brown  font-bold py-2 px-4 rounded  items-center">
       <Image

       src="/assets/images/google.svg"
       width={25}
       height={25}
       alt="google logo"/>
         <span>Login with Google</span>
</button>
       
       
       </div> 
        </div>
        </div>
   </div>
     );
  }
  return(
    <div className="bg-brown min-h-screen flex"> 
    <Nav/>
     <div className="text-brown font-sans bg-cream flex-grow mt-2 mr-2 rounded-lg p-4">{children}</div>
    </div>

  )
}

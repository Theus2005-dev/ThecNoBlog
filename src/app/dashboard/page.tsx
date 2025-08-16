'use client'
import { IoLogoInstagram } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Seguindo from "./seguindo";
import Recomendado from "./recomendados";
import Link from "next/link";

export default function Page(){
    const {data: session, status} = useSession();
    const router = useRouter();
      
     const [seguindo, setSeguindo] = useState<boolean>(true); 
   
        useEffect(()=>{
             // autenticação
                if (status === "unauthenticated") {
                    return router.push('/login')
                }
            },[status])

        
   
       

    return(
      <div className="flex flex-col">
                <header className="flex flex-row justify-between bg-blue-500">
                     
                     <div className="text-start flex flex-row ">
                        <h1 className="text-3xl ml-0">ThecNoBlog</h1> 
                         <IoLogoInstagram className="size-10 text-pink-500"/>
                     </div>
                  
                    <nav className="flex flex-row list-none gap-5 mr-10">
                        <li><Link href="/post">Posts</Link></li>
                        <li><Link href="/login">Login</Link></li>
                       
                    </nav>
                </header>
                <section className="flex flex-col items-center">
                    <div className="flex flex-row ">
                        <button className="bg-blue-500 hover:bg-blue-700 
                        text-white font-bold py-2 px-4 rounded mt-3" onClick={()=>{setSeguindo(false)}}>Recomendado</button>

                        <button className="bg-blue-500 hover:bg-blue-700 
                        text-white font-bold py-2 px-4 rounded mt-3" onClick={()=>{setSeguindo(true)}}>Seguindo</button>
                    </div>
                    {seguindo ? <Seguindo/> : <Recomendado/>}
                   
                </section>
      </div>
    )
}
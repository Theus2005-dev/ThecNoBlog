'use client'
import { IoLogoInstagram } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Seguindo from "./seguindo";
import Recomendado from "./recomendados";


export default function Page(){
    const session = useSession();
    const router = useRouter();
      
     const [seguindo, setSeguindo] = useState<boolean>(true); 
   
        useEffect(()=>{
             // autenticação
             if(!session) router.push('/login');
            },[session, router])

        
   
       

    return(
      <div className="flex flex-col">
                <header className="flex flex-row  bg-blue-500">
                     
                     <div className="text-start flex flex-row ">
                        <h1 className="text-3xl ml-0">ThecNoBlog</h1> 
                         <IoLogoInstagram className="size-10 text-pink-500"/>
                     </div>
                  
                    <h1 className="text-2xl mt-1 ">POSTS</h1>
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
'use client'
import { useState , useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { IoLogoInstagram } from "react-icons/io5";
import Link from 'next/link';
import { MdMarkEmailUnread } from "react-icons/md";
import { CgProfile } from "react-icons/cg";



export default function Profile(){

    const {data: session, status} = useSession();
    const [form, setForm] = useState({email: '', nome: ''})
    const route = useRouter();

 useEffect(() => {
    if (status === "unauthenticated") {
      route.push("/login");
    }
  }, [status]);

    return(
        <div>
              <header className="flex flex-row justify-between bg-blue-500">
                     
                     <div className="text-start flex flex-row ">
                        <h1 className="text-3xl ml-0">ThecNoBlog</h1> 
                         <IoLogoInstagram className="size-10 text-pink-500"/>
                     </div>
                  
                    <nav className="flex flex-row list-none gap-5 mr-10">
                        <li><Link href="/dashboard">Posts</Link></li>
                        <li><Link href="/login">Login</Link></li>
                       
                    </nav>
                </header>
                <section className='flex flex-col'>
                    <h2 className='flex flex-row text-2xl self-center mt-2'>Seu Perfil</h2>
                        <div>
                              <CgProfile className='size-2xl'/>
                             <h3>{session?.user?.name}</h3>
                             <p className='flex flex-row gap-2'>{session?.user?.email} <MdMarkEmailUnread/></p>
                        </div>
                      

                </section>
        </div>
    )
}
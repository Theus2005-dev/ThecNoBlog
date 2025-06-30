'use client'

import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { POST } from "../api/cadastroUser/route";


export default function Post(){

    const {data: session, status} = useSession();
    const userEmail = session?.user?.email;
    const router = useRouter();
    const [mensagem, setMensagem] = useState('Faça seu Post');
    const [form, setForm] = useState({
        titulo: '',
        texto: '',
        email: '' 
    });

    useEffect(()=>{
        if(status === 'loading') return 
        if(!session) router.push('/login')
    })
    function handleChange(e: React.ChangeEvent){
        const  target = e.target as HTMLTextAreaElement
        const {name, value} =target;
        setForm(prev =>({
            ...prev,
            [name]: value
        }))
    }
    async function handleSubmit(target: FormEvent<HTMLFormElement>){

        target.preventDefault()

        const formData = new FormData();
        formData.append('titulo', form.titulo ?? '');
        formData.append('texto', form.texto ?? '');
        formData.append('email', userEmail as string);

        try {
            const response = await fetch('/api/posts', {method:'POST', body: formData})
            const data = await response.json();

            if(response.ok){
                setMensagem(data.message)
            }
        } catch (error) {
            
        }
        

    }
    return(
        <main className="flex flex-col">
            <header className="bg-blue-500 flex justify-between h-15">
              <h1 className="text-4xl ml-4c py-2">ThecNoBlog</h1>
              <nav className="flex list-none py-5">
                <li className="ml-4">Cadastro</li>
                <li className="ml-4">Entrar</li>
                <li className="ml-4 mr-4">Posts</li>
              </nav>
          </header>
          <section className="flex flex-col items-center">
                <div className="bg-gray-500 rounded-xl mt-10 ">
                    <h1 className="text-center font-bold bg-blue-300 rounded-xl">{mensagem}</h1>
                    <hr className="bg-blue-300 mt-5 h-2 border-none"/>
                    <form className="mt-5 items-center" onSubmit={handleSubmit}>
                        <label htmlFor="">Titulo: </label>
                        <input type="text" name="titulo" className="rounded-xl bg-gray-300 w-full" onChange={handleChange}/> <br/> <br/>
                        <label htmlFor="">Descrição: </label>
                        <textarea name="texto" className="rounded-xl bg-gray-300 w-full" onChange={handleChange}/> <br/>
                         <hr className="bg-blue-300 mt-3 h-2 border-none"/>
                          <button type="submit" className="bg-blue-500 rounded-xl ml-7 mt-2 mb-2 font-bold w-50">Publicar</button>
                    </form>
                </div>
          </section>
        </main>
    )
}
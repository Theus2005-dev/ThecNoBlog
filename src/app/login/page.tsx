'use client'
import { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export default function Login(){

    const route = useRouter();
    const [mensagem, setMensagem] = useState('Faça seu login');
    const [form, setForm] = useState({
        email: '',
        senha: ''
    })
  
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
         const {name, value} = e.target;
         setForm(prev =>({
            ...prev,
            [name] : value
         }))
    }
  async function login(target: FormEvent<HTMLFormElement>) {
    target.preventDefault();
    const result = await signIn("credentials",{
        email: form.email,
        password: form.senha,
        redirect: false
    }) 
    if(result?.error){
        setMensagem("Erro: " + result.error)
        return
    }
    route.push("/profile")       
    
  }
    return(
        <div>
            <header className="flex flex row bg-yellow-200 justify-center">
                <h1 className="text-center text-4xl">Login Usuario</h1>
            </header>
            <section className="bg-blue-300 flex h-screen flex-column justify-center">
                <div className="rounded-2xl shadow-[0_0_10px_rgba(0,255,255,0.5)] bg-white w-70 h-90 mt-20 mb-20">
                    <h1 className="text-center text-3xl bg-gray-300 mt-5 rounded-4xl">Seus dados</h1> <br/>
                    <hr className="border text-blue-500"/>
                         <p className="text-center">{mensagem}</p>
                    <hr className="border text-blue-500"/> <br/>
                    <form onSubmit={login} className="ml-15 pt-5">
                        <label htmlFor="">Email:</label> <br/>
                        <input type="email" name="email" className="border rounded-lg" onChange={handleChange}/> <br/> <br/>
                        <label htmlFor="">Senha:</label> <br/>
                        <input type="password" name="senha" className="border rounded-lg" onChange={handleChange}/> <br/> <br/>
                        <button type="submit" className="ml-1 bg-blue-500 rounded-4xl w-40">Entrar</button>
                    </form>
                </div>
            </section>
        </div>
    )

}
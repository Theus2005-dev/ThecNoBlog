'use client'
// import funcionalidades
import { METHODS } from 'http';
import { useState } from 'react';
import { FormEvent } from 'react';


// import estilos
import { MdMarkEmailRead } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";

export default function Cadastro(){
    const [form, setForm] = useState({
                nome: '',
                email: '',
                senha:''
            });
    const [mensagem, setMensagem] = useState('');
   
    function handleChanges(form: React.ChangeEvent<HTMLInputElement>){
            const {name, value} = form.target;
            setForm(
                prevData=>({
                  ...prevData,
                    [name]: value
    })
     )
    }
    async function cadastro(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(form)

        const formData = new FormData();
        formData.append('nome', form.nome);
        formData.append('email', form.email);
        formData.append('senha', form.senha)

        try {
            const response = await fetch('/api/cadastroUser',{method: 'POST', body: formData});
           const data = await response.json();
            if (response.ok) {
               setMensagem(data.message);
            }
            
            console.log(data.message);
            console.log(data.body);
        } catch (error) {
            
        }
        
       
    }
      
    

    return(
        <div className="flex flex-col items-center bg-blue-100 h-screen text-center">
           <h1 className="py-4 bg-yellow-100 w-screen text-4xl font-bold rounded ">Registro de Usuário</h1>
           <div className="bg-white w-70 h-100 pl-2 pr-2 rounded-xl pt-5 mt-40 shadow-[0_4px_10px_rgba(0,255,255,0.5)]">
                <h1 className='bg-gray-300 rounded-xl w-full  font-bold'>Informe seus dados</h1>
                <form action="" onSubmit={cadastro} className="py-5">
                    <p className='bg-black-500 rounded-xl'>{mensagem}</p>
                    <label className='text-gray-700 bg-gray-50' htmlFor="nome">Nome Completo:</label> <br/> <input className='border rounded' type="text" name='nome' onChange={handleChanges} required/> <br/> <br/>
                    <label htmlFor="email" className="flex items-center ml-11 text-gray-700">Endereço de Email <MdMarkEmailRead  className='w-5 text-gray-500'/></label> <br/> <input className='border rounded ' type="email" name='email' onChange={handleChanges} placeholder="exemplo@gmail.com" required/> <br/> <br/>
                    <label htmlFor="senha" className="flex items-center ml-20 text-gray-700">Sua Senha <MdMarkEmailRead className="w-5 text-gray-500"/></label> <br/> <input className='border rounded' type="password" name='senha' onChange={handleChanges} placeholder='***' required/> <br/> <br/>
                    <button className="rounded bg-red-500 w-30" type="submit">Enviar</button>
                </form>
           </div>
        </div>
    )
}
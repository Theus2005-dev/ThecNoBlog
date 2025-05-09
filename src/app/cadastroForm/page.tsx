'use client'
import { METHODS } from 'http';
import { useState } from 'react';
import { FormEvent } from 'react';
export default function Cadastro(){
    const [form, setForm] = useState({
                nome: '',
                email: '',
                senha:''
            });
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
            if (response.ok) {
                alert('dados enviados')
            }
            const data = await response.json();
            console.log(data.message);
            console.log(data.body);
        } catch (error) {
            
        }
        
       
    }
      
    

    return(
        <div className="flex flex-col items-center bg-blue-500 h-screen text-center">
           <h1 className="py-4 bg-yellow-500 w-screen text-4xl font-bold rounded ">Cadastro</h1>
           <div className="bg-white rounded pt-5">
                <form action="" onSubmit={cadastro} className="py-5">
                    <label htmlFor="nome">Nome:</label><input type="text" name='nome' onChange={handleChanges} required/> <br/> <br/>
                    <label htmlFor="email">Email:</label><input type="email" name='email' onChange={handleChanges} placeholder="exemplo@gmail.com" required/> <br/> <br/>
                    <label htmlFor="senha">Senha:</label><input type="password" name='senha' onChange={handleChanges} required/> <br/> <br/>
                    <button className="rounded bg-red-500 w-30" type="submit">Enviar</button>
                </form>
           </div>
        </div>
    )
}
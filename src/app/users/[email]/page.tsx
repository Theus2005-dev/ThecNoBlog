'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// tipos 
type UserType = {
  id: number;
  nome: string;
  email: string;
  // outros campos
} | null;

type PostType = {
  id: number;
  email_usuario: string;
  texto: string;
  titulo: string;
}

// função principal
export default function User() {
  const params = useParams();
  const email = params.email as string;

  const [user, setUser] = useState<UserType>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [post, setPost] = useState<PostType[]>([]);

  useEffect(() => {
    if (!email) return;

    fetch(`/api/cadastroUser/${email}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Erro: ${res.status}`);
        const data = await res.json();
        if (data) {
          console.log(data.body);
          if (Array.isArray(data.body) && data.body.length > 0) {
                setUser(data.body[0]);
          }else{
                setErro("usuario não encontrado")
          }
        }
      })
      .catch((error) => setErro(error.message));
  }, [email]);

   useEffect(()=>{
        if(!user?.email) return;
        fetch(`/api/posts/${user?.email}`)
        .then(async res => {
                if (!res.ok) {
                        let mensagem = "Erro: "
                        try {
                          const data = await res.json()
                          mensagem += data.message;
                        } catch (error) {
                                
                        }
                        throw new Error(mensagem)
                }
                const data = await res.json()
                if (data) {
                  if (Array.isArray(data.body) && data.body.length > 0) {
                    setPost(data.body);
                  }
                }
        })
   },[user?.email])
  console.log('User: ', user);

  return (
    <div className='text-center flex flex-col items-center'>
      {erro && <p>Erro: {erro}</p>}
      {!user && !erro && <p>Carregando usuario...</p>}
      {user &&(
        <>
           <h1>{user.nome}</h1>
           <p>{user.email}</p>
           <button className='bg-blue-500 rounded-xl w-32 font-bold text-white'>Posts</button>
            {post && post.length > 0 ?(
              post.map(p=>(
                <div className="mt-5 bg-gray-500 rounded-lg flex flex-col w-100" key={p.id}>
                 <div className="flex flex-row">
                    
                </div>  
                    <p>{p.texto}</p>
                    
                </div>
              ))
            ) :  (
  <p>Nenhum post encontrado.</p>
)}
        </>
      )}
    </div>
  );
}

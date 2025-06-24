import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link";

// tipagem
type Post = {
  email_usuario: string;
  nome: string;
  id: number;
  titulo: string;
  texto: string;
  imagem: null;
};

// função principal
export default function Seguindo(){
    const {data: session, status} = useSession();
    const [post, setPost] = useState<Post[]>([])
  


     useEffect(()=>{
                if(session){
                   fetch('/api/posts')
                   .then(async res => {
                    if (!res.ok) {
                        let mensagem = "Erro inesperado"
                        try {
                            const data = await res.json()
                            mensagem = data.message;
                        } catch (error) {
                            
                        }
                        throw new Error(mensagem)
                    }
                    const data = await res.json()
                    setPost(data.body)
                    console.log(data.body)
                   })
                   .catch(error => {
                     console.log('Erro: ', error.message)
                   })
                   
                }
             },[session])  
             
    return(
        <div>
            <h1>POSTS DOS SEUS SEGUINDOS</h1>

            <div>
               {post.length === 0 && <p>Nenhum post encontrado.</p>}
               {post.map(p =>(
                <div className="mt-5 bg-gray-500 rounded-lg flex flex-col" key={p.id}>
                 <div className="flex flex-row">
                     <h1 className=""><Link href={`/users/${p.email_usuario}`}>{p.nome}</Link>: </h1>
                </div>  
                    <p>{p.texto}</p>
                    
                </div>
               ))}
            </div>

        </div>        
    )
}
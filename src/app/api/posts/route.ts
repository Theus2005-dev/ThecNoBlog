import { connectDB } from "../../../../lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request){
  const session = await getServerSession(authOptions)
    try {
          const conn = await connectDB();
          const query = "select distinct p.id as 'id', p.titulo as 'titulo',p.email_usuario, p.texto as 'texto', u.nome as 'nome' from posts p inner join usuarios u on p.email_usuario = u.email inner join seguindo s on s.email_seguindo = u.email where s.email_seguidor =?;";
          const [result] = await conn.query(query,[session?.user?.email]);
        
          if ((result as any[]).length > 0) {
           return new Response(JSON.stringify({ body: result }), { status: 200 });
          }
            return Response.json({message: 'nenhum post encontrado', body:[]}, {status: 200});
          
    } catch (error) {
        console.error(error);
        return Response.json({message: error});
    }
  
    

}
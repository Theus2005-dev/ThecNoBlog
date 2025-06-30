import { connectDB } from "../../../../lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

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
  
    

}export async function POST(request: NextRequest, res: NextResponse){
      const form = await request.formData()

      const titulo = form.get('titulo');
      const texto = form.get('texto');
      const email = form.get('email');

      if (!titulo || !texto || !email) {
        return NextResponse.json({message: "Insira os dados no campo abaixo"})
      }
     try {
       const conn = await connectDB();
       const sql = "INSERT INTO posts (email_usuario, titulo, texto) VALUES (?,?,?)";
       const execute = await conn.query(sql,[email, titulo, texto])

       if (execute) {
        return NextResponse.json({message: 'Post Cadastrados'})
       }
       return NextResponse.json({message: 'Não foi possivel postar sua publicação'})

     } catch (error) {
      console.log("Erro na conexão ao banco de dados para cadastro de usuarios" + error);
        return NextResponse.json(error)
     }
}

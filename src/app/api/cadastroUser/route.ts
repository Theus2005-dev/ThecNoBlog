import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { connectDB } from "../../../../lib/db";
import { hashPassword } from "@/utils/hashedPassword";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { RowDataPacket } from "mysql2";


        
export async function POST(req: NextRequest, res : NextResponse){
    
    // recebendo dados
    const data = await req.formData();
    const nome = data.get('nome')
    const email = data.get('email')
    const senha = data.get('senha') as string

    // validando dados
    if(!email || !nome || !senha){
       return NextResponse.json({message: "Insira dados nos campos abaixo"})
    }
    
    // criptografar senha 
    const senhaCriptografada = await hashPassword(senha);

    
    try {
        const conn = await connectDB();
        const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?,?,?)"
      const executed =  await conn.query(sql,[nome, email, senhaCriptografada]);
      
      if(executed){
        return NextResponse.json({message: "Dados recebidos e cadastrados"});
      } 
        return NextResponse.json({message: "Erro ao cadastrar dados. Não se preocupe, o erro foi nosso."})
      
    } catch (error) {
        console.log("Erro na conexão ao banco de dados para cadastro de usuarios" + error);
        return NextResponse.json(error)
    }
    
    
   

}


import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { hashPassword } from "@/utils/hashedPassword";
export async function POST(request: Request){
    try {
        const db = await connectDB()
        const form = await request.formData();

        const nome = form.get('nome');
        const email = form.get('email');
        const senha = form.get('senha') as string;
        
        const senhaHashed = await hashPassword(senha);

        await db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?,?,?)', [nome,email,senhaHashed]);

        return NextResponse.json({
            message: 'dados recebidos!',
            body:form
        });

    } catch (error) {
        console.error("Erro ao processar dados: ", error);
        return NextResponse.json({error: "Erro ao receber dados"},{status:400});
    }

}
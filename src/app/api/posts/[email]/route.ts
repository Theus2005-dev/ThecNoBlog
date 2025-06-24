import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/db';

export async function GET(req: NextRequest, { params } : {params: {email : string}}){
        const email = params.email;

        if(email){
           try {
                const conn = await connectDB();
                const sql = "select * from posts where email_usuario = ?";
                const [result] = await conn.query(sql,[email]);
                if((result as any[]).length > 0 ){
                    return NextResponse.json({message:'posts encontrados.',body: result})
                }else{
                    return NextResponse.json({message: 'Nenhum post encontrado'})
                }
           } catch (error) {
             console.error("Erro: " + error);
                return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
           }
        }
        return Response.json({message: 'erro'})
}
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/db';

export async function GET(req : NextRequest,  context: any){
        const getUser = context.params.getUser;

        if (getUser) {
           try {
             const conn = await connectDB();
             const sql = "SELECT * FROM usuarios where email =?";
             const [result] = await conn.query(sql,[getUser])

             if ((result as any[]).length > 0) {
                return NextResponse.json({body: result})
             }
             return NextResponse.json({message: 'nenhum usuario encontrado'})
           } catch (error) {
               console.error("Erro: " + error);
                return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
           }
        }
        return NextResponse.json({message: 'Usuario não encontrado'})
}
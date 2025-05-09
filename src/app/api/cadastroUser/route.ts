import { NextResponse } from "next/server";
export async function POST(request: Request){
    try {
        const form = await request.formData();

        console.log(form);
        return NextResponse.json({
            message: 'dados recebidos!',
            body: form
        });
    } catch (error) {
        console.error("Erro ao processar dados: ", error);
        return NextResponse.json({error: "Erro ao receber dados"},{status:400});
    }

}
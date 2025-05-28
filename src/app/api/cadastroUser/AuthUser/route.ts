import { NextResponse } from "next/server";

export async function POST(request : Request){
    
    const form = await request.formData();
    
    return NextResponse.json({message: "Recebido", body: form})

}
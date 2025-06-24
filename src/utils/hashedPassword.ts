import bcrypt from 'bcrypt';
import { promises } from 'dns';

export async function hashPassword(paswword:string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(paswword, saltRounds);
    return hashedPassword;
}

export async function verifyPassword(senha: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(senha, hash);
    
}
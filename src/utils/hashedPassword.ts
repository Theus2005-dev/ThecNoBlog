import bcrypt from 'bcrypt';

export async function hashPassword(paswword:string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hash(paswword, saltRounds);
    return hashedPassword;
}
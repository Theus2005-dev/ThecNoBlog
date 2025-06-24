import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "../../../../../lib/db";
import { RowDataPacket } from "mysql2";
import { verifyPassword } from "@/utils/hashedPassword";
import bcrypt from 'bcrypt';

interface Usuario extends RowDataPacket {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          // instancia db
        const conn = await connectDB();
        // query select
        const query = "select * from usuarios where email =?";
        const [row] = await conn.query<Usuario[]>(query,[credentials.email]);
        const userData = row[0];
        // verify password and hash
        const verified = await verifyPassword(credentials.password, userData.senha);
        console.log(verified);
        if (!userData) {
          console.log("Nenhum usuario encontrado");
          return null
        }
        if (credentials?.email === userData?.email) {
          const user = {
            id: "",
            name: userData.nome,
            email: userData.email
          };
          return user;
        }
        return null;
        } catch (error) {
            console.error("Erro na autenticação:", error);
    return null;
        }
        
      }
    })
  ],
  pages:{
    signIn: '/login'
  }
};

const handle = NextAuth(authOptions);

export { handle as GET, handle as POST };

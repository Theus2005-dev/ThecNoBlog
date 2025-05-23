import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "../../../../../lib/db";
import bcrypt from 'bcrypt';

const nextAuthOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials:{
                email:{label: 'email', type: 'email'},
                senha:{label: 'senha', type: 'password'}
            },
            async authorize(credentials, req){

                if(!credentials) return null;

               
                const db = await connectDB();
                const [data]: any = await db.query('SELECT * FROM usuarios where email = ?',[credentials.email]);
                
                const usuario = data[0];
                const senhaCompare = await bcrypt.compare(credentials.senha,usuario.senha);

                if (senhaCompare) {

                    return{
                        id: usuario.email,
                        email: usuario.email,
                        name: usuario.nome || null,
                        image: null
                    }
                }
                
                return null;

               
            }
        })
    ],
    pages:{
        signIn: '/login'
    },
    callbacks:{
        async jwt({token, user}){
            
            if(user){
                token.id = user.id;
            }
            console.log('Token no callback: ', token)
            return token;
        }
    }
}

const handler = NextAuth(nextAuthOptions);

export {handler as GET, handler as POST}
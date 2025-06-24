'use client'
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
interface ProtectedPageProps{
    children: ReactNode
}
export default function ProtectedPage({children}: ProtectedPageProps){
    return <SessionProvider>{children}</SessionProvider>
}
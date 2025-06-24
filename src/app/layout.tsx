import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Roboto } from "next/font/google";
import ProtectedPage from "@/providers/sessionProvider";
const roboto = Roboto({
  weight: ['400','700'],
  subsets:['latin'],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ThecNoBlog",
  description: "O blog para suas ideias e pensamentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={roboto.className}
      >
         <ProtectedPage> {children} </ProtectedPage>
      </body>
    </html>
  );
}

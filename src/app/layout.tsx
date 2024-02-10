import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/assets/nav/navbar";
const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ["100"  , "300" , "400" , "500" ,  "700" , "900"] })

export const metadata: Metadata = {
  title: "Todo-list",
  description: "...",
  icons:{
    icon: "/icons/favicon.png"
    
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
      </head>
      <body className={roboto.className}>
        <Navbar />
        {children}
        </body>
    </html>
  );
}

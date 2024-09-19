import type { Metadata } from "next";
import { Poppins } from 'next/font/google'

import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Desafio Frontend",
  description: "Desafio Frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${poppins.className} bg-[#64D7C7]`}>
      <body>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, Open_Sans } from 'next/font/google';
import MenuSideBar from "@/components/menu/menu";

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] })
const openSans = Open_Sans({ subsets: ['latin'], weight: ['400', '700'] })
export const metadata: Metadata = {
  title: "Searching...",
  description: "Ainda não decidido",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${montserrat.className} ${openSans.className} antialiased`}
      >
        <MenuSideBar />
        {children}
      </body>
    </html>
  );
}

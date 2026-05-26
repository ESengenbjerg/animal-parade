import type { Metadata } from "next";
import "./globals.css";
import { Fredoka } from "next/font/google";
import { Nunito } from "next/font/google";

export const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-fredoka",
});

export const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Animal Parade",
  description: "Welcome to the Animal Parade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${fredoka.variable}`}>
      <body>
        <div id="page-transition" className="page-transition"></div>
        {children}
      </body>
    </html>
  );
}

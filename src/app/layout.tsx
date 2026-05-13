import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

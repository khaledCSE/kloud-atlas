import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Poppins } from "next/font/google"

import "./globals.css";
import { ReactNode } from "react";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})


export const metadata: Metadata = {
  title: "Kloud Atlas | A cloud-based storage solution",
  description: "Kloud Atlas - A cloud-based storage solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

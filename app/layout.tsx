import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import Banner from "@/components/common/banner/Banner";
import NavBar from "@/components/common/navbar/Navbar";
export const metadata: Metadata = {
  title: "Dental Clinic",
  description: "Developed by Neat Tech",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-neat`}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

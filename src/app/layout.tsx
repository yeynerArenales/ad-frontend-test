import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import { Breadcrumb } from "@/components/molecules/breadcrumb";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apply Digital Test",
  description: "Frontend development test for Apply Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <Breadcrumb />
        <main className="flex-grow px-4 lg:px-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

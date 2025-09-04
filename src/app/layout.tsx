import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import ClientProviders from "@/components/ClientProviders";
import { LoadingProvider } from "@/context/LoadingContext";
import GlobalLoader from "@/components/GlobalLoader";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-commerce Store",
  description: "Created by Daniel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <LoadingProvider>
            <GlobalLoader /> {/* Client Component */}
            <ClientProviders>{children}</ClientProviders>
          </LoadingProvider>
        </CartProvider>
      </body>
    </html>
  );
}

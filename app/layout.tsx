import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthDetailsProvider } from "@/contexts/authContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SupplierTaxi",
  description:
    "SupplierTaxi - Quality sand products for all your construction needs.",
  icons: {
    icon: "favicon.ico",
  },
  openGraph: {
    title: "SupplierTaxi",
    description:
      "SupplierTaxi - Quality sand products for all your construction needs.",
    url: "https://www.suppliertaxi.com",
    siteName: "SupplierTaxi",
    images: [
      {
        url: "https://www.suppliertaxi.com/plastering_m_sand.png",
        width: 1200,
        height: 630,
        alt: "SupplierTaxi",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthDetailsProvider>{children}</AuthDetailsProvider>
      </body>
    </html>
  );
}

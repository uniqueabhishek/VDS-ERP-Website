import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
// Self-hosted Material Symbols icons
import "material-symbols";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "VDS ERP",
  description: "Enterprise Resource Planning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={manrope.className}>{children}</body>
    </html>
  );
}

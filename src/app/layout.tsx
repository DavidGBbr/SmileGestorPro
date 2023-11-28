"use client";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";
import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={poppins.className} style={{ background: "#090b13" }}>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}

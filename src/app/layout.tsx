import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Smile Gestor Pro",
  description: "Gerencie sua clínica sem esforço hoje mesmo!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

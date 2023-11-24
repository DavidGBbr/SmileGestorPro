"use client";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import { Providers } from "./providers";
import { AuthProvider } from "@/context/AuthContext";
import { checkPublic } from "@/utils/checkPublic";
import PrivateRoute from "@/components/PrivateRoute";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicPage = checkPublic(pathname);
  return (
    <html lang="pt-br">
      <body className={poppins.className} style={{ background: "#090b13" }}>
        <Providers>
          <AuthProvider>
            {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}
            {isPublicPage && children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}

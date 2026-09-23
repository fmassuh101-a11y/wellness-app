import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

/**
 * Nada de esta app se genera de antemano.
 *
 * Todo el árbol va envuelto en AuthProvider, que consulta la sesión de
 * Supabase al montarse. Durante la construcción no hay navegador ni sesión, y
 * ese intento reventaba el prerenderizado de /login y tumbaba la publicación
 * entera.
 *
 * Marcarlo acá —en el layout raíz, que sí es componente de servidor— aplica a
 * todas las pantallas de una vez. Las páginas se arman cuando alguien las
 * visita, que es cuando existe todo lo que necesitan.
 */
export const dynamic = 'force-dynamic';


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WellnessHub - Your Journey to Better Health",
  description: "Supporting your physical and mental health through resources, community, and personalized wellness tools.",
  keywords: "wellness, health, mental health, physical fitness, meditation, community support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

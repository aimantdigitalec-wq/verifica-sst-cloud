import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verifica SST Cloud - Gestión de Seguridad y Salud Ocupacional",
  description:
    "Plataforma SaaS para empresas ecuatorianas para cumplir con normativa de SST",
  keywords: [
    "SST",
    "Seguridad",
    "Salud Ocupacional",
    "Ecuador",
    "Normativa",
    "Verificación",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

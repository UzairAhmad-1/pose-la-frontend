import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "POSE-LA - Emotional Support App",
  description:
    "Discuss with SOYA - Your empathetic emotional intelligence companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

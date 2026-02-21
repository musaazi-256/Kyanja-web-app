import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Kyanja Junior School",
  description: "Nurturing excellence and character in every child."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import React from "react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { esMX } from "@clerk/localizations";
export const metadata = {
  title: "Gemet",
  description: "Gestion Metrologica",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={esMX}>
      <html lang="en">
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

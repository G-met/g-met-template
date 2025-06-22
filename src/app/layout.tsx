import React from "react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { esMX } from "@clerk/localizations";
import QueryProvider from "./provider/react-query";
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
      <QueryProvider>
        <html lang="en">
          <body>
            {children}
            <Toaster />
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}

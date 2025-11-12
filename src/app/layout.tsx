import React from "react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { esMX } from "@clerk/localizations";
import QueryProvider from "./provider/react-query";
import type { Metadata } from "next";

export const metadata: Metadata = {
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
          <head>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
          </head>
          <body>
            {children}
            <Toaster />
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}

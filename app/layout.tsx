// app/layout.tsx  (Server Component, no "use client")
import type { Metadata } from "next";
import React from "react";
import { Navigation } from "@/components/navigation";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Permias SDIA",
  description: "Created with v0",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">
        <Navigation />
        {children}
      </body>
    </html>
  );
}

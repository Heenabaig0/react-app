import type { Metadata } from "next";
import "./globals.css";
import AppShell from "./AppShell";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "My app",
  description: "Drawer navigation and tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AppShell>{children}</AppShell>
        </StoreProvider>
      </body>
    </html>
  );
}

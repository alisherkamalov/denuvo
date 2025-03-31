import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
export const metadata: Metadata = {
  title: "Denuvo",
  description: "The Best Messenger",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

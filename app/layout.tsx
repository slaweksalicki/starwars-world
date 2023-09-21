import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Star Wars World",
  description: "Characters, vehicles and planets from Star Wars movies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}

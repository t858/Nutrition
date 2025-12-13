import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "./providers/QueryProvider";

export const metadata: Metadata = {
  title: "Pavanvalentina - Personalized Nutrition Consultation",
  description:
    "Professional nutrition consultation services tailored to your health goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

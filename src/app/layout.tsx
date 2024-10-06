import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./styles/globals.css";
const inter = Inter({ subsets: ["latin"] });
import { CustomQueryClientProvider } from "@/components/CustomQueryClientProvider";

export const metadata: Metadata = {
  title: "Ai Mind Map",
  description: "By Gabriel Barros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomQueryClientProvider>
          {children}
        </CustomQueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./styles/globals.css";
import { AuthProvider } from "./context/useAuth";
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
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
      <body className={poppins.className}>
        <CustomQueryClientProvider>
          <AuthProvider>{children}</AuthProvider>
        </CustomQueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}

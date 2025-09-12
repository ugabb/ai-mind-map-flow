import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./styles/globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
import { CustomQueryClientProvider } from "@/components/CustomQueryClientProvider";
import AuthContext from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/theme-provider";

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
    <AuthContext>
      <html lang="en" suppressHydrationWarning>
        <body className={poppins.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CustomQueryClientProvider>{children}</CustomQueryClientProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </AuthContext>
  );
}

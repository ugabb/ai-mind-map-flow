'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

interface CustomQueryClientProviderProps {
  children: ReactNode;
}

export const CustomQueryClientProvider = ({
  children,
}: CustomQueryClientProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

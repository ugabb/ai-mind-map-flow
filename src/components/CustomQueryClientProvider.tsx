'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'

type CustomQueryClientProviderProps = {
  children: ReactNode
}

export const CustomQueryClientProvider = ({
  children,
}: CustomQueryClientProviderProps) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

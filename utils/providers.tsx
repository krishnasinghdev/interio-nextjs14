"use client"

import React, { ReactNode, useState } from "react"
import { store } from "@/context/store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Provider } from "react-redux"

type ReduxProviderType = {
  children: ReactNode
}

function ReduxProvider({ children }: ReduxProviderType) {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

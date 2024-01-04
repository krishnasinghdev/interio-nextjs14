import { TailwindIndicator } from "../components/TailwindIndicator"

import "./globals.css"

import { Metadata } from "next"
import { Roboto } from "next/font/google"
import QueryProvider from "@/providers/query-provider"
import ReduxProvider from "@/providers/redux-provider"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"

import { Toaster } from "@/components/ui/sonner"

import { ourFileRouter } from "./api/uploadthing/core"
import ExtraComponents from "./extra"

const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
})

export const metadata: Metadata = {
  title: "Interior Design | Home",
  description: "Interior Design Shots, Get Inspired By Other Designer's Works",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <QueryProvider>
          <ReduxProvider>
            {children}
            <ExtraComponents />
          </ReduxProvider>
        </QueryProvider>
        <Toaster />
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <TailwindIndicator />
      </body>
    </html>
  )
}

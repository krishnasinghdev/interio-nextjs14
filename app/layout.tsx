import { TailwindIndicator } from "../components/TailwindIndicator"

import "./globals.css"

import { Metadata } from "next"
import { Poppins } from "next/font/google"
import QueryProvider from "@/providers/query-provider"
import ReduxProvider from "@/providers/redux-provider"

import Context from "./context"

const poppins = Poppins({
  subsets: ["latin"],
  weight: "500",
})

export const metadata: Metadata = {
  title: "Interior Design | Home",
  description: "Interior Design Shots, Get Inspired By Other Designer's Works",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <QueryProvider>
          <ReduxProvider>
            <div id="modal" />
            {children}
            <TailwindIndicator />
            <Context />
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  )
}

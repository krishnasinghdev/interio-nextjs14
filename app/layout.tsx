import { TailwindIndicator } from "../components/TailwindIndicator"
import ReduxProvider from "./provider"

import "./globals.css"

import { Metadata } from "next"
import { Poppins } from "next/font/google"

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
        <ReduxProvider>
          <div id="modal" />
          {children}
          <TailwindIndicator />
          <Context />
        </ReduxProvider>
      </body>
    </html>
  )
}

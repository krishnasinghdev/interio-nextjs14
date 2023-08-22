import { TailwindIndicator } from "../components/TailwindIndicator"
import ReduxProvider from "./provider"

import "./globals.css"

import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: "500",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Interio</title>
      </head>
      <body className={poppins.className}>
        <ReduxProvider>
          <div id="modal" />
          {children}
          <TailwindIndicator />
        </ReduxProvider>
      </body>
    </html>
  )
}

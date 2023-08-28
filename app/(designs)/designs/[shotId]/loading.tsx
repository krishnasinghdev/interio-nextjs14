import React from "react"

import { Icons } from "@/components/Icons"

export default function loading() {
  return (
    <div className="flex items-center justify-center ">
      <h1>
        Fetching Shot <Icons.Loading />
      </h1>
    </div>
  )
}

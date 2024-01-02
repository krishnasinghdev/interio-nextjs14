"use client"

import React from "react"
import { useAppDispatch } from "@/context/hook"
import { togglePanel } from "@/context/theme"
import { toast } from "sonner"

export default function Page() {
  const dispatch = useAppDispatch()

  return (
    <div className="flex justify-center bg-white p-8">
      <button
        className="bg-trans rounded px-4 py-2 text-white"
        onClick={() =>
          toast("My toast", {
            description: "My description",
            duration: 2000,
          })
        }
      >
        toast
      </button>
      <button className="bg-trans rounded px-4 py-2 text-white" onClick={() => dispatch(togglePanel("signin"))}>
        Sign in
      </button>
      <button className="mr-4 w-20 bg-border">border</button>
      <button className="mr-4 w-20 bg-input">input</button>
      <button className="mr-4 w-20 bg-ring">ring</button>
      <button className="mr-4 w-20 bg-background">background</button>
      <button className="mr-4 w-20 bg-foreground">foreground</button>
      <button className="mr-4 w-20 bg-primary">primary</button>
      <button className="mr-4 w-20 bg-secondary">secondary</button>
      <button className="mr-4 w-20 bg-destructive">destructive</button>
      <button className="mr-4 w-20 bg-muted">muted</button>
      <button className="mr-4 w-20 bg-accent">accent</button>
      <button className="mr-4 w-20 bg-popover">popover</button>
      <button className="mr-4 w-20 bg-card">card</button>
    </div>
  )
}

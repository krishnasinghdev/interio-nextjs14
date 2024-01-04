"use client"

import * as React from "react"
import { cn } from "@/utils"

import { Icons } from "../Icons"
import { Separator } from "./separator"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [on, setOn] = React.useState(false)
  return (
    <div className="flex items-center">
      <input
        type={on ? "text" : "password"}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      <div className="absolute right-8 flex items-center bg-background">
        <Separator orientation="vertical" className="mr-2 h-6" />
        {on ? (
          <Icons.EyeOn onClick={() => setOn(!on)} className="cursor-pointer text-muted-foreground" size={24} />
        ) : (
          <Icons.EyeOff onClick={() => setOn(!on)} className="cursor-pointer text-muted-foreground" size={24} />
        )}
      </div>
    </div>
  )
})
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      <div className="absolute right-8 flex items-center bg-background">
        <Separator orientation="vertical" className="mr-2 h-6" />
        <button>
          <Icons.Search className="cursor-pointer text-muted-foreground" size={22} />
        </button>
      </div>
    </div>
  )
})
SearchInput.displayName = "SearchInput"

export { SearchInput }

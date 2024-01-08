import React from "react"
import Image from "next/image"
import Link from "next/link"

import { shotData } from "@/types/shotType"
import { Icons } from "@/components/icons"

export default function ShotCard({ shot }: { shot: shotData }) {
  return (
    <div key={shot._id} className="mb-2 sm:mb-4">
      <Link href={`/designs/${shot._id}`}>
        <Image
          src={shot.images[0].url}
          alt="l1img"
          height={350}
          quality={100}
          width={370}
          className="duration-400 h-52 w-80 cursor-pointer rounded object-fill transition-all hover:scale-95"
        />
      </Link>
      <div className="text-gray flex justify-between px-2 py-2">
        <span className="text-xs md:text-sm">
          <Icons.BsChatDots className="inline" /> 1.1k
        </span>
        <p className="flex gap-2">
          <span className="text-xs md:text-sm">
            <Icons.AiOutlineHeart className="inline" /> 1.1k
          </span>
          <span className="text-xs md:text-sm">
            <Icons.AiOutlineEye className="inline" /> 1.1k
          </span>
        </p>
      </div>
    </div>
  )
}

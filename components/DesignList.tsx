import Image from "next/image"
import Link from "next/link"

import { shotData } from "../types/shotType"
import { Icons } from "./Icons"

const DesignList = ({ shots }: { shots: shotData[] }) => {
  return (
    <div className="grid grid-cols-2 justify-items-center gap-3 md:grid-cols-3 xl:grid-cols-4">
      {shots.map((shot: shotData) => (
        <div key={shot._id} className="mb-2 sm:mb-4">
          <Link href={`/designs/${shot._id}`}>
            <Image
              src={shot.images[0].url}
              alt="l1img"
              height={350}
              quality={100}
              width={370}
              className="cursor-pointer rounded transition-all duration-200 hover:scale-105"
            />
          </Link>
          <div className="flex justify-between px-2 py-2 text-gray">
            <span className="text-xs md:text-base">
              <Icons.BsChatDots className="inline" /> 1.1k
            </span>
            <p className="flex gap-2">
              <span className="text-xs md:text-base">
                <Icons.AiOutlineHeart className="inline" /> 1.1k
              </span>
              <span className="text-xs md:text-base">
                <Icons.AiOutlineEye className="inline" /> 1.1k
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DesignList

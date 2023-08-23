import Image from "next/image"
import Link from "next/link"
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai"
import { BsChatDots } from "react-icons/bs"

import { shotData } from "../types/shotType"

const DesignList = ({ shots }: { shots: shotData[] }) => {
  return (
    <div className="grid grid-cols-2 justify-items-center gap-3 md:grid-cols-3 lg:grid-cols-4">
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
              <BsChatDots className="inline" /> 1.1k
            </span>
            <p className="flex gap-2">
              <span className="text-xs md:text-base">
                <AiOutlineHeart className="inline" /> 1.1k
              </span>
              <span className="text-xs md:text-base">
                <AiOutlineEye className="inline" /> 1.1k
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DesignList

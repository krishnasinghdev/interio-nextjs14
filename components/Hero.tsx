import Image from "next/image"
import Link from "next/link"

import { Icons } from "./Icons"

const Hero = () => {
  return (
    <main className="grid h-[60vh] grid-cols-12 items-center bg-[#7270FF] text-white sm:h-[90vh]">
      <div className="start2 col-span-12 sm:col-span-7">
        <h1 className="text-2xl font-semibold drop-shadow-xl lg:text-4xl">
          Interior Designs Just <br /> a click away
        </h1>
        <p className="my-4 text-lg ">
          Discover a community of interior designers on Xyz. <br /> Post your works or get inspired by others
        </p>
        <button className="mt-4 flex items-center gap-4 ">
          <Link href={"/designs"} className="bg-dark rounded-full px-4 py-2">
            Explore Designs
          </Link>
          <p className="text-dark flex items-center font-bold ">
            <span className="mr-2  rounded-full bg-[#1B1A20] p-2">
              <Icons.BsFillPlayFill className="text-2xl text-primary" />
            </span>
            View Demo
          </p>
        </button>
      </div>
      <div className="col-span-4 hidden h-[90vh] items-center justify-start bg-[#1B1A20] lg:flex">
        <Image
          src={"/hero-right.png"}
          alt="hero section images"
          width={750}
          height={750}
          className="xl:-ml-68 -ml-24 -mt-12 md:-ml-40 lg:-ml-52"
        />
      </div>
    </main>
  )
}

export default Hero

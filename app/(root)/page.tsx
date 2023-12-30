import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"

import { getShot } from "@/lib/actions/shot.actions"
import Hero from "@/components/Hero"
import IconList from "@/components/motion/icon-list"
import RectangleCard from "@/components/RectangleCard"

const Home: NextPage = async () => {
  const { shots } = await getShot(10)

  return (
    <section className="bg-dark">
      <Hero />
      <IconList />

      {/* SHOTS SECTION */}
      <h1 className="text-gray pt-16 text-center text-4xl font-bold">SHOTS</h1>
      <p className="text-gray mt-4 text-center">
        Upload Interior Design Shots Or Get Inspired <br /> By Other Designer&apos;s Works
      </p>

      <div className="padding py-16 text-2xl sm:text-4xl">
        {SHOTDATA.map((_, i) => (
          <Link
            href="/designs/modern"
            className="border-gray  group flex items-center justify-between border-y p-4 hover:cursor-pointer hover:bg-[#292929]  "
            key={i}
          >
            <h3 className="text-gray group-hover:text-white sm:my-2 ">{_.title}</h3>
            <Image
              src={"/arrow.png"}
              alt="arrow icon"
              height={50}
              width={50}
              className="hidden bg-primary  p-2 md:group-hover:block "
            />
          </Link>
        ))}
      </div>

      {/* WEBSITE TEMPLATE IMAGES */}

      <Image src={"/imac.png"} alt="music bg" height={700} width={500} className="m-auto my-8 hidden md:block" />
      <Image src={"/phone.png"} alt="music bg" height={350} width={350} className="m-auto my-8 md:hidden" />

      {/* SHOT LISTS */}
      <h1 className="padding text-gray pt-16 text-center text-4xl font-bold uppercase">
        OVER <span className="text-primary">205+</span> Shots of <br /> INTERIOR dESIGN
      </h1>

      <div className="padding grid grid-cols-2 gap-4 md:grid-cols-5">
        {shots &&
          shots.map((_, i) => (
            <div key={i}>
              <span className=" absolute m-2 rounded-2xl bg-pink-500 px-2 py-0 text-sm text-white">24k</span>
              <Link href={`/designs/${_._id}`}>
                <Image src={_.images[0].url} height={250} width={250} alt={"man"} className="rounded hover:cursor-pointer " />
              </Link>
              {/* <p>{_.title}</p> */}
            </div>
          ))}
      </div>
      <p className="border-gray m-auto mt-6 w-3/4 border-b pb-16 text-center">
        <Link href={"/designs"} className="rounded-md bg-primary px-8 py-2 font-semibold text-black">
          SEE MORE
        </Link>
      </p>

      <div className="my-16 grid grid-cols-5 justify-items-start">
        <div className="hidden lg:col-span-2 lg:block ">
          <Image src={"/saly.png"} height={500} width={500} alt={"saly"} />
        </div>
        <div className="padding col-span-5 mr-4 sm:mr-8 lg:col-span-3 xl:mr-32">
          <h1 className="text-gray pt-8 text-4xl font-bold   uppercase">
            WHAT OUR
            <span className="text-primary"> USERS</span>
            <br /> SAY ABOUT US
          </h1>
          <p className="text-gray my-6">
            Our users are our strength. We do every thing possible to make their experience unique and effortless.
          </p>
          <div className="card text-gray my-4 p-4 ">
            <p>
              Interio Design is a true treasure trove for interior enthusiasts! The site boasts an exquisite array of design
              inspirations, from sleek modernism to cozy rustic vibes. Navigating the user-friendly interface is a breeze, and the
              curated galleries provide endless ideas. Whether you&apos;re a novice or a seasoned designer, this site is a must-visit
              for endless creative sparks!
            </p>

            <h6 className="mt-4 font-semibold text-primary">STIEVE JOHN MATT</h6>
            <p>Interior Designer</p>
          </div>
        </div>
      </div>

      <RectangleCard />
      {/* FOOTER */}
      <div className="z-0 flex h-auto flex-col items-center justify-center gap-y-2 bg-primary py-24 text-center leading-10 text-[rgba(255,255,255,0.75)] ">
        <Link href="/">
          <Image src={"/interio.png"} alt="interio logo" height={40} width={40} />
        </Link>
        <p className="px-2 md:px-6 lg:px-10">
          Modern Designs | Minimal Designs | Luxurious Designs | Space Saving Designs <br /> Dark themed Designs | Hotel Room Designs |
          Terms & Conditions Privacy Policy | About us
        </p>
        <p>Handcrafted by © XYZ Company 2023</p>
        <p>Made with 💖 </p>
      </div>
    </section>
  )
}

export default Home

const SHOTDATA = [
  {
    image: "/Group1.png",
    title: "Modern Designs",
    description: "Modern Designs",
  },
  {
    image: "/Group2.png",
    title: "Minimal Designs",
    description: "Minimal Designs",
  },
  {
    image: "/Group3.png",
    title: "Space Saving",
    description: "Space Saving",
  },
  {
    image: "/Group4.png",
    title: "Luxurious Designs",
    description: "Luxurious Designs",
  },
]

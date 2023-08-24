import type { Metadata, NextPage } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Interior Design | Home",
  description: "Interior Design Shots, Get Inspired By Other Designer's Works",
}

const About: NextPage = () => {
  return (
    <main className="padding min-h-screen bg-dark">
      <div className="flex justify-center gap-8 pt-16 text-gray">
        <div>
          <h1 className="text-2xl text-white">About us</h1>
          <p className="py-8 text-lg">
            We kickstarted the operations in early 2021 with the goal of
            providing the best collaborating features for free. So that every
            team whether small or big can use the app with zero concerns. So I
            and my co-founder founded this company, and we named it CRUX.
          </p>
          <p className="pb-8 text-lg">
            After working for about a year we are happy to finally launch the
            initial version of the app. Right now, we are working hard to add
            other very essential features that will make your collaboration
            experience really fast and way more powerful.
          </p>
          <h2> Try out Interio now</h2>
        </div>
        <Image
          src={"/imac.png"}
          height={500}
          width={500}
          alt="imac"
          className="hidden lg:block"
        />
      </div>
      <section className="mt-8 flex flex-col items-center gap-8 pb-16 sm:flex-row md:gap-16">
        <div>
          <Image src={"/p1.png"} alt="person" height={200} width={200} />
          <h2 className="mt-8 pb-2 font-semibold tracking-wider text-white">
            Anubhav
          </h2>
          <p className="text-gray"> Co-founder & UI/UX Designer</p>
        </div>
        <div>
          <Image src={"/p2.png"} alt="person" height={200} width={200} />
          <h2 className="mt-8 pb-2 font-semibold tracking-wider text-white">
            Shivam
          </h2>
          <p className="text-gray">Co-founder & Full-Stack Developer</p>
        </div>
      </section>
    </main>
  )
}

export default About

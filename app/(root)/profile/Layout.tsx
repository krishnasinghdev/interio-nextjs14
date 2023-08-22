import type { ReactElement } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import clsx from "clsx"
import { useSelector } from "react-redux"

import SideLayout from "../../components/SideLayout"
import { isLogin as loginStatus, vendor as vd } from "../../context/theme"
import { reduxVendor } from "../../types/shotType"

type Props = {
  children?: React.ReactNode
  way?: String
}

export default function Layout({ children, way }: Props): ReactElement {
  const isLogin = useSelector<Boolean>(loginStatus)
  const vendor = useSelector<reduxVendor>(vd)
  const router = useRouter()

  return (
    <SideLayout way="without">
      <Image
        key={2}
        src={"/coverimg.png"}
        alt="cover_image"
        className=""
        height={300}
        width={1300}
      />
      {isLogin ? (
        <>
          <section className="-mt-4 flex items-center justify-between px-8 text-white">
            <div className="flex items-center gap-4  ">
              <Image src={"/dp2.png"} alt="dp2" width={100} height={100} />
              <div>
                {/* @ts-ignore */}
                <h1>{vendor?.vendor}</h1>
                <p className="text-xs text-gray">
                  0 Followers | 0 Following | 21 Likes
                </p>
              </div>
            </div>
            <div className="">
              {router?.pathname == "/profile/about" && (
                <button className="cborder mr-4   rounded bg-trans px-4 py-2 ">
                  Change Password
                </button>
              )}
              <Link
                href={"/profile/about/edit"}
                className="  rounded bg-primary px-4 py-2 "
              >
                Edit Profile
              </Link>
            </div>
          </section>
          <header className="flex items-center justify-around py-4 text-gray">
            <Link
              href={"/profile/work"}
              className={clsx(
                { "text-primary": router?.query?.tab == "work" },
                "hover:text-primary"
              )}
            >
              Works
            </Link>
            <Link
              href={"/profile/liked-shot"}
              className={clsx(
                { "text-primary": router?.query?.tab == "liked-shot" },
                "hover:text-primary"
              )}
            >
              Liked Shots
            </Link>
            <Link
              href={"/profile/collection"}
              className={clsx(
                { "text-primary": router?.query?.tab == "collection" },
                "hover:text-primary"
              )}
            >
              Collections
            </Link>
            <Link
              href={"/profile/about"}
              className={clsx(
                { "text-primary": router?.query?.tab == "about" },
                "hover:text-primary"
              )}
            >
              About me
            </Link>
          </header>
          <div className="px-8 ">
            <p className="mb-4 w-full border-[0.5px] border-gray px-4" />
            {children}
          </div>
        </>
      ) : (
        <h1 className="mt-8 text-center text-gray">
          Login/Signup to access messages!
        </h1>
      )}
    </SideLayout>
  )
}

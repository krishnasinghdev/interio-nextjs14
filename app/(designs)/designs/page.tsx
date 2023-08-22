import Head from "next/head"
import Link from "next/link"
import { isLogin as loginStatus, toggleModal } from "@/context/theme"
// import SideLayout from "@/components/SideLayout";
import { useDispatch, useSelector } from "react-redux"

// import axios from "axios";
import { shotData } from "@/types/shotType"
import { getShot } from "@/lib/actions/shot.actions"
import DesignList from "@/components/DesignList"

export async function getDesigns() {
  const result = {
    shots: [
      {
        _id: "642ed1d9a69faebb7421d582",
        title: "Hotel Room",
        category: "room",
        description:
          "Interior design is the art and science of enhancing the interior of a building to achieve a healthier and more aesthetically pleasing environment for the people using the space. An interior designer is someone who plans, researches, coordinates, and manages such enhancement projects.",
        tags: ["Minimal", "Modern", "Luxurious"],
        images: [
          {
            title: "Hotel Room",
            url: "https://res.cloudinary.com/ds8j4z2nf/image/upload/v1678014721/Interio/l5_z8ydxy.png",
            _id: "642ed1d9a69faebb7421d583",
          },
        ],
        owner: {
          _id: "642ed18ca69faebb7421d57b",
          name: "Krishna Singh",
          email: "singhks0054@gmail.com",
          follower: [],
          following: [],
        },
      },
    ],
  }

  try {
    const data = await getShot()
    if (data) {
      result.shots = data.shot
    }
  } catch (error) {}

  return result
}

export default async function Designs() {
  const { shots }: { shots: shotData[] } = await getDesigns()
  console.log(shots)

  // const dispatch = useDispatch()
  // const isLogin = useSelector<boolean>(loginStatus)
  const isLogin = true

  return (
    <>
      <Head>
        <title>Interio -&gt; Designs</title>
      </Head>

      {/* LOGO + BUTTON */}
      <div className="flex items-center justify-between">
        <Link href="/" className="font-bold tracking-wider ">
          Interio
        </Link>
        <p>
          {isLogin ? (
            <Link
              href="/designs/upload"
              className="mr-4 rounded bg-primary px-4 py-2"
              // onClick={() => dispatch(toggleSignup(true))}
            >
              Upload Shot
            </Link>
          ) : (
            <>
              <button
                className="mr-4 rounded bg-primary px-4 py-2"
                // onClick={() =>
                //   dispatch(
                //     toggleModal({ showModal: true, modalType: "signup" })
                //   )
                // }
              >
                Sign up
              </button>
              <button
                className="rounded bg-trans px-4 py-2"
                // onClick={() =>
                //   dispatch(
                //     toggleModal({ showModal: true, modalType: "signin" })
                //   )
                // }
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
      {/* SEARCH + TAGS */}
      <div className="my-4 w-full">
        <input
          type="text"
          placeholder="Search for anything ..."
          className="w-full rounded bg-trans px-4 py-2  "
        />
        <div className="mt-4 flex gap-4 overflow-x-auto pb-4">
          <button className="whitespace-nowrap rounded bg-primary px-4 py-2 ">
            Modern
          </button>
          <button className="whitespace-nowrap rounded bg-trans px-4 py-2 ">
            Minimal
          </button>
          <button className="whitespace-nowrap rounded bg-trans px-4 py-2">
            Dark Theme
          </button>
          <button className="whitespace-nowrap rounded bg-trans px-4 py-2 ">
            Hotel Room
          </button>
          <button className="whitespace-nowrap rounded bg-trans px-4 py-2 ">
            Luxurious
          </button>
          <button className="whitespace-nowrap rounded bg-trans px-4 py-2 ">
            Space Saving
          </button>
        </div>
      </div>
      {shots?.length > 0 ? (
        <DesignList shots={shots} />
      ) : (
        <p className="text-center">Nothing to show!</p>
      )}
    </>
  )
}

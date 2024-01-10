import Image from "next/image"
import { shotData } from "@/types"

import { getShot, getShotById } from "@/lib/actions/shot.actions"
import { Icons } from "@/components/icons"

import ShotCard from "../shot-card"

export type Props = {
  params: {
    shotId: string
  }
}

const ShotId = async ({ params }: Props) => {
  const shot = await getShotById(params.shotId)
  const moreShot = await getShot("", 4)

  if (!shot || shot.error) return <p className="text-center">Shot not found!</p>

  return (
    <>
      <Image src={shot?.images[0]?.url ? shot.images[0].url : "/group1/png"} alt="bed" height={500} width={1400} className="rounded" />
      <div className="my-8 flex justify-between">
        <div className="flex gap-x-4">
          <Image src={shot.owner.profilePic || "/user.png"} height={40} width={40} alt="man dp" className="rounded-lg" />
          <div>
            <h1>{shot?.title}</h1>
            <p className="text-gray text-xs">{shot?.owner?.name}</p>
          </div>
        </div>
        <div className="flex gap-x-4 ">
          <button className="cborder bg-trans rounded px-4 py-2">Save</button>
          <button className="bg-trans rounded border border-pink-500 px-4 py-2">
            <Image src={"/pheart.png"} alt="heart-icon" height={20} width={20} className="inline" /> Like
          </button>
        </div>
      </div>

      <div className="my-8 flex items-center justify-center gap-4">
        <button className="cborder bg-trans rounded px-4 py-2">
          <Icons.BsChatDots />
        </button>
        <button className="cborder bg-trans rounded px-4 py-2">
          <Icons.FiFolderMinus />
        </button>
        <button className="cborder bg-trans rounded px-4 py-2">
          <Icons.BsShareFill />
        </button>
      </div>
      <p className="border-gray my-8 w-full border-[0.5px]" />

      <p>{shot?.description}</p>

      <h2>I am available for new projects</h2>
      <p className="my-4">
        📪 Email:
        <a href={`mailto:${shot.owner.email}`}>
          <span className="text-primary"> {shot?.owner?.email}</span>
        </a>
      </p>
      <p className="border-gray my-8 w-full border-[0.5px]" />
      {/* {shot?.owner?._id === vendor.v_id && (
            <div className='my-8 flex items-center justify-center gap-4'>
              <button className='cborder rounded bg-trans px-4 py-2'>
                Edit
              </button>
              <button className='cborder rounded bg-trans px-4 py-2'>
                Edit Details
              </button>
              <button className='cborder rounded bg-trans px-4 py-2'>
                Delete
              </button>
            </div>
          )} */}

      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between">
          <p>Similar Shots</p>
          <p className="cursor-pointer text-primary hover:underline">View Profile</p>
        </div>
        <div className="flex gap-4 overflow-x-auto ">
          {moreShot &&
            moreShot.shots &&
            moreShot.shots.length > 0 &&
            moreShot.shots.map((shot) => <ShotCard key={shot._id} shot={shot as shotData} />)}
        </div>
      </div>
    </>
  )
}

export default ShotId

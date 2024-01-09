import { shotData } from "@/types"

import { getShot } from "@/lib/actions/shot.actions"

import ShotCard from "./shot-card"

type Props = {
  searchParams: { type: string }
}
export default async function Designs({ searchParams }: Props) {
  const type = searchParams.type
  const shots: shotData[] = []
  try {
    const data = await getShot(type)
    if (data) {
      shots.push(...(data.shots as shotData[]))
    }
  } catch (error) {
    console.log(error)
  }

  return (
    <>
      {shots?.length > 0 ? (
        <div className="grid grid-cols-2 justify-items-center gap-4 md:grid-cols-3 xl:grid-cols-4">
          {shots.map((shot: shotData) => (
            <ShotCard key={shot._id} shot={shot} />
          ))}
        </div>
      ) : (
        <p className="text-center">Nothing to show!</p>
      )}
    </>
  )
}

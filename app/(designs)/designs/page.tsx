import { DUMMYSHOT } from "@/utils/dummy"

import { shotData } from "@/types/shotType"
import { getShot } from "@/lib/actions/shot.actions"
import DesignList from "@/components/DesignList"

type Props = {
  searchParams: { type: string }
}
export default async function Designs({ searchParams }: Props) {
  const type = searchParams.type
  console.log({ type })
  const shots: shotData[] = []
  try {
    const data = await getShot(type)
    console.log(data)
    if (data) {
      shots.push(...(data.shots as shotData[]))
    }
  } catch (error) {
    shots.push(...DUMMYSHOT)
  }

  return <>{shots?.length > 0 ? <DesignList shots={shots} /> : <p className="text-center">Nothing to show!</p>}</>
}

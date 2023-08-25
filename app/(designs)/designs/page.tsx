import { DUMMYSHOT } from "@/utils/dummy"

import { shotData } from "@/types/shotType"
import { getShot } from "@/lib/actions/shot.actions"
import DesignList from "@/components/DesignList"

export default async function Designs() {
  const shots: shotData[] = []
  try {
    const data = await getShot()
    if (data) {
      shots.push(...(data.shots as shotData[]))
    }
  } catch (error) {
    shots.push(...DUMMYSHOT)
  }

  return (
    <>
      {shots?.length > 0 ? (
        <DesignList shots={shots} />
      ) : (
        <p className="text-center">Nothing to show!</p>
      )}
    </>
  )
}

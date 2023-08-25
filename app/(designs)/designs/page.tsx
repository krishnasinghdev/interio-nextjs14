import DesignList from "@/components/DesignList"
import { getShot } from "@/lib/actions/shot.actions"
import { shotData } from "@/types/shotType"
import { DUMMYSHOT } from "@/utils/dummy"

export default async function Designs() {

  const shots:shotData[] = []
  try {
    const data = await getShot()
    if (data) {
      shots.push(...data.shots as shotData[])
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

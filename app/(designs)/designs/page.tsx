import { shotData } from "@/types/shotType"
import { getShot } from "@/lib/actions/shot.actions"
import DesignList from "@/components/DesignList"

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

  return <>{shots?.length > 0 ? <DesignList shots={shots} /> : <p className="text-center">Nothing to show!</p>}</>
}

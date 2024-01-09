import { shotData } from "@/types"

import { getTabs } from "@/lib/actions/vendor.actions"
import ShotCard from "@/app/(designs)/designs/shot-card"

const Profile = async ({ params }: { params: { work: string } }) => {
  const { shots, error } = (await getTabs(params.work)) as { shots: shotData[]; error?: string }

  if (!shots || shots.length == 0 || error) return <div className="text-center text-foreground">Nothing to show!</div>

  return (
    <>
      <div className="grid grid-cols-2 justify-items-center gap-4 md:grid-cols-3 xl:grid-cols-4">
        {/* @ts-ignore - d */}
        {shots && shots.map((shot: shotData) => <ShotCard key={shot._id} shot={shot} />)}
      </div>
    </>
  )
}

export default Profile

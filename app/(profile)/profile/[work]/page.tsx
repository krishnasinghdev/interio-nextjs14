import { getTabs } from "@/lib/actions/vendor.actions"
import DesignList from "@/components/DesignList"

const Profile = async ({ params }: { params: { work: string } }) => {
  const shots = await getTabs(params.work)

  if (!shots) return <div>Nothing to show!</div>

  return (
    <>
      {/* @ts-ignore - d */}
      <DesignList shots={shots} />
    </>
  )
}

export default Profile

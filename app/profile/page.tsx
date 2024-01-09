import { formatDateInDMY } from "@/utils/helper"

import { getVendorProfile } from "@/lib/actions/vendor.actions"
import { Icons } from "@/components/icons"

const User = async () => {
  const { vendor, error } = await getVendorProfile()

  if (error || !vendor)
    return (
      <div className="text-center">
        <h1 className="text-red-500">Some error at our end!</h1>
        <p className="text-gray">{error}</p>
      </div>
    )

  return (
    <section className="space-y-6">
      <div>
        <h1 className="mb-1 text-xl text-primary underline decoration-foreground underline-offset-2">Biography</h1>
        <p className="text-sm text-foreground">{vendor?.biography}</p>
      </div>
      <div>
        <h1 className="mb-1 text-xl text-primary underline decoration-foreground underline-offset-2">Skills</h1>
        <div className="text-gray mt-2 flex flex-wrap gap-2">
          {vendor?.skills.map((_, i) => (
            <span className="rounded-3xl bg-secondary px-4 py-1 capitalize text-white" key={i}>
              {_}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h1 className="mb-1 text-xl text-primary underline decoration-foreground underline-offset-2">Work History</h1>
        {vendor.workHistory.length > 0 ? (
          vendor?.workHistory.map((_, i) => (
            <div className="mb-4 grid grid-cols-2 items-end justify-between gap-2 text-sm text-foreground lg:grid-cols-4" key={i}>
              <div>
                <h2 className="mb-1 text-base">{_.title}</h2>
                <h3 className="flex items-center gap-2 lg:ml-4">
                  <Icons.RiSuitcaseLine size={24} className="text-white" /> {_.company}
                </h3>
              </div>
              <p className="flex items-center gap-1">
                <Icons.Location size={24} className="text-white" /> {_.location}
              </p>
              <p className="flex items-center gap-1">
                <Icons.Calender size={24} className="text-white" /> {formatDateInDMY(_.from)}
              </p>
              <p className="flex items-center gap-1">
                <Icons.Calender size={24} className="text-white" />
                {formatDateInDMY(_.to) || "Now"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-foreground">No work history found</p>
        )}

        <div>
          <h1 className="mb-1 text-xl text-primary underline decoration-foreground underline-offset-2">Looking For</h1>
          {vendor.lookingFor.length > 0 ? (
            <div className="text-foreground">
              {vendor?.lookingFor.map((_, i) => (
                <div key={i} className="mb-2">
                  <h2 className="mb-1 text-base">{_.title}</h2>
                  <h3 className="flex items-center gap-2 lg:ml-4">
                    <Icons.Location size={24} className="text-white" /> {_.location}
                  </h3>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-foreground">No looking for found</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default User

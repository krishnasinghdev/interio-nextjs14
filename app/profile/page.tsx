import { getVendorProfile } from "@/lib/actions/vendor.actions"

const User = async () => {
  const { vendor, error } = await getVendorProfile()

  if (error)
    return (
      <div className="text-center">
        <h1 className="text-red-500">Some error at our end!</h1>
        <p className="text-gray">{error}</p>
      </div>
    )

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-xl text-primary">Biography</h1>
        <p className="text-sm text-foreground">{vendor?.biography}</p>
      </div>
      <div>
        <h1 className="text-xl text-primary">Skills</h1>
        <div className="text-gray mt-2 flex flex-wrap gap-2">
          {vendor?.skill.map((_, i) => (
            <span className="rounded-xl bg-secondary px-4 py-2 capitalize text-white" key={i}>
              {_}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl text-primary">Work History</h1>
        </div>
        <div className="text-gray mb-2 flex items-center justify-between text-sm">
          <h1 className="">Interior Design Lead at Xyz Agency</h1>
          <p className="">2022 - Present</p>
        </div>
        <div className="text-gray mb-2 flex items-center justify-between text-sm">
          <h1 className="">Junior Design Lead at Xyz Agency</h1>
          <p className="">2019 - 2022</p>
        </div>

        <div className="my-4 flex items-center justify-between">
          <h1 className="text-xl text-primary">Looking For</h1>
        </div>
        <div className="text-gray mb-2 flex items-center justify-between text-sm">
          <h1 className="">Interior Design Lead at Xyz Agency</h1>
          <p className="">2022 - Present</p>
        </div>
        <div className="text-gray mb-2 flex items-center justify-between text-sm">
          <h1 className="">Junior Design Lead at Xyz Agency</h1>
          <p className="">2019 - 2022</p>
        </div>
      </div>
    </section>
  )
}

export default User

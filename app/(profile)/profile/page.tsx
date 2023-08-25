"use client"

import React from "react"
import { isLogin } from "@/context/theme"
import { useSelector } from "react-redux"

const User = () => {
  const loginStatus = useSelector(isLogin)

  return (
    <>
      {loginStatus ? (
        <>
          <div className="my-8">
            <h1 className="mb-2 text-white">Biography</h1>
            <p className="text-sm text-gray">
              Lorem ipsum dolor sit amet consectetur. Fames sapien a suspendisse
              aliquam. Eleifend pellentesque aliquam porta habitant vestibulum
              odio amet. pellentesque aliquam porta habitant vestibulum porta
              habita sectetur. Fames sapien a susp uam. Eleifend pellentesque
              aliquam porta habitant vestibulum odio amet. pellentesque aliquam
              porta habitant vestibulum
            </p>
          </div>
          <div>
            <h1 className="mb-2 text-white">Skills</h1>
            <div className="mt-4 flex flex-wrap gap-4 text-gray">
              <button className="rounded bg-trans px-4 py-2">Modern</button>
              <button className="rounded bg-trans px-4 py-2">Minimal</button>
              <button className="rounded bg-trans px-4 py-2">Dark Theme</button>
              <button className="rounded bg-trans px-4 py-2">Hotel Room</button>
              <button className="rounded bg-trans px-4 py-2">Luxurious</button>
              <button className="rounded bg-trans px-4 py-2">
                Space Saving
              </button>
              <button className="rounded bg-trans px-4 py-2">Modern</button>
              <button className="rounded bg-trans px-4 py-2">Minimal</button>
              <button className="rounded bg-trans px-4 py-2">Dark Theme</button>
              <button className="rounded bg-trans px-4 py-2">Hotel Room</button>
              <button className="rounded bg-trans px-4 py-2">Luxurious</button>
              <button className="rounded bg-trans px-4 py-2">
                Space Saving
              </button>
            </div>
          </div>

          <div className=" mt-8 rounded bg-trans p-4 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-white">Work History</h1>
              <p className="text-primary">Edit Preference</p>
            </div>
            <div className="mb-2 flex items-center justify-between text-sm text-gray">
              <h1 className="">Interior Design Lead at Xyz Agency</h1>
              <p className="">2022 - Present</p>
            </div>
            <div className="mb-2 flex items-center justify-between text-sm text-gray">
              <h1 className="">Junior Design Lead at Xyz Agency</h1>
              <p className="">2019 - 2022</p>
            </div>

            <div className="my-4 flex items-center justify-between">
              <h1 className="text-white">Looking For</h1>
              <p className="text-primary">Edit Preference</p>
            </div>
            <div className="mb-2 flex items-center justify-between text-sm text-gray">
              <h1 className="">Interior Design Lead at Xyz Agency</h1>
              <p className="">2022 - Present</p>
            </div>
            <div className="mb-2 flex items-center justify-between text-sm text-gray">
              <h1 className="">Junior Design Lead at Xyz Agency</h1>
              <p className="">2019 - 2022</p>
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-center text-gray">
          Login/Signup to access messages!
        </h1>
      )}
    </>
  )
}

export default User

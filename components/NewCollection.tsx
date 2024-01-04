import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/utils"
import axios from "axios"

import { SearchInput } from "./ui/input"

const Collection = ({ className }: React.ComponentProps<"form">) => {
  const [col, setCol] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${process.env.API_URL}/vendor/collection`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if (data?.data) {
          setCol(data.data.col.shotCollections)
        }
      } catch (error) {}
    }
    fetchData()
  }, [])

  return (
    <section className={cn("grid items-start max-sm:px-4", className)}>
      <form className="my-8 w-full">
        <SearchInput type="text" placeholder="Search Collection..." />
      </form>
      {col && col.length > 0 ? (
        col.map((item: any) => (
          <div className="cborder bg-trans mb-4 flex items-center justify-between rounded p-2" key={item._id}>
            <div className="flex gap-4  ">
              <Image src={"/l1.png"} alt="ivon" height={90} width={80} className="rounded-lg" />
              <div>
                <h2 className="text-white">Minimalistic Design</h2>
                <p className="text-gray text-sm font-thin">19 Shots added * Updated 2 months ago</p>
              </div>
            </div>
            <button className="bg-trans flex rounded-full px-8 py-2 text-white">Add</button>
          </div>
        ))
      ) : (
        <p className="text-white">No Collection</p>
      )}

      <div className="mt-4 flex items-center gap-4">
        <button className="cborder bg-trans w-3/4 rounded px-4 py-2 text-white ">Create new collection </button>
        <button className="w-1/4 rounded bg-primary px-4 py-2 text-white ">Create</button>
      </div>
    </section>
  )
}

export default Collection

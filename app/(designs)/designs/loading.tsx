import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingDesigns() {
  return (
    <div className="grid grid-cols-2 justify-items-center gap-4 md:grid-cols-3 xl:grid-cols-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
        <LoadingCard key={index} />
      ))}
    </div>
  )
}

const LoadingCard = () => {
  return (
    <div className="">
      <Skeleton className="h-48 w-[17rem] rounded" />
      <div className="flex justify-between py-2">
        <Skeleton className="h-[20px] w-[40px] rounded" />
        <div className="flex gap-2">
          <Skeleton className="h-[20px] w-[40px] rounded" />
          <Skeleton className="h-[20px] w-[40px] rounded" />
        </div>
      </div>
    </div>
  )
}

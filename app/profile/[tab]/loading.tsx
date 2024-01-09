import { LoadingCard } from "../../(designs)/designs/loading"

export default function LoadingDesigns() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {[1, 2, 3, 4].map((_, index) => (
        <LoadingCard key={index} />
      ))}
    </div>
  )
}

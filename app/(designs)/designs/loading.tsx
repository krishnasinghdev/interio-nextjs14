export default function loading() {
  return (
    <div className="grid grid-cols-2 justify-items-center gap-3 md:grid-cols-3 lg:grid-cols-4">
      <div className="mb-2 animate-pulse sm:mb-4">
        <div className="bg-trans h-96 rounded sm:h-[200px]"></div>{" "}
        <div className="text-gray flex justify-between px-2 py-2">
          <div className="bg-trans h-4 w-20 rounded"></div> <div className="bg-trans ml-2 h-4 w-20 rounded"></div>{" "}
        </div>
      </div>
      <div className="mb-2 animate-pulse sm:mb-4">
        <div className="bg-trans h-96 rounded sm:h-[200px]"></div>{" "}
        <div className="text-gray flex justify-between px-2 py-2">
          <div className="bg-trans h-4 w-20 rounded"></div> <div className="bg-trans ml-2 h-4 w-20 rounded"></div>{" "}
        </div>
      </div>
    </div>
  )
}

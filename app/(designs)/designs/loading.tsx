export default function loading() {
  return (
    <div className="grid grid-cols-2 justify-items-center gap-3 md:grid-cols-3 lg:grid-cols-4">
      <div className="mb-2 animate-pulse sm:mb-4">
        <div className="h-96 rounded bg-trans sm:h-[200px]"></div>{" "}
        <div className="flex justify-between px-2 py-2 text-gray">
          <div className="h-4 w-20 rounded bg-trans"></div>{" "}
          <div className="ml-2 h-4 w-20 rounded bg-trans"></div>{" "}
        </div>
      </div>
      <div className="mb-2 animate-pulse sm:mb-4">
        <div className="h-96 rounded bg-trans sm:h-[200px]"></div>{" "}
        <div className="flex justify-between px-2 py-2 text-gray">
          <div className="h-4 w-20 rounded bg-trans"></div>{" "}
          <div className="ml-2 h-4 w-20 rounded bg-trans"></div>{" "}
        </div>
      </div>
    </div>
  )
}

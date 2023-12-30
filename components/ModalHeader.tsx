import { Icons } from "./Icons"

type Props = {
  onClick: () => void
  title: string
  heading?: string
}
export default function ModalHeader({ onClick, title, heading }: Props) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          {heading && <h1 className="text-lg font-bold text-white ">{heading}</h1>}
          <p className="text-gray text-sm">{title}</p>
        </div>
        <Icons.MdOutlineCancelPresentation
          onClick={onClick}
          className="block cursor-pointer pl-2 text-5xl text-white transition-all duration-200 hover:scale-105 md:text-4xl "
        />
      </div>
      <p className="border-gray my-6 w-full border" />
    </>
  )
}

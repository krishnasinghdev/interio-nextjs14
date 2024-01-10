import Image from "next/image"
import { getImgUrl } from "@/sanity/lib/image"

type IMGType = {
  value: {
    imageUrl: string
    alt?: string
  }
}

export const BlogComponents = {
  types: {
    image: ({ value }: IMGType) => (
      <Image
        src={getImgUrl(value, 800, 400)}
        width={800}
        height={400}
        className="my-4 rounded-lg"
        alt={value.alt || "image describing points"}
      />
    ),
    h3: (value: string) => <h3 className=" text-white">{value}</h3>,
    h2: (value: string) => <h2 className=" text-white">{value}</h2>,
  },
}

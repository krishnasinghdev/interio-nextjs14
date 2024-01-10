import React from "react"
import Image from "next/image"
import Link from "next/link"

type Props = {
  image: string
  date: string
  cardTitle: string
  cardDescription: string
  slug: string
}

export default function BlogCard({ image, date, cardTitle, cardDescription, slug }: Props) {
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="mx-auto mb-10 max-w-[370px]">
        <div className="mb-4 overflow-hidden rounded">
          <Image src={image} alt={slug} className="h-60 w-full" height={320} quality={90} width={340} />
        </div>
        <div>
          {date && (
            <span className="mb-5 inline-block rounded bg-secondary px-4 py-1 text-center text-xs leading-loose text-white">
              {date}
            </span>
          )}
          <h3>
            <Link
              href={`/blogs/${slug}`}
              className="text-dark mb-4 inline-block text-xl font-semibold capitalize hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
            >
              {cardTitle.toLocaleLowerCase()}
            </Link>
          </h3>
          <p className="text-body-color text-base">{cardDescription}</p>
        </div>
      </div>
    </div>
  )
}

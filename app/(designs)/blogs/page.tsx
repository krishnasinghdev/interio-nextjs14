import React from "react"
import type { Metadata } from "next"
import { getImgUrl } from "@/sanity/lib/image"
import { blogsQuery } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/sanity-fetch"
import { formatDMY } from "@/utils/helper"
import { SanityDocument } from "next-sanity"

import BlogCard from "./blog-card"

const Blog = async () => {
  const blogs = await sanityFetch<SanityDocument[]>({ query: blogsQuery })

  return (
    <section>
      <div className="-mx-4 flex flex-wrap text-foreground">
        <div className="w-full px-4">
          <div className="mx-auto mb-[60px] max-w-[550px] text-center lg:mb-10">
            <h1 className="mb-2 block text-3xl font-semibold ">Welcome to our blog section!</h1>

            <p className="text-body-color text-base">
              Here, you&apos;ll find articles on a variety of topics related to &quot; Interior Designing &quot; products and services,
              as well as general topics of interest to our audience.
            </p>
          </div>
        </div>
      </div>

      <div className="-mx-4 flex flex-wrap">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => {
            return (
              <BlogCard
                key={blog._id}
                slug={blog.slug.current}
                date={formatDMY(blog.publishedAt)}
                cardTitle={blog.title}
                cardDescription={blog.description}
                image={getImgUrl(blog.mainImage, 300, 250)}
              />
            )
          })
        ) : (
          <p>Blogs Not Available!</p>
        )}
      </div>
    </section>
  )
}

export default Blog

const title = "Interio | Blogs"
const description = `Here, you'll find articles on a variety of topics related to " Interior Designing " products and services, as well as general topics of interest to our audience.`

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://ks-interio.vercel.app"),
  // openGraph: {
  //   title,
  //   description,
  //   type: "website",
  //   url: "https://wish.witheb.in/blogs",
  //   siteName: "Wish witheb",
  //   images: [
  //     {
  //       url: "https://wish.witheb.in/wishlogo.gif",
  //       height: 480,
  //       width: 480,
  //     },
  //   ],
  // },
}

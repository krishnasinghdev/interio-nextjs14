// import type { Metadata } from "next"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { getImgUrl } from "@/sanity/lib/image"
import {
  blogPathsQuery,
  // blogMetaDataQuery,
  // blogPathsQuery,
  blogQuery,
} from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/sanity-fetch"
import { formatDMY } from "@/utils/helper"
import { PortableText } from "@portabletext/react"
import { SanityDocument } from "@sanity/client"

import { BlogComponents } from "@/components/custom-ptc"

type PageProps = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const blogs = await client.fetch(blogPathsQuery)
  return blogs
}

export default async function Page({ params }: PageProps) {
  const blog = await sanityFetch<SanityDocument>({ query: blogQuery, params })
  // console.log(blog)
  if (!blog) {
    return (
      <main className="container">
        <Image src="/not-found.svg" alt="Not Found Image" className="mx-auto" width={500} height={300} />
        <h1 className="relative -top-10 text-center text-red-500">This Blog Url Does not exist!</h1>
      </main>
    )
  }

  return (
    <main className="prose prose-lg mx-auto">
      <h1>{blog.title}</h1>
      {blog?.mainImage && (
        <Image
          className="my-4 rounded-lg"
          src={getImgUrl(blog.mainImage, 800, 400)}
          width={800}
          height={400}
          alt={blog?.mainImage?.alt}
        />
      )}
      {blog?.body ? <PortableText value={blog.body} components={BlogComponents} /> : null}

      {blog.author && (
        <>
          <h3 className="m-0">Author</h3>
          <section className="rounded-lg bg-gray-300 p-2">
            <div className="flex h-fit items-center">
              <Image
                src={getImgUrl(blog.author?.image, 40, 40)}
                width={40}
                height={40}
                alt={blog.author?.image?.alt}
                className="m-0 mr-2 rounded-full"
              />
              <p className="capitalize">{blog?.author?.name}</p>
            </div>
            <p className="m-0">Published On: {formatDMY(blog.publishedAt)}</p>
          </section>
        </>
      )}
    </main>
  )
}

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   const blog = await sanityFetch<SanityDocument>({
//     query: blogMetaDataQuery,
//     params,
//   })

//   const title =
//     (blog?.title && `Wish witheb | ${blog?.title}`) || "Wish witheb | Blogs"
//   const description =
//     blog?.description ||
//     `Wish witheb Blog: Personalized Video Messages
//     Looking for inspiration for your next personalized wish? Check out the Wish witheb blog for articles on a variety of topics, including:
//     How to choose the right gift.
//     How to add your own personal touches.
//     Tips for creating a meaningful message.
//     And more!
//     Visit the Wish witheb blog today to learn more about creating personalized video messages that your loved ones will cherish.`

//   return {
//     title,
//     description,
//     metadataBase: new URL("https://wish.witheb.in"),
//     openGraph: {
//       title,
//       description,
//       type: "website",
//       url: `https://wish.witheb.in/blog/${params.slug}`,
//       siteName: "Wish witheb",
//       images: [
//         {
//           url: blog?.mainImage
//             ? getImgUrl(blog?.mainImage, 200, 200)
//             : "https://wish.witheb.in/wishlogo.gif",
//           height: 480,
//           width: 480,
//         },
//       ],
//     },
//   }
// }

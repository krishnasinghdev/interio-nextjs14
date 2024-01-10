import { client } from "@/sanity/lib/client"
import createImageUrlBuilder from "@sanity/image-url"
import imageUrlBuilder from "@sanity/image-url"
import type { Image } from "sanity"

import { dataset, projectId } from "../env"

const builder = imageUrlBuilder(client)

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
})

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto("format").fit("max").url()
}

export function getImgUrl(obj: object, width: number = 300, height: number = 300) {
  return builder.image(obj).width(width).height(height).url()
}

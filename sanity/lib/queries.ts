// ./nextjs-app/sanity/lib/queries.ts

import { groq } from "next-sanity"

// Get all blogs
export const blogsQuery = groq`*[_type == "blog" && defined(slug.current)]{
    _id, title, slug, mainImage, publishedAt, description
  }`

// Get a single blog by its slug
export const blogQuery = groq`*[_type == "blog" && slug.current == $slug][0]{ 
    title, mainImage, body, author -> {name, image}, publishedAt
  }`

// Get a single blog by its slug
export const blogMetaDataQuery = groq`*[_type == "blog" && slug.current == $slug][0]{ 
    title, mainImage
  }`

// Get all blog slugs
export const blogPathsQuery = groq`*[_type == "blog" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`

import { type SchemaTypeDefinition } from "sanity"

import author from "./schemas/author"
import blockContent from "./schemas/block-content"
import blog from "./schemas/blog"
import tags from "./schemas/tags"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog, author, tags, blockContent],
}

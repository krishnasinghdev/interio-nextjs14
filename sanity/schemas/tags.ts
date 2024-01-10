import { defineField, defineType } from "sanity"

export default defineType({
  name: "tags",
  title: "Tags",
  type: "document",
  fields: [
    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "tag",
        maxLength: 24,
      },
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
    }),
  ],
})

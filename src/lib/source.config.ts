import { defineCollections } from "fumadocs-mdx/config";

export const blog = defineCollections({
  type: "doc",
  dir: "src/content",
});

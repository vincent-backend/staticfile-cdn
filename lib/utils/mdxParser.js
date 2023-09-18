import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

// mdx content parser
const parseMDX = (content) => {
  const options = {
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
      remarkPlugins: [remarkGfm],
    },
  };
  return serialize(content, options);
};

export default parseMDX;

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import Post from "../components/Post";
import { sortByDate } from "../utils";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <>
      <Head>
        <title>Tech Blogs</title>
      </Head>
      <div className="posts">
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  //get files from the post directory
  const files = fs.readdirSync(path.join("posts"));
  //Get slug and frontmatter from post
  const posts = files.map((filename) => {
    //Create slug
    const slug = filename.replace(".md", "");

    //get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}

import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";
import Markdown from "markdown-to-jsx";

function PostPage({ frontmatter: { title, date, cover_image }, content }) {
  return (
    <>
      <div className="btn btn-black">
        <Link href="/">Go back</Link>
      </div>
      {/* <Markdown> */}
      <div className="card card-page">
        <h1 className="post-title">{title}</h1>
        <div className="post-date">Posted on {date}</div>
        <img src={cover_image} alt="" />
        <div className="post-body">
          <div
            dangerouslySetInnerHTML={{ __html: marked(content) }}
            className="post-content"
          />
        </div>
      </div>
      {/* </Markdown> */}
    </>
  );
}

export default PostPage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}

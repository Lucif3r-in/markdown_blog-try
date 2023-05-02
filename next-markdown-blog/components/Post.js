import Link from "next/link";
import React from "react";

function Post({ post }) {
  return (
    <div className="card">
      <img src={post.frontmatter.cover_image} alt="" />
      <div className="post-date"> Posted on {post.frontmatter.date}</div>
      <h3>{post.frontmatter.title}</h3>
      <p>{post.frontmatter.excerpt}</p>
      <div className="btn">
        <Link href={`/blog/${post.slug}`}>Read More</Link>
      </div>
    </div>
  );
}

export default Post;

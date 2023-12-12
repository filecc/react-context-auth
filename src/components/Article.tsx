import { Link, useLocation } from "react-router-dom";
import { Post } from "../lib/types/Post.types";

export default function Article({ post }: { post: Post }) {
  const location = useLocation();
  return (
    <>
      <Link to={`/blog/${post.slug}`}>
        <span className="block text-2xl font-semibold">{post.title}</span>
      </Link>
      <img src={post.image} alt={post.title + " image"} />
      {location.pathname != "/"
        ? post.content
        : post.content.slice(0, 100) + "..."}
    </>
  );
}

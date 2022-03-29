import React, { useEffect, useState } from "react";
import { getSimilarPosts, getRecentPosts } from "../../services/schemas";
import moment from "moment";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";
import classes from "./PostWidgets.module.css";

const PostWidgets = ({ categories, slug }) => {
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    if (slug) {
      getSimilarPosts(categories, slug).then((results) => {
        setPosts(results);

        setIsLoading(false);
      });
    } else {
      getRecentPosts().then((results) => {
        setPosts(results);

        setIsLoading(false);
      });
    }
  }, [slug]);

  return (
    <div className={classes.posts}>
      <div className={classes.header}>
        <h3>{slug ? "Related Posts" : "Recent Posts"}</h3>
      </div>

      {isLoading && <Spinner />}

      {posts.map((post, i) => (
        <div key={i} className={classes.post}>
          <img src={post.featuredImage.url} alt={post.title} />

          <div className={classes.content}>
            <p>{moment(post.createdAt).format("MMM DD, YYYY")}</p>

            <Link to={`/post/${post.slug}`}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidgets;

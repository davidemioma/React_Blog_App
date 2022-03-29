import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { getPost } from "../../services/schemas";
import Spinner from "../spinner/Spinner";
import classes from "./PostList.module.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPost().then((data) => {
      setPosts(data || []);

      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={classes.List}>
      {posts?.map((post, i) => (
        <PostCard key={i} post={post?.node} />
      ))}
    </div>
  );
};

export default PostList;

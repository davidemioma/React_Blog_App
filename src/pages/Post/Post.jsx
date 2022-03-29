import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../../components/spinner/Spinner";
import PostDetails from "../../components/PostDetails/PostDetails";
import PostWidgets from "../../components/PostWidgets/PostWidgets";
import Categories from "../../components/Categories/Categories";
import Author from "../../components/Author/Author";
import AdjacentPost from "../../components/AdjacentPost/AdjacentPost";
import CommentForm from "../../components/Comments/CommentForm";
import Comments from "../../components/Comments/Comments";
import { getPostDetails } from "../../services/schemas";
import classes from "./Post.module.css";

const Post = () => {
  const { postId } = useParams();

  const [post, setPost] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPostDetails(postId).then((results) => {
      setPost(results);

      setIsLoading(false);
    });
  }, [postId]);

  return (
    <>
      {post !== null && (
        <div className={classes.post}>
          <div className={classes.postContent}>
            <PostDetails post={post} />

            <Author author={post.author} />

            <AdjacentPost slug={post.slug} createdAt={post.createdAt} />

            <CommentForm slug={post.slug} />

            <Comments slug={post.slug} />
          </div>

          <div className={classes.links}>
            <PostWidgets
              slug={post.slug}
              categories={post.categories.map((c) => c.slug)}
            />

            <Categories />
          </div>
        </div>
      )}
    </>
  );
};

export default Post;

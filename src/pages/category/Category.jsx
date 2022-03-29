import React, { useEffect, useState } from "react";
import PostCard from "../../components/Posts/PostCard";
import Categories from "../../components/Categories/Categories";
import Spinner from "../../components/spinner/Spinner";
import { getCategoryPost } from "../../services/schemas";
import { useParams } from "react-router";
import classes from "./Category.module.css";

const Category = () => {
  const { categoryId } = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getCategoryPost(categoryId).then((result) => {
      setPosts(result);
    });
  }, [categoryId]);

  return (
    <div className={classes.category}>
      {posts.length > 0 && (
        <div className={classes.list}>
          {posts.map((post) => (
            <PostCard post={post?.node} />
          ))}
        </div>
      )}

      {posts.length <= 0 && (
        <div className={classes.empty}>No Post Available</div>
      )}

      <div className={classes.links}>
        <Categories />
      </div>
    </div>
  );
};

export default Category;

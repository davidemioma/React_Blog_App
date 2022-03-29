import React from "react";
import PostWidgets from "../../components/PostWidgets/PostWidgets";
import Categories from "../../components/Categories/Categories";
import PostList from "../../components/Posts/PostList";
import FeaturedPost from "../../components/FeaturedPost/FeaturedPost";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={classes.home}>
      <FeaturedPost />

      <div className={classes.homeContent}>
        <div className={classes.posts}>
          <PostList />
        </div>

        <div className={classes.links}>
          <PostWidgets />

          <Categories />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

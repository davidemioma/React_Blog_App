import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import classes from "./Featured.module.css";

const FeaturedPostCard = ({ post }) => {
  return (
    <div
      className={classes.card}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("${post.featuredImage.url}")`,
      }}
    >
      <Link className={classes.link} to={`/post/${post.slug}`}>
        <div className={classes.cardContent}>
          <p>{moment(post.createdAt).format("MMM DD, YYYY")}</p>

          <p className={classes.title}>{post.title}</p>
        </div>

        <div className={classes.author}>
          <img src={post.author.photo.url} alt="" />

          <p>{post.author.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedPostCard;

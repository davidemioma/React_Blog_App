import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import classes from "./PostCard.module.css";

const PostCard = ({ post }) => {
  return (
    <div className={classes.post}>
      <img className={classes.postImg} src={post.featuredImage.url} alt="" />

      <div className={classes.content}>
        <h1>
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h1>

        <div className={classes.info}>
          <div>
            <img
              className={classes.infoImg}
              src={post.author.photo.url}
              alt={post.author.name}
            />

            <span>{post.author.name}</span>
          </div>

          <div>
            <svg
              style={{ color: "#ff0066" }}
              className={classes.infoImg}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>

            <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
          </div>
        </div>

        <p className={classes.text}>{post.excerp}</p>

        <div className={classes.btn}>
          <Link to={`/post/${post.slug}`}>Continue Reading</Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

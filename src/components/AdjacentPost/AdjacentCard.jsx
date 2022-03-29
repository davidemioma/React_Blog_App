import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import classes from "./AdjacentCard.module.css";

const AdjacentCard = ({ post, position }) => {
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

        {position === "LEFT" && (
          <div className={classes.cardBtnLeft}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        )}

        {position === "RIGHT" && (
          <div className={classes.cardBtnRight}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        )}
      </Link>
    </div>
  );
};

export default AdjacentCard;

import React from "react";
import moment from "moment";
import { getContentFragment } from "../../utils/textFormat";
import classes from "./PostDetails.module.css";

const PostDetails = ({ post }) => {
  return (
    <>
      {post != null && (
        <div className={classes.post}>
          <img
            className={classes.postImg}
            src={post.featuredImage.url}
            alt=""
          />

          <div className={classes.content}>
            <div className={classes.info}>
              <div>
                <img
                  className={classes.img}
                  src={post.author.photo.url}
                  alt={post.author.name}
                />

                <span>{post.author.name}</span>
              </div>

              <div>
                <svg
                  className={classes.icon}
                  style={{ color: "#ff0066" }}
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

            <h1>{post.title}</h1>

            {post.content.raw.children.map((typeObj, index) => {
              const children = typeObj.children.map((item, itemindex) =>
                getContentFragment(itemindex, item.text, item)
              );

              return getContentFragment(index, children, typeObj, typeObj.type);
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetails;

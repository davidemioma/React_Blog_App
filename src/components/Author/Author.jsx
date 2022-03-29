import React from "react";
import classes from "./Author.module.css";

const Author = ({ author }) => {
  return (
    <>
      {author != null && (
        <div className={classes.author}>
          <img
            className={classes.img}
            src={author.photo.url}
            alt={author.name}
          />

          <h3>{author.name}</h3>

          <p>{author.bio}</p>
        </div>
      )}
    </>
  );
};

export default Author;

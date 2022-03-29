import React, { useEffect, useState } from "react";
import moment from "moment";
import { getComments } from "../../services/schemas";
import classes from "./Comments.module.css";

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((results) => setComments(results));
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <div className={classes.comments}>
          <div className={classes.header}>
            <h3>{comments.length} Comments</h3>
          </div>

          <div className={classes.list}>
            {comments.map((comment, i) => (
              <div key={i} className={classes.comment}>
                <p>
                  <span>{comment.name} </span>
                  on {moment(comment.createdAt).format("MMM DD, YYYY")}
                </p>

                <p>{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;

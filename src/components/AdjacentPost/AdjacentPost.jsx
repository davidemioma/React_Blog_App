import React, { useEffect, useState } from "react";
import { getAdjacentPost } from "../../services/schemas";
import AdjacentCard from "./AdjacentCard";
import classes from "./AdjacentPost.module.css";

const AdjacentPost = ({ createdAt, slug }) => {
  const [adjacentPost, setAdjacentPost] = useState(null);

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getAdjacentPost(createdAt, slug).then((results) => {
      setAdjacentPost(results);

      setDataLoaded(true);
    });
  }, [slug]);

  return (
    <>
      {dataLoaded && (
        <div className={classes.adjacentPost}>
          {adjacentPost.previous && (
            <AdjacentCard post={adjacentPost.previous} position="LEFT" />
          )}

          {adjacentPost.next && (
            <AdjacentCard post={adjacentPost.next} position="RIGHT" />
          )}
        </div>
      )}
    </>
  );
};

export default AdjacentPost;

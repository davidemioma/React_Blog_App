import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/schemas";
import Spinner from "../spinner/Spinner";
import classes from "./Categories.module.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getCategories().then((results) => {
      setCategories(results);

      setIsLoading(false);
    });
  }, []);

  return (
    <div className={classes.categories}>
      {isLoading && <Spinner />}
      <div className={classes.header}>
        <h3>Categories</h3>
      </div>

      {categories.map((category, i) => (
        <div
          style={{
            borderBottom:
              i === categories.length - 1 ? "0" : "1px solid lightgray",
          }}
          key={i}
          className={classes.category}
        >
          <Link to={`/category/${category.slug}`}>{category.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Categories;

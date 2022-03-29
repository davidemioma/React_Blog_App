import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/schemas";
import classes from "./Header.module.css";

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((results) => setCategories(results));
  }, []);

  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">
          <span>Graph CMS</span>
        </Link>
      </div>

      {categories.length > 0 && (
        <div className={classes.lists}>
          {categories.map((c, i) => (
            <Link key={i} to={`/category/${c.slug}`}>
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;

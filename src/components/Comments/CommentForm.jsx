import React, { useEffect, useState } from "react";
import { submitComment } from "../../services/schemas";
import classes from "./CommentForm.module.css";

const initalFormData = {
  name: window.localStorage.getItem("name") || "",
  email: window.localStorage.getItem("email") || "",
  comment: "",
  storeData: false,
};

const CommentForm = ({ slug }) => {
  const [error, setError] = useState(false);

  const [localStorage, setLocalStorage] = useState(null);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    storeData: false,
  });

  useEffect(() => {
    setFormData(initalFormData);
  }, []);

  const handleSubmit = () => {
    setError(false);

    const { name, email, comment, storeData } = formData;

    if (name === "" || email === "" || !email.includes("@") || comment === "") {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);

      setFormData(initalFormData);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className={classes.form}>
      <div className={classes.header}>
        <h3>Leave a Reply</h3>
      </div>

      <textarea
        value={formData.comment}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, comment: e.target.value }))
        }
        placeholder="Comment"
      />

      <div className={classes.inputs}>
        <input
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          type="text"
          placeholder="Name"
        />

        <input
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          type="email"
          placeholder="Email"
        />
      </div>

      <div className={classes.check}>
        <input
          checked={formData.storeData}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, storeData: e.target.checked }))
          }
          id="storeData"
          type="checkbox"
        />

        <label htmlFor="storeData">
          Save my name, email in this browser for the next time I comment.
        </label>
      </div>

      {error && <p className={classes.error}>All fields are mandatory</p>}

      <div className={classes.tasks}>
        <button onClick={handleSubmit} type="button">
          Post Comment
        </button>

        {showSuccessMessage && <span>Comment submitted for review</span>}
      </div>
    </div>
  );
};

export default CommentForm;

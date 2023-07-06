import React, { useState, useEffect } from "react";
import APIServices from "../APIServices";

import styles from "./ArticleForm.module.scss";
import Button from "@mui/material/Button";

import { ThemeProvider } from "@emotion/react";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const propTypes = {};

const defaultProps = {};

const ArticleForm = (props) => {
  const theme = createTheme({
    typography: {
      fontFamily: ['"Inter"', "sans-serif"],
      fontSize: 18,
      textTransform: "none",
    },
  });

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setTitle(props.article.title);
    setBody(props.article.body);
  }, [props.article]);

  const updateArticle = () => {
    APIServices.UpdateArticle(props.article.id, { title, body })
      .then((resp) => props.updatedData(resp))
      .catch((error) => console.log(error));
  };

  const insertArticle = () => {
    if (title && body) {
      APIServices.InsertArticle({ title, body })
        .then((resp) => props.insertedArticles(resp))
        .catch((error) => console.log(error));
    } else {
      alert("Please fill all fields!");
    }
  };

  return (
    <>
      {props.article ? (
        <div className={styles.input_container}>
          <div className={styles.input_group}>
            <label htmlFor="title" className="form-label">
              Title
            </label>

            <input
              type="text"
              className="form-controle"
              value={title}
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.input_group}>
            <label htmlFor="body" className="form-label">
              Description
            </label>
            <textarea
              className="form-controle"
              rows="6"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter description"
            />
          </div>

          <ThemeProvider theme={theme}>
            {props.article.id ? (
              <Button
                variant="contained"
                onClick={updateArticle}
                className="btn btn-success mt-3"
              >
                Update
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={insertArticle}
                className="btn btn-success mt-3"
              >
                Insert
              </Button>
            )}
          </ThemeProvider>
        </div>
      ) : null}
    </>
  );
};

export default ArticleForm;

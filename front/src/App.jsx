import { useState, useEffect } from "react";
import ArticleList from "./Components/ArticleList/ArticleList.component";
import ArticleForm from "./Components/ArticleForm/ArticleForm";
import APIServices from "./Components/APIServices";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@emotion/react";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import styles from "./App.module.scss";

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ['"Inter"', "sans-serif"],
      fontSize: 18,
      textTransform: "none",
    },
  });

  const [articles, setArticles] = useState([]);
  const [editedArticle, setEditedArticle] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    APIServices.getAll()
      .then((resp) => resp.json())
      .then((resp) => setArticles(resp))
      .catch((error) => console.log(error));
  }, []);

  const setArticleToEdit = (article) => {
    setShowForm(true);
    setEditedArticle(article);
  };

  const updatedData = (article) => {
    const newArticle = articles.map((myArticle) => {
      if (myArticle.id === article.id) {
        return article;
      } else {
        return myArticle;
      }
    });
    setArticles(newArticle);
  };

  const openForm = () => {
    setShowForm(!showForm);
    setEditedArticle({ title: "", body: "" });
  };

  const insertedArticles = (article) => {
    const newArticles = [...articles, article];
    setArticles(newArticles);
  };

  const reloadArticles = () => {
    APIServices.getAll()
      .then((resp) => resp.json())
      .then((resp) => setArticles(resp))
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.logo}>
          <span className={styles.logo_bold}>Blog</span>App
        </h1>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            onClick={openForm}
            className="btn btn-success mt-3"
          >
            {showForm ? "Close" : "New Fact"}
          </Button>
        </ThemeProvider>
      </div>

      {showForm && (
        <ArticleForm
          article={editedArticle}
          updatedData={updatedData}
          insertedArticles={insertedArticles}
        />
      )}

      <ArticleList
        articles={articles}
        setArticleToEdit={setArticleToEdit}
        reloadArticles={reloadArticles}
      />
    </div>
  );
};

export default App;

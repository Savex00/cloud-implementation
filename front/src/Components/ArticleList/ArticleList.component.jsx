import React from "react";
import APIServices from "../APIServices";
import Article from "../Article/Article.component";
import styles from "./ArticleList.module.scss";

const defaultProps = {};

const ArticleList = ({ articles, setArticleToEdit, reloadArticles }) => {
  return (
    <div className={styles.article_container}>
      {articles &&
        articles.map((article) => {
          return (
            <Article
              key={article.title + article.body}
              setArticleToEdit={setArticleToEdit}
              article={article}
              reloadArticles={reloadArticles}
            />
          );
        })}
    </div>
  );
};

ArticleList.defaultProps = defaultProps;

export default ArticleList;

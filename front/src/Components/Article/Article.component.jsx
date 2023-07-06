import React from "react";
import styles from "./Article.module.scss";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import APIServices from "../APIServices";

const Article = ({ article, setArticleToEdit, reloadArticles }) => {
  const deleteArticle = (article) => {
    APIServices.DeleteArticle(article.id).then(() => reloadArticles());
  };

  const theme = createTheme({
    typography: {
      fontFamily: ['"Inter"', "sans-serif"],
      fontSize: 18,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {article.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {article.body}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => setArticleToEdit(article)}>
            Edit
          </Button>
          <Button
            color="error"
            onClick={() => deleteArticle(article)}
            size="small"
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

export default Article;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import swal from "sweetalert";
import { Button, IconButton, Typography, Grid } from "@mui/material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { useNavigate } from "react-router-dom";

function MySaveArticleList(props) {
  const history = useNavigate();
  const [token] = useCookies(["mytoken"]);
  const [hasMyarticle, setHasMyarticle] = React.useState(true);

  const has_Myarticle = props.articles.filter((article) => {
    return article.user_id === Number(token["user_id"]);
  });

  React.useEffect(() => {
    if (!token["mytoken"]) {
      history("/");
    }

    if (has_Myarticle[0]) {
      setHasMyarticle(true);
    } else {
      setHasMyarticle(false);
    }
  });

  const updateArticle = (article) => {
    props.updateArticle(article);
  };

  return (
    <div>
      {props.articles &&
        props.articles.map((article) => {
          if (article.user_is_saved) {
            return (
              <div key={article.article_id}>
                <h6>
                  <span style={{ color: "#49f6cbfb" }} className="me-1">
                    {article.last_name} {article.first_name} @{article.username}
                  </span>
                  <small className="float-end">{article.created_at}</small>
                </h6>
                <h2 className="text-info" style={{ marginTop: 10 }}>
                  {article.title}
                </h2>
                <p>{article.description}</p>

                <Grid container spacing={2}>
                  <Grid item xs={8} md={10}>
                    <IconButton
                      size="medium"
                      onClick={() => {
                        props.updateLike(article.article_id);
                      }}
                    >
                      {article.user_is_liked ? (
                        <FavoriteOutlinedIcon size="medium" color="error" />
                      ) : (
                        <FavoriteBorderOutlinedIcon
                          size="medium"
                          color="error"
                        />
                      )}
                    </IconButton>
                    <Typography display="inline" sx={{ mr: 1 }} color="error">
                      {article.likes}
                    </Typography>
                    <IconButton
                      size="medium"
                      onClick={() => {
                        props.getCommentID(article.article_id);
                        history("/comment");
                      }}
                    >
                      <ChatIcon size="medium" color="primary" />
                    </IconButton>
                    <Typography display="inline" color="primary" sx={{ mr: 1 }}>
                      {article.comment.length}
                    </Typography>
                    <IconButton
                      size="medium"
                      onClick={() => {
                        props.updateSave(article.article_id);
                      }}
                    >
                      {article.user_is_saved ? (
                        <BookmarkAddIcon size="medium" color="warning" />
                      ) : (
                        <BookmarkAddOutlinedIcon
                          size="medium"
                          color="warning"
                        />
                      )}
                    </IconButton>
                    {article.user_is_saved ? (
                      <Typography display="inline" sx={{ color: "#ed6c02" }}>
                        已儲存
                      </Typography>
                    ) : null}
                  </Grid>
                </Grid>

                <hr className="hrclass" />
              </div>
            );
          }
        })}
    </div>
  );
}

export default MySaveArticleList;

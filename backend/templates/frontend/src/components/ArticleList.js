import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from "react-cookie";
import { Grid, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import swal from "sweetalert";

function ArticleList(props) {
  const [token] = useCookies(["mytoken"]);
  const history = useNavigate();

  return (
    <div>
      {props.articles &&
        props.articles.map((article) => {
          return (
            <div key={article.article_id}>
              <h6>
                <span style={{ color: "#49f6cbfb" }} className="me-1">
                  {article.user_id === props.profiledata.user_id
                    ? props.profiledata.last_name
                    : article.last_name}{" "}
                  {article.user_id === props.profiledata.user_id
                    ? props.profiledata.first_name
                    : article.first_name}{" "}
                  @{article.username}
                </span>
                <small className="float-end">{article.created_at}</small>
              </h6>
              <h2 className="text-info" style={{ marginTop: 10 }}>
                {article.title}
              </h2>
              <p>{article.description}</p>
              <Grid container>
                {token.mytoken ? (
                  <Grid item xs={6}>
                    <IconButton
                      size="medium"
                      sx={{ mr: 1 }}
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
                    <Typography
                      display="inline"
                      sx={{ marginTop: 5 }}
                      color="error"
                    >
                      {article.likes}
                    </Typography>
                  </Grid>
                ) : (
                  <Grid item xs={6}>
                    <IconButton
                      size="medium"
                      sx={{ mr: 1 }}
                      onClick={() => {
                        swal("請登入").then(() => {
                          history("/login");
                        });
                      }}
                    >
                      <FavoriteBorderOutlinedIcon size="medium" color="error" />
                    </IconButton>
                    <Typography
                      display="inline"
                      color="error"
                      sx={{ marginTop: 5 }}
                    >
                      {article.likes}
                    </Typography>
                  </Grid>
                )}
              </Grid>

              <hr className="hrclass " />
            </div>
          );
        })}
    </div>
  );
}

export default ArticleList;

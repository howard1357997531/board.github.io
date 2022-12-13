import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from "react-cookie";
import {
  Grid,
  IconButton,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import swal from "sweetalert";

function Comment(props) {
  const [token] = useCookies(["mytoken"]);
  const [comment, setComment] = useState("");
  const history = useNavigate();

  const handleOnchange = (e) => {
    setComment(e.target.value);
  };

  const handleOnclick = (article_id) => {
    if (comment === "") {
      swal("請留言 ! !");
      return;
    }
    if (comment.length > 100) {
      swal("留言字數不得超過100字 ! !");
      return;
    }
    const data = {
      description: comment,
      user: parseInt(token["user_id"]),
      article: article_id,
    };
    props.updateComment(data);
    swal("留言成功 ! !").then(() => {
      window.location.href = "/";
    });
  };

  return (
    <div>
      {props.articles &&
        props.articles.map((article) => {
          if (article.article_id === props.comment) {
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
                      <IconButton size="medium">
                        <ChatIcon size="medium" color="primary" />
                      </IconButton>
                      <Typography
                        display="inline"
                        color="primary"
                        sx={{ mr: 1 }}
                      >
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
                  ) : (
                    <Grid item xs={6}>
                      <IconButton
                        size="medium"
                        onClick={() => {
                          swal("請登入").then(() => {
                            history("/login");
                          });
                        }}
                      >
                        <FavoriteBorderOutlinedIcon
                          size="medium"
                          color="error"
                        />
                      </IconButton>
                      <Typography display="inline" color="error" sx={{ mr: 1 }}>
                        {article.likes}
                      </Typography>
                      <IconButton size="medium">
                        <ChatIcon size="medium" color="primary" />
                      </IconButton>
                      <Typography
                        display="inline"
                        color="primary"
                        sx={{ mr: 1 }}
                      >
                        {article.comment.length}
                      </Typography>

                      <IconButton
                        size="medium"
                        onClick={() => {
                          swal("請登入").then(() => {
                            history("/login");
                          });
                        }}
                      >
                        <BookmarkAddOutlinedIcon
                          size="medium"
                          color="warning"
                        />
                      </IconButton>
                    </Grid>
                  )}
                </Grid>

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  autoFocus
                  autoComplete="username"
                  color="info"
                  label="請發表留言"
                  defaultValue={comment}
                  onChange={handleOnchange}
                  sx={{ label: { color: "#0288d1" }, mt: 2 }}
                  inputProps={{ style: { color: "#49f6cbfb" } }}
                />
                <Stack direction="row" justifyContent="flex-end">
                  {token.mytoken ? (
                    <Button
                      type="submit"
                      variant="contained"
                      color="info"
                      sx={{ mt: 2 }}
                      onClick={() => handleOnclick(article.article_id)}
                    >
                      送出
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      color="info"
                      sx={{ mt: 2 }}
                      onClick={() => {
                        swal("請登入").then(() => {
                          history("/login");
                        });
                      }}
                    >
                      送出
                    </Button>
                  )}
                </Stack>
                <Typography variant="h4">留言區</Typography>
                <hr className="hrclass " />
                {article.comment &&
                  article.comment.map((com) => {
                    return (
                      <div key={com.id}>
                        <h6>
                          <span style={{ color: "#49f6cbfb" }} className="me-1">
                            {com.last_name} {com.first_name} @{com.username}
                          </span>
                          <small className="float-end">{com.created_at}</small>
                        </h6>
                        <p>{com.description}</p>
                        <hr className="hrclass " />
                      </div>
                    );
                  })}
              </div>
            );
          }
        })}
    </div>
  );
}

export default Comment;

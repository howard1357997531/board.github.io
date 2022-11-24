import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import APIService from "../APIService";
import PersonIcon from "@mui/icons-material/Person";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const theme = createTheme();

export default function EditArticle(props) {
  const [token] = useCookies(["mytoken"]);
  const history = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataitems = {
      title: data.get("title"),
      description: data.get("description"),
      user: Number(token["user_id"]),
    };
    if (
      props.edit.title === data.get("title") &&
      props.edit.description === data.get("description")
    ) {
      swal("請更改內容");
    } else if (data.get("title") === "" && data.get("description") === "") {
      swal("標題、內容 不可空白");
    } else if (data.get("title") === "") {
      swal("標題不可空白");
    } else if (data.get("description") === "") {
      swal("內容不可空白");
    } else if (data.get("title").length > 30) {
      swal("標題不得超過30字");
    } else if (data.get("description").length > 600) {
      swal("內容不得超過600字");
    } else {
      swal("編輯文章成功!", "", "success").then(() => {
        APIService.EditArticle(
          props.edit.article_id,
          dataitems,
          token["mytoken"]
        ).then((res) => {
          props.updateArticle({
            article_id: props.edit.article_id,
            title: data.get("title"),
            description: data.get("description"),
          });
          props.updateEdit(!props.edit.status);
        });
      });
    }
  };
  const back = () => {
    props.updateEdit(!props.edit.status);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              編輯文章
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    sx={{
                      input: { color: "#49f6cbfb" },
                      label: { color: "#2e7d32" },
                    }}
                    required
                    fullWidth
                    autoFocus
                    color="success"
                    id="title"
                    label="標題"
                    name="title"
                    autoComplete="username"
                    defaultValue={props.edit.title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ label: { color: "#2e7d32" } }}
                    inputProps={{ style: { color: "#49f6cbfb" } }}
                    required
                    fullWidth
                    multiline
                    color="success"
                    variant="outlined"
                    rows={5}
                    id="description"
                    label="內容"
                    name="description"
                    autoComplete="username"
                    defaultValue={props.edit.description}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} align="right">
                <Button
                  variant="contained"
                  sx={{ mt: 3, mr: 2 }}
                  onClick={() => back()}
                >
                  返回
                </Button>
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  sx={{ mt: 3 }}
                >
                  送出
                </Button>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

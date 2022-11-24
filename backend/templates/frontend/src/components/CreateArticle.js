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
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function CreateArticle(props) {
  const [token] = useCookies(["mytoken"]);
  const history = useNavigate();

  React.useEffect(() => {
    if (!token["mytoken"]) {
      history("/");
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataitems = {
      title: data.get("title"),
      description: data.get("description"),
      user: Number(token["user_id"]),
    };
    console.log(dataitems);
    if (data.get("title") === "" && data.get("description") === "") {
      swal("標題、內容 不可空白");
    } else if (data.get("title") === "") {
      swal("請新增標題");
    } else if (data.get("description") === "") {
      swal("請新增內容");
    } else if (data.get("title").length > 30) {
      swal("標題不得超過30字");
    } else if (data.get("description").length > 600) {
      swal("內容不得超過600字");
    } else {
      swal("新增文章成功!", "", "success").then(() => {
        APIService.CreateArticle(dataitems, token["mytoken"]).then((data) => {
          window.location.href = "/";
        });
      });
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "warning.main" }}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              新增文章
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
                      label: { color: "#ed6c02" },
                    }}
                    required
                    fullWidth
                    autoFocus
                    color="warning"
                    id="title"
                    label="標題"
                    name="title"
                    autoComplete="username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ label: { color: "#ed6c02" } }}
                    inputProps={{ style: { color: "#49f6cbfb" } }}
                    required
                    fullWidth
                    multiline
                    color="warning"
                    variant="outlined"
                    rows={5}
                    id="description"
                    label="內容"
                    name="description"
                    autoComplete="username"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="warning"
                sx={{ mt: 3, mb: 2 }}
              >
                送出
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

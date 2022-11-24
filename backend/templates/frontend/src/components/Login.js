import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";

const theme = createTheme();

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username_error, setUsernameError] = React.useState(false);
  const [password_error, setPasswordError] = React.useState(false);
  const [token, setToken] = useCookies(["mytoken"]);
  let history = useNavigate();

  React.useEffect(() => {
    if (token["mytoken"]) {
      history("/");
    }
  }, [token]);

  const input_event = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
      setUsernameError(false);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
      setPasswordError(false);
    }
  };

  const LoginBtn = () => {
    if (username === "" && password === "") {
      setUsernameError(true);
      setPasswordError(true);
      return;
    } else if (username === "") {
      setUsernameError(true);
      return;
    } else if (password === "") {
      setPasswordError(true);
      return;
    }
    APIService.LoginUser({ username, password })
      .then((data) => {
        //console.log(data); //{token: 'c803003f23a14a7bf46db7374b805bb9d2f87de7'} 取得Token
        if (data.token) {
          setToken("mytoken", data.token);
          setToken("user_id", data.user_id);
          setToken("user_name", data.user_name);
          window.location.href = "/";
        } else {
          swal("無效的帳號或密碼");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
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
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            登入
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              sx={{
                input: { color: "#49f6cbfb" },
                label: { color: "#1976d2" },
              }}
              margin="normal"
              required
              fullWidth
              autoFocus
              color="primary"
              id="username"
              label="帳號"
              name="username"
              autoComplete="username"
              error={username_error}
              helperText={username_error ? "此項為必填項目" : ""}
              value={username}
              onChange={input_event}
            />
            <TextField
              sx={{
                input: { color: "#49f6cbfb" },
                label: { color: "#1976d2" },
              }}
              margin="normal"
              required
              fullWidth
              color="primary"
              name="password"
              label="密碼"
              type="password"
              id="password"
              autoComplete="current-password"
              error={password_error}
              helperText={password_error ? "此項為必填項目" : ""}
              value={password}
              onChange={input_event}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => LoginBtn()}
              sx={{ mt: 3, mb: 2 }}
            >
              登入
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to="/register"
                  variant="body2"
                  style={{
                    fontWeight: 900,
                    color: "#1976d2",
                    textDecoration: 0,
                  }}
                >
                  尚未擁有帳號? 來註冊
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

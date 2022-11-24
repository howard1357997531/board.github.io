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
import { pink } from "@mui/material/colors";

const theme = createTheme();

export default function Register() {
  const [lastname, setLastname] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [lastname_error, setLastnameError] = React.useState(false);
  const [firstname_error, setFirstnameError] = React.useState(false);
  const [email_error, setEmailError] = React.useState(false);
  const [username_error, setUsernameError] = React.useState(false);
  const [password_error, setPasswordError] = React.useState(false);
  const [password2_error, setPassword2Error] = React.useState(false);
  const [username_warning, setUsernameWarning] =
    React.useState("此項為必填項目");
  const [password_warning, setPasswordWarning] =
    React.useState("此項為必填項目");
  const [token, setToken] = useCookies(["mytoken"]);
  let history = useNavigate();

  React.useEffect(() => {
    if (token["mytoken"]) {
      history("/");
    }
  }, [token]);

  const input_event = (e) => {
    if (e.target.name === "lastname") {
      setLastname(e.target.value);
      setLastnameError(false);
    } else if (e.target.name === "firstname") {
      setFirstname(e.target.value);
      setFirstnameError(false);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
      setEmailError(false);
    } else if (e.target.name === "username") {
      setUsername(e.target.value);
      setUsernameError(false);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
      setPasswordError(false);
    } else if (e.target.name === "password2") {
      setPassword2(e.target.value);
      setPassword2Error(false);
    }
  };

  const RegisterBtn = () => {
    lastname === "" ? setLastnameError(true) : setLastnameError(false);
    firstname === "" ? setFirstnameError(true) : setFirstnameError(false);
    email === "" ? setEmailError(true) : setEmailError(false);
    if (username === "") {
      setUsernameError(true);
      setUsernameWarning("此項為必填項目");
    } else {
      setPasswordError(false);
    }
    if (password === "") {
      setPasswordError(true);
      setPasswordWarning("此項為必填項目");
    } else {
      setPasswordError(false);
    }
    if (password2 === "") {
      setPassword2Error(true);
      setPasswordWarning("此項為必填項目");
    } else {
      setPassword2Error(false);
    }

    if (
      lastname === "" ||
      firstname === "" ||
      email === "" ||
      username === "" ||
      password === "" ||
      password2 === ""
    ) {
      return;
    } else {
      if (username.length < 6) {
        setUsernameError(true);
        setUsernameWarning("帳號長度需大於6個字");
      } else if (username.length > 20) {
        setUsernameError(true);
        setUsernameWarning("密碼長度需小於20個字");
      } else if (password.length < 8) {
        setPasswordError(true);
        setPasswordWarning("密碼長度需大於8個字");
      } else if (password.length > 20) {
        setPasswordError(true);
        setPasswordWarning("密碼長度需小於20個字");
      } else if (password !== password2) {
        setPasswordError(true);
        setPassword2Error(true);
        setPasswordWarning("兩次密碼輸入不相同");
      } else {
        console.log({
          lastname: lastname,
          firstname,
          email,
          username,
          password,
          password2,
        });
        APIService.RegisterUser({
          last_name: lastname,
          first_name: firstname,
          email: email,
          username: username,
          password: password,
          password2: password2,
        }).then((res) => {
          APIService.LoginUser({
            username,
            password,
          })
            .then((data) => {
              if (data.token) {
                setToken("mytoken", data.token);
                setToken("user_id", data.user_id);
                setToken("user_name", data.user_name);
                window.location.href = "/";
              } else {
                swal("此帳號已經有人使用");
              }
            })
            .catch((error) => console.log(error));
        });
      }
    }

    /*
     */
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
          <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            註冊
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{
                    input: { color: "#49f6cbfb" },
                    label: { color: "#2e7d32" },
                  }}
                  required
                  fullWidth
                  autoFocus
                  color="success"
                  id="lastname"
                  label="姓氏"
                  name="lastname"
                  autoComplete="family-name"
                  error={lastname_error}
                  helperText={lastname_error ? "此項為必填項目" : ""}
                  value={lastname}
                  onChange={input_event}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{
                    input: { color: "#49f6cbfb" },
                    label: { color: "#2e7d32" },
                  }}
                  required
                  fullWidth
                  color="success"
                  id="firstname"
                  label="名字"
                  name="firstname"
                  autoComplete="given-name"
                  error={firstname_error}
                  helperText={firstname_error ? "此項為必填項目" : ""}
                  value={firstname}
                  onChange={input_event}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{
                    input: { color: "#49f6cbfb" },
                    label: { color: "#2e7d32" },
                  }}
                  required
                  fullWidth
                  color="success"
                  id="email"
                  label="電子郵件"
                  name="email"
                  autoComplete="email"
                  error={email_error}
                  helperText={email_error ? "此項為必填項目" : ""}
                  value={email}
                  onChange={input_event}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{
                    input: { color: "#49f6cbfb" },
                    label: { color: "#2e7d32" },
                  }}
                  required
                  fullWidth
                  color="success"
                  id="username"
                  label="帳號"
                  name="username"
                  autoComplete="username"
                  error={username_error}
                  helperText={username_error ? username_warning : ""}
                  value={username}
                  onChange={input_event}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{
                    input: { color: "#49f6cbfb" },
                    label: { color: "#2e7d32" },
                  }}
                  required
                  fullWidth
                  color="success"
                  name="password"
                  label="密碼"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={password_error}
                  helperText={password_error ? password_warning : ""}
                  value={password}
                  onChange={input_event}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{
                    input: { color: "#49f6cbfb" },
                    label: { color: "#2e7d32" },
                  }}
                  required
                  fullWidth
                  color="success"
                  name="password2"
                  label="密碼確認"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  error={password2_error}
                  helperText={password2_error ? password_warning : ""}
                  value={password2}
                  onChange={input_event}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={() => RegisterBtn()}
              sx={{ mt: 3, mb: 2 }}
            >
              註冊
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to="/login"
                  variant="body2"
                  style={{
                    fontWeight: 600,
                    color: "#2e7d32",
                    textDecoration: 0,
                  }}
                >
                  已有帳號? 去登入
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

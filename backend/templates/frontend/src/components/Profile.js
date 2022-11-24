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
import { useNavigate, Navigate } from "react-router-dom";

const theme = createTheme();

export default function Profile(props) {
  const [userdata, setUserdata] = React.useState(props.profiledata);
  const [token] = useCookies(["mytoken"]);
  const history = useNavigate();
  console.log(props.profiledata);

  React.useEffect(() => {
    if (props.profiledata.last_name === "") {
      history("/");
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataitems = {
      last_name: data.get("lastname"),
      first_name: data.get("firstname"),
      email: data.get("email"),
      phone: data.get("phone"),
      address: data.get("address"),
    };
    if (
      props.profiledata.last_name === data.get("lastname") &&
      props.profiledata.first_name === data.get("firstname") &&
      props.profiledata.email === data.get("email") &&
      props.profiledata.phone === data.get("phone") &&
      props.profiledata.address === data.get("address")
    ) {
      swal("請更改內容");
    } else if (data.get("lastname") === "") {
      swal("姓氏不可空白");
    } else if (data.get("firstname") === "") {
      swal("名字不可空白");
    } else {
      APIService.UpdateProfile(token["user_id"], dataitems, token["mytoken"])
        .then(() => {
          swal("個人資料修改成功 ~").then(() => {
            props.updateProfile({
              ...dataitems,
              user_id: props.profiledata.user,
              created_at: props.profiledata.created_at,
            });
            history("/");
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {!props.profiledata ? (
        <Navigate replace to="/" />
      ) : (
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
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <PersonIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                個人資料修改
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      sx={{
                        input: { color: "#49f6cbfb" },
                        label: { color: "#9c27b0" },
                      }}
                      required
                      fullWidth
                      autoFocus
                      color="secondary"
                      id="lastname"
                      label="姓氏"
                      name="lastname"
                      autoComplete="family-name"
                      defaultValue={userdata.last_name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      sx={{
                        input: { color: "#49f6cbfb" },
                        label: { color: "#9c27b0" },
                      }}
                      required
                      fullWidth
                      color="secondary"
                      id="firstname"
                      label="名字"
                      autoComplete="given-name"
                      name="firstname"
                      defaultValue={userdata.first_name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      sx={{
                        input: { color: "#49f6cbfb" },
                        label: { color: "#9c27b0" },
                      }}
                      required
                      fullWidth
                      color="secondary"
                      id="email"
                      label="電子郵件"
                      name="email"
                      autoComplete="email"
                      defaultValue={userdata.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      sx={{
                        input: { color: "#49f6cbfb" },
                        label: { color: "#9c27b0" },
                      }}
                      required
                      fullWidth
                      color="secondary"
                      id="phone"
                      label="電話"
                      name="phone"
                      autoComplete="username"
                      defaultValue={userdata.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      sx={{
                        input: { color: "#49f6cbfb" },
                        label: { color: "#9c27b0" },
                      }}
                      required
                      fullWidth
                      color="secondary"
                      id="address"
                      label="地址"
                      name="address"
                      autoComplete="username"
                      defaultValue={userdata.address}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  color="secondary"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  修改
                </Button>
                <Grid item xs={12} align="right">
                  帳號創建時間 : {userdata.created_at}
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}

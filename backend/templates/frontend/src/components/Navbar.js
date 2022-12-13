import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";

function Navbar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const history = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    if (!props.token.mytoken) {
      swal("請登入").then(() => {
        history("/login");
      });
    }
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "inherit", boxShadow: "0" }}>
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <Toolbar disableGutters>
          <ChatRoundedIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            留言板
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => {
                setAnchorElNav(null);
              }}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={() => {
                  setAnchorElNav(null);
                  window.location.href = "/";
                }}
              >
                <Typography textAlign="center">主頁</Typography>
              </MenuItem>
              {props.token.mytoken ? (
                <MenuItem
                  onClick={() => {
                    setAnchorElNav(null);
                    history("/myarticle");
                  }}
                >
                  <Typography textAlign="center">我的發文</Typography>
                </MenuItem>
              ) : null}
              {props.token.mytoken ? (
                <MenuItem
                  onClick={() => {
                    setAnchorElNav(null);
                    history("/my-save-article");
                  }}
                >
                  <Typography textAlign="center">我的珍藏</Typography>
                </MenuItem>
              ) : null}
              {props.token.mytoken ? (
                <MenuItem
                  onClick={() => {
                    setAnchorElNav(null);
                    history("/create_article");
                  }}
                >
                  <Typography textAlign="center">發文</Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">發文</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <ChatRoundedIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            留言板
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                setAnchorElNav(null);
                window.location.href = "/";
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              主頁
            </Button>
            {props.token.mytoken ? (
              <Button
                onClick={() => {
                  setAnchorElNav(null);
                  history("/myarticle");
                }}
                sx={{ my: 2, mr: 1, color: "white", display: "block" }}
              >
                我的發文
              </Button>
            ) : null}
            {props.token.mytoken ? (
              <Button
                onClick={() => {
                  setAnchorElNav(null);
                  history("/my-save-article");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                我的珍藏
              </Button>
            ) : null}
            {props.token.mytoken ? (
              <Button
                onClick={() => {
                  setAnchorElNav(null);
                  history("/create_article");
                }}
                variant="contained"
                color="warning"
                sx={{ my: 2, ml: 2, mr: 5, color: "white", display: "block" }}
              >
                發文
              </Button>
            ) : (
              <Button
                onClick={handleCloseNavMenu}
                variant="contained"
                color="warning"
                sx={{ my: 2, ml: 2, mr: 5, color: "white", display: "block" }}
              >
                發文
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" } }}>
            {props.token.mytoken ? (
              <>
                <Typography
                  mt={1}
                  sx={{
                    mr: 1,
                    color: "#852fa9",
                    fontWeight: 900,
                    display: { xs: "none", md: "flex" },
                  }}
                >
                  您好~ {props.token.user_name}
                </Typography>
                <IconButton
                  size="medium"
                  sx={{ mr: 1 }}
                  color="secondary"
                  to="/profile"
                  component={Link}
                >
                  <PersonIcon size="medium" />
                </IconButton>
              </>
            ) : null}
            {props.token.mytoken ? (
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={props.logoutBtn}
              >
                登出
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                to="/login"
                component={Link}
              >
                登入
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;

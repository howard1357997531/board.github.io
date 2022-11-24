import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const history = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      history("/");
    }, 1500);
  }, []);

  return (
    <Typography
      variant="h3"
      gutterBottom
      align="center"
      sx={{ marginTop: 25, color: "#0dcaf0" }}
    >
      404 Not Found
    </Typography>
  );
};

export default NotFoundPage;

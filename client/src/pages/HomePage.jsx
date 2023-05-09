import React from "react";
import DragUp from "../components/DragUp";
import Background from "../components/Background";
import BackgroundImage from "../components/BackgroundImage";
import Typography from "@mui/material/Typography";

function HomePage() {
  return (
    <>
      <BackgroundImage />
      <Background>
        <Typography
          variant="h1"
          style={{ textAlign: "center", color: "white", marginTop: "200px" }}
        >
          Your Journey Begins Now{" "}
        </Typography>
        <DragUp />
      </Background>
    </>
  );
}

export default HomePage;

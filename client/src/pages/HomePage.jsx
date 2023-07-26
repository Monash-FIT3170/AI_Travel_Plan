import React from "react";
import DragUp from "../components/appbar-landing/DragUp";
import Background from "../components/background/Background";
import BackgroundImage from "../components/background/BackgroundImage";
import Typography from "@mui/material/Typography";

function HomePage() {
  return (
    <>
      <BackgroundImage />
      <Background scrollable={false}>
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

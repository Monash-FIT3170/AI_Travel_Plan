import React from "react";
import ExampleBox from "../components/examples/ExampleBox";
import Background from "../components/Background";
import BackgroundImage from "../components/BackgroundImage";
import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
import HelpMenu from "../components/help/HelpMenu";

export default function ExamplePage() {
  return (
    <>
      <BackgroundImage />
      <Background>
        <Typography
          variant="h3"
          style={{ textAlign: "center", color: "white", marginTop: "100px" }}
        >
          We are here to help{" "}
        </Typography>
        <HelpMenu />
      </Background>
    </>
  );
}

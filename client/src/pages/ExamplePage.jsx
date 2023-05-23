import React from "react";
import ExampleBox from "../components/examples/ExampleBox";
import Background from "../components/Background";
import BackgroundImage2 from "../components/BackgroundImage2";
import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
import HelpMenu from "../components/help/HelpMenu";

export default function ExamplePage() {
  return (
    <>
      <BackgroundImage2 />
      <Background>
        <Typography
          variant="h3"
          style={{ textAlign: "center", color: "white", marginTop: "100px" }}
        >
          We are here to help{" "}
        </Typography>
        <div style={{ marginTop: "50px" }}>
          <HelpMenu />
        </div>
      </Background>
    </>
  );
}

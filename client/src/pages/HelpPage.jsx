import React from "react";
<<<<<<< HEAD
import Background from "../components/background/Background";
import BackgroundImage from "../components/background/BackgroundImage";
import Typography from "@mui/material/Typography";
=======
import ExampleBox from "../components/examples/ExampleBox";
import Background from "../components/Background";
import BackgroundImage from "../components/BackgroundImage";
import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
>>>>>>> dev
import HelpMenu from "../components/help/HelpMenu";

export default function HelpPage() {
  return (
    <>
      <BackgroundImage />
      <Background>
        <Typography
          variant="h3"
<<<<<<< HEAD
          style={{textAlign: "center", color: "white", marginTop: "100px"}}
        >
          We are here to help{" "}
        </Typography>
        <div style={{marginTop: "50px"}}>
=======
          style={{ textAlign: "center", color: "white", marginTop: "100px" }}
        >
          We are here to help{" "}
        </Typography>
        <div style={{ marginTop: "50px" }}>
>>>>>>> dev
          <HelpMenu />
        </div>
      </Background>
    </>
  );
}

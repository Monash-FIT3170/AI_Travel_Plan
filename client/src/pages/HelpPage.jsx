import React from "react";
import Background from "../components/background/Background";
import BackgroundImage from "../components/background/BackgroundImage";
import Typography from "@mui/material/Typography";
import HelpMenu from "../components/help/HelpMenu";

export default function HelpPage() {
  return (
    <>
      <BackgroundImage />
      <Background>
        <Typography
          variant="h3"
          style={{textAlign: "center", color: "white", marginTop: "100px"}}
        >
          We are here to help{" "}
        </Typography>
        <div style={{marginTop: "50px"}}>
          <HelpMenu />
        </div>
      </Background>
    </>
  );
}

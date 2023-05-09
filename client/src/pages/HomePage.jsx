import React from "react";
import DragUp from "../components/DragUp";
import Background from "../components/Background";
import BackgroundImage from "../components/BackgroundImage";

function HomePage() {
  return (
    <>
      <BackgroundImage />
      <Background>
        <DragUp />
      </Background>
    </>
  );
}

export default HomePage;

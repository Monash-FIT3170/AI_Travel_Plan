import React from "react";
import background2 from "../assets/background2.jpeg";

const BackgroundImage2 = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${background2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
      }}
    />
  );
};

export default BackgroundImage2;

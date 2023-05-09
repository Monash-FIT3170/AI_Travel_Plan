import React from "react";

const Background = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(128,128,128,0.5)",
        paddingTop: "64px", // padding to prevent overlap with AppBar
        position: "relative", // position is relative now
        zIndex: 1, // zIndex is positive now
        height: "calc(100vh - 64px)", // Adjust for AppBar height
        overflow: "auto", // Add overflow in case of content spilling over
      }}
    >
      {children}
    </div>
  );
};

export default Background;

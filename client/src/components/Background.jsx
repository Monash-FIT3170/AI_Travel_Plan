import React from "react";

const Background = ({ children, scrollable = true }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(128,128,128,0.5)",
        paddingTop: "64px",
        position: "relative",
        zIndex: 1,
        height: "100vh",
        overflow: scrollable ? "auto" : "hidden",
      }}
    >
      {children}
    </div>
  );
};

export default Background;

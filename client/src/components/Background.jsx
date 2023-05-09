import React from "react";

const Background = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(128,128,128,0.5)",
        paddingTop: "64px",
        position: "relative",
        zIndex: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      {children}
    </div>
  );
};

export default Background;

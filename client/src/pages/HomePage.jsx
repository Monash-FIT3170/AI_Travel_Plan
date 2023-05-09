import React from "react";
import DragUp from "../components/DragUp"; // Import the new component

function HomePage() {
  return (
    <div style={{ backgroundColor: "rgba(128,128,128,0.5)", height: "100vh" }}>
      {/* Your image will go here */}
      <DragUp />
    </div>
  );
}

export default HomePage;

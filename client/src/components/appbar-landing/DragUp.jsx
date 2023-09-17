import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DragUp = () => {
  const [dragStart, setDragStart] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  const handleMouseMove = (e) => {
    if (isDragging && dragStart - e.clientY > 20) {
      navigate("/chat", { state: { fromHomePage: true } });
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ cursor: "ns-resize", height: "100%" }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "69px" }}>↑</span>
        <p>Swipe up to start talking to our AI Travel Planner </p>
      </div>
    </div>
  );
};

export default DragUp;

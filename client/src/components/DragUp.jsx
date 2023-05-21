import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * DragUp component - It renders an interactive upward arrow.
 * The arrow can be "dragged" upwards to navigate to the Chat page.
 * @returns {React.Component} The rendered DragUp component.
 */
const DragUp = () => {
  const [dragStart, setDragStart] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles the mouse down event, sets the dragging status and records the y-coordinate.
   * @param {Object} e - The event object.
   */
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientY);
  };

  /**
   * Handles the mouse up event, resets the dragging status and the start position.
   */
  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  /**
   * Handles the mouse move event.
   * If the user is dragging and the drag is upwards more than 20px, it navigates to the chat page.
   * Sets fromHomePage to true in the location state.
   * @param {Object} e - The event object.
   */
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
      style={{ cursor: "ns-resize", height: "100%", userSelect: "none" }}
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

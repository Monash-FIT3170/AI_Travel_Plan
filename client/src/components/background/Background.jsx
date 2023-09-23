import React from "react";

// Background colour set for all pages except landing page
const Background = ({ children, scrollable = true }) => {
	return (
		<div
			style={{
				backgroundColor: "#2c387e",
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

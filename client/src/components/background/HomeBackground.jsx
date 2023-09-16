import React from "react";

const HomeBackground = ({ children, scrollable = true }) => {
	return (
		<div
			style={{
				backgroundColor: "rgba(0,0, 0,0.5)",
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

export default HomeBackground;

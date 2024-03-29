import React from "react";
import background from "../../assets/background.jpeg";

// Background image set for landing page
const BackgroundImage = () => {
	return (
		<div
			style={{
				backgroundImage: `url(${background})`,
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

export default BackgroundImage;

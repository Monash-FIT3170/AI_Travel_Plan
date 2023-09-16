import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const MyAppBar = () => {
	const [activeButton, setActiveButton] = useState("");

	const handleClick = (buttonName) => {
		setActiveButton(buttonName);
	};

	return (
		<AppBar
			position="fixed"
			style={{ backgroundColor: "#1d1e1f", zIndex: 2, boxShadow: "none" }}
		>
			<Toolbar>
				<Box display="flex" alignItems="center" flexGrow={1}>
					<Link
						to="/"
						style={{
							color: "inherit",
							textDecoration: "none",
							display: "flex",
							alignItems: "center",
						}}
					>
						<HomeIcon style={{ marginRight: "10px", color: "white" }} />
						<Typography
							variant="h6"
							style={{ fontFamily: ["Roboto Slab", "serif"], color: "white" }}
						>
							Get Packing, Traveller
						</Typography>
					</Link>
				</Box>
				<Button
					color="inherit"
					component={Link}
					to="/chat"
					style={{
						color: "white",
						marginRight: "88px",
						backgroundColor:
							activeButton === "travel" ? "brown" : "transparent",
					}}
					onClick={() => handleClick("travel")}
				>
					Travel Planner
				</Button>
				<Button
					color="inherit"
					component={Link}
					to="/itinerary"
					style={{
						color: "white",
						marginRight: "88px",
						backgroundColor:
							activeButton === "itinerary" ? "brown" : "transparent",
					}}
					onClick={() => handleClick("itinerary")}
				>
					Itinerary
				</Button>
				<Button
					color="inherit"
					component={Link}
					to="/example"
					style={{
						color: "white",
						marginRight: "88px",
						backgroundColor: activeButton === "help" ? "brown" : "transparent",
					}}
					onClick={() => handleClick("help")}
				>
					Help
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default MyAppBar;

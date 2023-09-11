import React from "react";
import DragUp from "../components/appbar-landing/DragUp";
import Background from "../components/background/Background";
import BackgroundImage from "../components/background/BackgroundImage";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {" "}
      <BackgroundImage />
      <Background scrollable={false}>
        <Typography
          variant="h1"
          style={{ fontFamily: ['Roboto Slab', 'serif'], textAlign: "center", color: "white", marginTop: "200px" }}
        >
          Your Journey Begins Now{" "}
        </Typography>
        <DragUp />
      </Background>
    </motion.div>
  );
}

export default HomePage;

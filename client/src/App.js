import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";
import HelpPage from "./pages/HelpPage";
import HomePage from "./pages/HomePage";
import MyAppBar from "./components/AppBar";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <Router>
      <MyAppBar />
      <AnimatePresence wait>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/itinerary" element={<ChatPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;

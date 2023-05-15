import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";
import { ItineraryPage } from "./pages/ItineraryPage";
import { ItineraryRight } from "./pages/itineraryRight";
import ExamplePage from "./pages/ExamplePage";
import HomePage from "./pages/HomePage";
import MyAppBar from "./components/AppBar";
/**
 * The high level component that contains all pages and components of the application
 * @returns The application's view
 */

function App() {
  return (
    <Router>
      <MyAppBar />

      <Routes>
        {" "}
        {/* <- used to switch between pages of the application. Uses react-router-dom*/}
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />}></Route>
        <Route path="/itinerary" element={<ItineraryRight />}></Route>
        <Route path="/example" element={<ExamplePage />}></Route>
        {/* vv You can add more pages to the app like so vv */}
        {/* <Route path='/login' element={<LoginPage />} /> */}{" "}
        {/* This would create a new page using the Login page component at address localhost:3000/login */}
        {/* <Route path='/register' element={<RegisterPage />} /> */}{" "}
        {/* This would create a new page using the Register page component at address localhost:3000/register */}
      </Routes>
    </Router>
    // Remember, any components that are placed in the App component (here) but not nested inside Router component are not part of a specific page and are application wide.
    // This means Even if you switch pages, the components here will never change.
  );
}

export default App;

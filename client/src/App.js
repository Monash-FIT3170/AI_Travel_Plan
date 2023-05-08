
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ExamplePage from "./pages/ExamplePage"

/**
 * The high level component that contains all pages and components of the application
 * @returns The application's view
 */

import React, { useEffect } from "react";
import AddButton from "./components/AddButton";
import ItineraryButton from "./components/ItinerarySummaryButton";
import { mockTravel_Itinerary1 } from "./MockItinerary.js";
import DeleteAlert from "./components/DeleteAlert";
import DeleteButton from "./components/DeleteButton";
import Template from "./components/Template";
import EditButton from "./components/EditButton";
import NewDestination from "./components/NewDestination";
import { MyForm2 } from "./components/StorageDailyItineraryGeneral";
// import { MyForm1 } from "./components/StorageEventGeneral";
import Chatbox from "./components/chatbox";

function App() {
  // useEffect below is to store mock data in local storage temorarily until we are able to get real data.
  useEffect(() => {
    // Store the mock data in local storage when the page is loaded
    const itineraryKey = "travelItinerary";
    const storedItinerary = localStorage.getItem(itineraryKey);

    if (!storedItinerary) {
      localStorage.setItem(itineraryKey, JSON.stringify(mockTravel_Itinerary1));
    }
  }, []);

  return (
    <Router>
      <div className='container'>
        {/*<Header />  <- this header component will generate at the top of the page. */}
        {/*  ^^ Header currently not implemented so it is commented out*/}
        <Routes> {/* <- used to switch between pages of the application. Uses react-router-dom*/}
          <Route path='/' element={<ExamplePage />} /> {/* currently the root or home page is set to ExamplePage(i.e., localhost:3000/) */}

          {/* vv You can add more pages to the app like so vv */} 

          {/* <Route path='/login' element={<LoginPage />} /> */} {/* This would create a new page using the Login page component at address localhost:3000/login */}
          {/* <Route path='/register' element={<RegisterPage />} /> */} {/* This would create a new page using the Register page component at address localhost:3000/register */}
        
        </Routes>
      </div>
    </Router>
    
    // Remember, any components that are placed in the App component (here) but not nested inside Router component are not part of a specific page and are application wide. 
    // This means Even if you switch pages, the components here will never change. 
=======    <div>
      <EditButton />
      <AddButton />
      <ItineraryButton />
      // ART3
      <h1> HELLO </h1>
      <Template></Template>
      <EditButton />
      <NewDestination />
      {/* <AddButton /> */}
       
      <DeleteButton></DeleteButton>
      <DeleteAlert></DeleteAlert>
      <MyForm2 />
      // End of ART3

      <Chatbox />
    </div>
  );
}

export default App;

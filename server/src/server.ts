// Importing module
import express from "express";
import dotenv from "dotenv";
dotenv.config();
let cors = require("cors");
const api = require("./routes/index");
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 4000;
import { Event, Travel_Itinerary } from "./ApplicationTypes";
import { sendResponse } from "./services/OpenIAIService";
import { mockTravel_Itinerary1 } from "./MockItinerary";

const app = express();
app.use(cors());
app.use("/api", api);

/**
 * Here is the endpoint for the server. Anytime you open localhost:4000/exampleAPI while the server is running, this will run.
 */
app.get("/exampleAPI", (req, res) => {
  res.send("I live in the server");
});

app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/mockItinerary", (req, res) => {
  res.json(mockTravel_Itinerary1);
});
// Server setup
app.listen(PORT, () => {
  console.log(
    "The application is listening " + "on port http://localhost:" + PORT,
  );
});

// testing open api request
// sendResponse("where should i go ").catch((err) => {
// 	console.log(err.response.data)
// }).
// 	then((response) => {
// 		console.log(response)
// 		const place: Event = response ? JSON.parse(response) : null
// 		console.log(place.description)
// 	})

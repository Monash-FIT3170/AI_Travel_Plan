// Importing module
import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
let cors = require("cors");
const api = require('./routes/index');
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 4000;
import { Event, Travel_Itinerary } from './ApplicationTypes'
import { sendResponse } from './services/OpenIAIService'
const app = express();
app.use(cors());
app.use(express.json())

app.use('/api', api);

/**
 * We define a route as follows. 
 * The first argument is the actual route in the web request (http://localhost:4000/api/ExampleRoute)
 * The second argument is the file that contains the router for the REST API. In our case, we import the file using the require() method.
 * check out routes/ExampleRoute for the get request!
 */
app.use('/api/ExampleRoute', require('./routes/ExampleRoute'))


app.get('/', (req, res) => {
	res.send('Hi');
})

// Server setup
app.listen(PORT, () => {
	console.log('The application is listening '
		+ 'on port http://localhost:' + PORT);
})

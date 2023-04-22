// Importing module
import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
const api = require('./routes/index');

const app = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 4000;
import { Event, Travel_Itinerary } from './ApplicationTypes'
import { sendResponse } from './services/OpenIAIService'

app.use('/api', api);

app.get('/', (req, res) => {
	res.send('Hi');
})
// Server setup
app.listen(PORT, () => {
	console.log('The application is listening '
		+ 'on port http://localhost:' + PORT);
})

// testing open api request
// sendResponse("where should i go ").catch((err) => {
// 	console.log(err.response.data)
// }).
// 	then((response) => {
// 		console.log(response)
// 		const place: Event = response ? JSON.parse(response) : null
// 		console.log(place.description)
// 	})

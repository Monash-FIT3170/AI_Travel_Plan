// Importing module
import express from 'express';
import dotenv from 'dotenv';
import { arenSendResponse } from './services/ArenOpenAIService';
dotenv.config()

let cors = require("cors");

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 4000;
import swaggerDocs from './utils/swagger';



const app = express();
app.use(cors())
//convert input to json
app.use(express.json())

//handle routes
app.use('/api/healthCheck', require('./routes/healthCheckRoutes'));
app.use('/api/exampleRoute', require('./routes/ExampleRoute'));
app

/**
 * We define a route as follows. 
 * The first argument is the actual route in the web request (http://localhost:4000/api/ExampleRoute)
 * The second argument is the file that contains the router for the REST API. In our case, we import the file using the require() method.
 * check out routes/ExampleRoute for the get request!
 */
// app.use('/api/ExampleRoute', require('./routes/ExampleRoute'))


// Server setup
app.listen(PORT, () => {
  console.log('The application is listening '
    + 'on port http://localhost:' + PORT);

  swaggerDocs(app, PORT)
})

const exampleChatHistory = [{
  prompt: "give me one place to visit in los angeles", 
  reply: {
    "places":[
    {
    "place":"The Getty Center",
    "date":"Anytime",
    "cost":0,
    "description":"A world-renowned art museum and architectural landmark, featuring stunning collections of European paintings, sculptures, and decorative arts, as well as beautiful gardens and stunning views of Los Angeles.",
    "address":"1200 Getty Center Drive, Los Angeles, CA 90049"
    }
    ],
    "chatResponse":"I recommend visiting The Getty Center in Los Angeles. It's a beautiful art museum and architectural landmark that offers stunning collections of European art, beautiful gardens, and incredible views of the city. Best of all, admission is free!"
  }}, {prompt: "give me another 2 places in Los angeles other than the one you reccomended", reply: {
    
      "places": [
        {
          "place": "The Getty Center",
          "date": "Any day except Mondays",
          "cost": 0,
          "description": "A stunning art museum with beautiful gardens and impressive views of the city",
          "address": "1200 Getty Center Dr, Los Angeles, CA 90049"
        },
        {
          "place": "Universal Studios Hollywood",
          "date": "Any day",
          "cost": 109,
          "description": "An exciting amusement park with rides, shows, and attractions based on your favorite movies and TV shows.",
          "address": "100 Universal City Plaza, Universal City, CA 91608"
        },
        {
          "place": "Santa Monica Pier",
          "date": "Any day",
          "cost": 0,
          "description": "A legendary pier with an amusement park, aquarium, plenty of food options, and stunning views of the ocean.",
          "address": "200 Santa Monica Pier, Santa Monica, CA 90401"
        }
      ],
      "chatResponse": "Here are a couple more places to check out: Universal Studios Hollywood and Santa Monica Pier. I also previously suggested The Getty Center."
    
  }}]

const data = arenSendResponse("give me another 1 place in Los angeles other than the ones you reccomended.", exampleChatHistory)
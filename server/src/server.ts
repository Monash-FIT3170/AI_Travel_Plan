// Importing module
import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

let cors = require("cors");

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 4000;
import swaggerDocs from './utils/swagger';



const app = express();

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

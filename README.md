# Welcome
This repository contains the source code for the AI powered travel planner, **Get Packing Traveller**
# Contents
- [Required Tech](#Required-Tech)
- [How to Run the App](#How-to-Run-the-App-in-Dev-Environment-(Method-1))
	- [Installing Dependencies](#installing-dependencies)
	- [Adding Environment Variables](#adding-environment-variables)
	- [Optional Docker]
	- [Running the Application](#running-the-application)
- [Additional Notes](#additional-notes)
	- [Tech Stack](#tech-stack)
	- [APIs Used](#apis-used)
	- [Common Issues](#common-issues)
# Required Tech
- A computer (Windows or Mac is fine)
- node.js installed on your machine
- an IDE or text editor (ideally vs code)
- [OPTIONAL] Docker
# How to Run the App in Dev Environment (Method 1)
This section will outline how to run the application. 
It contains the steps for installing dependencies, adding environment variables, <**Other stuff?**> and running the application.
## Installing Dependencies
First, clone the repository onto your machine.
Basic understanding of the terminal would be helpful, but not required. 
Ensure your terminal window is open in the root of the project. 
```console
PS <file_path_to_project>\AI_Travel_Plan>
``` 
Now, install dependencies in both the `AI_Travel_Plan/client` and `AI_Travel_Plan/server` directories
For example, to install dependencies in **client**:
```console
PS <file_path_to_project>\AI_Travel_Plan> cd client
PS <file_path_to_project>\AI_Travel_Plan\client> npm install
```
you can navigate out of the client directory by entering the `cd ..` command: 

```console
PS <file_path_to_project>\AI_Travel_Plan\client> cd .. 
PS <file_path_to_project>\AI_Travel_Plan>
```
repeat the install process in the **server** directory.

## Adding Environment Variables
within **both** the **client** and **server** folder, a `.env` file should be created

In the `client/.env` file, the following API credentials should be added: 
```
REACT_APP_MAPBOX_API_KEY=<Your mapbox api key>
REACT_APP_WEATHER_API_KEY=<Your open weather map api key>
REACT_APP_GOOGLE_PLACES_API_KEY=<Your Google Places api key>
```

In the `server/.env` file, the following should be added: 
```
PORT = 4000; 
OPENAI_API_KEY =<your openai api key>
```


## Running the Application (Dev Environment)
After all the necessary setup has been completed, you should be ready to run the application in the development environment.
Open two terminal windows. 
- One terminal will run the react app in port 3000.
- the other will run the server in port 4000.

In the first terminal: 
```console
PS <file_path_to_project>\AI_Travel_Plan> cd client
PS <file_path_to_project>\AI_Travel_Plan\client> npm start
```

in the second terminal: 
```console
PS <file_path_to_project>\AI_Travel_Plan> cd server
PS <file_path_to_project>\AI_Travel_Plan\server> npm run dev
```

The react app should open in your browser. After running both steps above, you should be ready to use the application in the development environment. 

The react app should open in your browser. After running both steps above, you should be ready to use the application in the development environment. 

# How to run the App in Dev Environment (Method 2)
1. download docker or check if docker exist in the system by typing `docker -v`
2. run `docker-compose up` make sure to run this in the root project folder
3. Download docker extension on vs code.
4. Open Command Palette (Ctrl+Shift+P) and Click on attached to running container
5. Once finish run `docker-compose down`

# Running the Application (Prod Environment)
After all the necessary setup has been completed, you should be ready to run the application in the development environment.
Open two terminal windows. 
- One terminal will run the react app in port 3000.
- the other will run the server in port 4000.

In the first terminal: 
```console
PS <file_path_to_project>\AI_Travel_Plan> cd client
PS <file_path_to_project>\AI_Travel_Plan\client> npm run build // compile to production for execution
```

in the second terminal: 
```console
PS <file_path_to_project>\AI_Travel_Plan> cd server
PS <file_path_to_project>\AI_Travel_Plan\server> npm run build
PS <file_path_to_project>\AI_Travel_Plan\server> npm run start
```

# Additional Notes 
This section will outline our tech stack, APIs used, and some common troubleshooting. 
## Tech Stack 
- Front end components are created in the `src/components` folder and use [React jsx](https://legacy.reactjs.org/docs/introducing-jsx.html) syntax. 
	> Currently, we make use of [React Material UI](https://mui.com/material-ui/getting-started/) library for our components
 - Front End pages are stored in `src/pages` folder.
- Back end code is written in the `server` directory in the [TypeScript](https://www.typescriptlang.org/) language.
- Swagger documentation for backend routes uses OpenAPI syntax. See example below:
```  
  openapi: 3.0.0
info:
  title: Sample API
  description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
  version: 0.1.9
servers:
  - url: http://api.example.com/v1
    description: Optional server description, e.g. Main (production) server
  - url: http://staging-api.example.com
    description: Optional server description, e.g. Internal staging server for testing
paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in CommonMark or HTML.
      responses:
        '200':    # status code
          description: A JSON array of user names
          content:
            application/json:
              schema: 
                type: array
                items: 
                  type: string
```
- Front and back-end communication is handled by [Express.js](https://expressjs.com/)
  	>To add more routes, create router function on the routes folder. From the server.ts file create a link to the route functions
  
## APIs Used
In the front end: 
- [React Map GL](https://visgl.github.io/react-map-gl/)
	> Since this UI library is built on [Mapbox](https://www.mapbox.com/), you should obtain an API key from their site. The [free tier](https://www.mapbox.com/pricing) should be more than enough
- [Open Weather](https://openweathermap.org/api)
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)

In the back end: 
- [OpenAI API Doc](https://openai.com/blog/openai-api)
- [Emergency Contact Doc](https://emergencynumberapi.com/)
- [Currency Exchange API Doc](https://github.com/fawazahmed0/currency-api)
- [country code coversion API Doc](https://restcountries.com/)

## Common Issues
When running code someone else has written, ensure you perform `npm install` commands to install any new dependencies they may have added.

If there are issues where old itinerary information is being displayed, or the app crashes with an index error, open local storage and clear all itinerary and chat data.

Ensure you are adding all API keys to the relevant `.env` files.

The current frontend loading is quite slow, improvements are necessary

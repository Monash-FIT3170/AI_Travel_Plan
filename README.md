# Welcome
This repository contains the source code for the AI powered travel planner, **Get Packing Traveller**
# Contents
- [Required Tech](#Required-Tech)
- [How to Run the App](#how-to-run-the-app)
	- [Installing Dependencies](#InstallingDependencies)
	- [Adding Environment Variables](Adding-Environment-Variables)
	- [Any other setup?](Any-other-setup?)
	- [Running the Application](Running-the-Application)
- [Additional Notes](Additional-Notes)
	- [Tech Stack](Tech-Stack)
	- [APIs Used](APIs-Used)
	- [Common Issues](Common-Issues)
# Required Tech
- A computer (Windows or Mac is fine)
- node.js installed on your machine
- an IDE or text editor (ideally vs code)
- **anything else needed here?**
# How to Run the App
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

**do we need to do an install in the root folder??**
## Adding Environment Variables
within **both** the **client** and **server** folder, a `.env` file should be created

In the `client/.env` file, the following API credentials should be added: 
```
REACT_APP_MAPBOX_API_KEY=<Your mapbox api key>
REACT_APP_WEATHER_API_KEY =<Your open weather map api key>
```

In the `server/.env` file, the following should be added: 
```
PORT = 4000; 
OPENAI_API_KEY =<your openai api key>
```

## Any other setup? 
Not sure if there is any other setup required

## Running the Application
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

# Additional Notes 
This section will outline our tech stack, APIs used, and some common troubleshooting. 
## Tech Stack 
- Front end components are created in the `src/components` folder and use [React jsx](https://legacy.reactjs.org/docs/introducing-jsx.html) syntax. 
	> Currently, we make use of [React Material UI](https://mui.com/material-ui/getting-started/) library for our components
- back end code is written in the `server` directory in the [TypeScript](https://www.typescriptlang.org/) language.
- Front and back end communication is handled by [Express.js](https://expressjs.com/)
- **add more**
## APIs Used
In the front end: 
- [React Map GL](https://visgl.github.io/react-map-gl/)
	> Since this UI library is built on [Mapbox](https://www.mapbox.com/), you should obtain an API key from their site. The [free tier](https://www.mapbox.com/pricing) should be more than enough
- [Open Weather](https://openweathermap.org/api)

In the back end: 
- [OpenAI](https://openai.com/blog/openai-api)

**Did we miss any APIs??**
## Common Issues
When running code someone else has written, ensure you perform `npm install` commands to install any new dependencies they may have added.

If there are issues where old itinerary information is being displayed, or the app crashes with an index error, open local storage and clear all itinerary and chat data.

Ensure you are adding all API keys to the relevant `.env` files.
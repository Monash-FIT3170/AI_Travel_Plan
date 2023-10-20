# Running the Application

This section will outline how to run the application. 
It contains the steps for installing dependencies, adding environment variables, and running the application.

There are two ways to run it in the dev environment, and one to run it in the prod environment. 

The deployed app can be found [here](https://main.d2azdyrrhon0fz.amplifyapp.com/).
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

# How to run the App in Dev Environment (Method 2)
1. download docker or check if docker exist in the system by typing `docker -v`
2. run `docker-compose up` make sure to run this in the root project folder
3. Download docker extension on vs code.
4. Open Command Palette (Ctrl+Shift+P) and Click on attached to running container
5. Once finished, run `docker-compose down`

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
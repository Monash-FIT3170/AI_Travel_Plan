# Welcome
This repository contains the source code for the AI powered travel 
planner, **Get Packing Traveller**

Link: https://main.d2azdyrrhon0fz.amplifyapp.com/
# Contents
- [Required Tech](#required-tech)
- [How to Run the App in Dev Environment (Method 1)](#how-to-run-the-app-in-dev-environment-method-1)
  - [Installing Dependencies](#installing-dependencies)
  - [Adding Environment Variables](#adding-environment-variables)
  - [Running the Application (Dev Environment)](#running-the-application-dev-environment)
- [How to run the App in Dev Environment (Method 2)](#how-to-run-the-app-in-dev-environment-method-2)
- [Running the Application (Prod Environment)](#running-the-application-prod-environment)
- [How To Contribute](#how-to-contribute)
  - [Pull Request (PR) Strategy](#pull-request-pr-strategy)
- [Additional Notes](#additional-notes)
  - [Tech Stack](#tech-stack)
  - [APIs Used](#apis-used)
  - [Common Issues](#common-issues)
  - [GitHub Actions](#github-actions)
  - [Software Versions](#software-versions)
  - [License Information](#license-information)
# Required Tech
- A computer (Windows or Mac is fine)
- node.js installed on your machine
- an IDE or text editor (ideally vs code)
- [OPTIONAL] Docker
# How to Run the App in Dev Environment (Method 1)
This section will outline how to run the application. 
It contains the steps for installing dependencies, adding environment variables, and running the application.
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

# How to Contribute
<span style="background-color: #f8fa98">Add how to contribute</span>

## Pull Request (PR) Strategy




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

## GitHub Actions
Currently, GitHub actions is configured to run a deployment every time something is pushed to 
a branch, deployment involves running all tests defined within the `tests` file located in the
server folder. This is where you should write all your unit tests for the server side of the
application.

The tests are written in TypeScript with chai and mocha. Documentation for them can be found [here](https://dev.to/matteobruni/mocha-chai-with-typescript-37f).

### Future Development of GHA
For now, the deployment process is very bare-bones, and is simply written in order to run the unit tests
with every change to the repository and there are a lot of commented out sections.

#### Commented Sections
The commented section within the Build.yml file describe the optimal deployment process, where
the packaged files will be put in a docker image and be sent to GitHub Container Registry (ghcr)
in order for this to work, you will need to create a token within a GitHub account that has 
admin access to this repository, that token should have package privileges and will be used to
sign in to ghcr in order to push the docker image there. Documentation on how to create this token
can be found [here](https://nikiforovall.github.io/docker/2020/09/19/publish-package-to-ghcr.html#:~:text=To%20access%20GitHub%20container%20registry,settings%2Ftokens%2Fnew).

Creating this token also means you can uncomment the sections within the [docker-compose.yaml](docker-compose.yaml) file.

You will also be required to create an account with AWS and add your account number in to the 
labelled spots as well in order to set up the AWS deployment with Terraform.

#### AWS and Terraform
The AWS deployment should be set up once you have included the appropriate AWS account Id and
uncommented the sections within the [Build.yml](.github/workflows/build.yml) file. What this
will do, is deploy your docker image for both the server and client to their own ECS clusters
which will then host them and allow them to run properly. There are also cloudwatch logs included
so that you will be able to monitor these containers and any error logs they may be giving.

## Software Versions
### Front End Software
```
"@emotion/react": "^11.11.0"
"@emotion/styled": "^11.11.0"
"@mui/icons-material": "^5.11.16"
"@mui/lab": "^5.0.0-alpha.129"
"@mui/material": "^5.13.0"
"@mui/x-date-pickers": "^6.4.0"
"@react-pdf/renderer": "^3.1.12"
"@testing-library/jest-dom": "^5.16.5"
"@testing-library/react": "^13.4.0"
"@testing-library/user-event": "^13.5.0"
"@types/mapbox-gl": "^2.7.12"
"axios": "^1.4.0"
"date-fns": "^2.30.0"
"dayjs": "^1.11.7"
"dotenv": "^16.3.1"
"framer-motion": "^10.16.1"
"gl-matrix": "^3.4.3"
"html2pdf.js": "^0.10.1"
"jest": "^27.5.1"
"jspdf": "^2.5.1"
"mapbox-gl": "^2.15.0"
"react": "^18.2.0"
"react-bootstrap": "^2.7.4"
"react-dom": "^18.2.0"
"react-map-gl": "^7.1.3"
"react-router-dom": "^6.11.0"
"react-scripts": "^5.0.1"
"supertest": "^6.3.3"
"web-vitals": "^2.1.4"
```

### Back End Software
```
"chai": "^4.3.7"
"cors": "^2.8.5"
"dotenv": "^16.0.3"
"express": "^4.18.2"
"gl-matrix": "^3.4.3"
"mocha": "^10.2.0"
"nyc": "^15.1.0"
"openai": "^3.2.1"
"supertest": "^6.3.3"
"swagger-jsdoc": "^6.2.8"
"swagger-ui-express": "^4.6.3"
"ts-mockito": "^2.6.1"
```

## License Information
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
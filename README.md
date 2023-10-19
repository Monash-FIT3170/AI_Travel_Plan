# Welcome
This repository contains the source code for the AI powered travel 
planner, **Get Packing Traveller**

Link: https://main.d2azdyrrhon0fz.amplifyapp.com/
# Contents
- [Required Tech](#required-tech)
- [How to Run the App](#how-to-run-the-app)
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
# How to Run the App 

Check out [this document](other-readmes/RUNNING_APP.md) for an in depth guide on how to install dependencies, adding environment variables and running the application in the dev and prod environments. 

# How to Contribute
## Setting up your Devolpment Environment
### Clone Git Repository
Clone the git repository:`git clone https://github.com/Monash-FIT3170/AI_Travel_Plan`

### Setting up Environment Variables And Client and Server Dependencies
Check out [this document](other-readmes/RUNNING_APP.md) for an in depth guide on how to install dependencies, adding environment variables and running the application in the dev and prod environments. 

## Coding Standards and Best Practices
We use React Bootstrap for UI components.

(Recommended) Install the ES7+ React/Redux/React-Native snippets extension for VS Code to enhance your development workflow.

## Directory Structure and Where to Add New Files
React Components: Add new React components inside the src/components directory.

Server Routes: New server routes should be added inside the server/routes directory.

Features: Any new feature modules should be added inside the src/features directory.

## Contributing New Features or Changes
Always pull the latest changes from the main branch before starting your work: `git pull origin main`

Create a new branch for your feature or change: `git checkout -b feature/your-feature-name`

After completing your work, push your changes to the repository: `git push origin feature/your-feature-name`

Create a pull request (PR) from your branch to the main branch. Ensure to add relevant reviewers for your PR.

After your PR is reviewed and approved, it will be merged into the main branch.

## Troubleshooting Guide
Encountering issues while setting up or developing the project is not uncommon. Below are some common problems and their respective solutions to help you get past them quickly.

1. NPM Install Fails

Problem: If you encounter errors while running npm install.

Solution:

Ensure you have the correct version of Node.js and npm installed. You can check your version by running `node -v` and `npm -v`.

Delete the node_modules/ folder and package-lock.json file in both client and server directories, then run `npm install` again.

2. Docker Containers Not Starting

Problem: Docker containers fail to start when running `docker-compose up`.

Solution:

Ensure Docker is running. You can check if Docker is running by executing docker info.

Check the logs by running docker-compose logs to identify the specific issue.

Ensure all required environment variables and configurations are properly set.

3. API Keys Not Working

Problem: The application is not connecting to external services.

Solution:

Ensure the `.env` file is correctly placed in the server directory and has the right keys and values.

Restart the server after adding or modifying the `.env` file to ensure the changes take effect.

4. Changes Not Reflecting

Problem: Code changes are not reflecting in the application.

Solution:

Ensure the application is being recompiled and reloaded after making changes. In the case of Docker, rebuild the containers using `docker-compose up --build`.
Clear the browser cache or try another browser to ensure the changes are not being masked by cached data.

## Pull Request (PR) Strategy




# Additional Notes 
This section will outline our tech stack, APIs used, and some common troubleshooting. 
## Tech Stack 
- Front end components are created in the `src/components` folder and use [React jsx](https://legacy.reactjs.org/docs/introducing-jsx.html) syntax. 
	> Currently, we make use of [React Material UI](https://mui.com/material-ui/getting-started/) library for our components
 - Front End pages are stored in `src/pages` folder.
- Back end code is written in the `server` directory in the [TypeScript](https://www.typescriptlang.org/) language.
- Swagger documentation for backend routes uses OpenAPI syntax. See example [here](other-readmes/EXAMPLE_SWAGGER_DOC.md):

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
GitHub Actions is the (CI/CD) platform used to automate our build, test, and deployment pipeline. More information can be found [here](other-readmes/GITHUB_ACTIONS_INFO.md)

## Software Versions
Please visit [this page](other-readmes/SOFTWARE_VERSIONS.md) for a list of both front and backend dependencies and their versions allowing for a stable release of the application.

## License Information
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

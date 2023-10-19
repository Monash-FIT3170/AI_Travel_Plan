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
<span style="background-color: #f8fa98">Add how to contribute</span>

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
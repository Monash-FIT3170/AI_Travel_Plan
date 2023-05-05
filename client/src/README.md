If you are not sure how to use react, please look at some of the skeleton code
The skeleton code was inspired by the following repository: https://github.com/bradtraversy/mern-tutorial 

src/App.js: 
    A sort of parent component that all other components are within
    Also contains the router that allows pages to be switched

src/app
    in the repository above, the redux code was found here. not sure what else should be here but I thought I'd include it anyway

src/pages/ExamplePage.js
    Contains an example page for the application

src/components/exampleComponentWithCss
    Contains how a css styled component should be stored in our file heirarchy (i.e., create a folder for the component and its acompanying css)

src/components/examples 
    contains some example components used in the ExamplePage.js
    Also contains an example of how a get request (through express) could be used to get some info from the backend

src/features
    Should contain any functions that aren't necessarily component specific (i.e., local storage accessing/modifying)

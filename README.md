If you pulled for the first time and try to run the app, it will not work.
This is because you need to install some dependencies. 
When you install them, they will be installed into a folder called "node_modules" in both the client and server directories.

To install the required modules, do the following:
- Open a terminal window with ctrl + "`" key (backtick key is under your escape key)
- Enter "cd client" in the terminal. This will change the terminal directory to spike/client
- Enter "npm install" in the terminal. This will look at your dependencies in client/package.json and install everything required.
- Wait a while. After the /client/node_modules folder appears, you are ready to run your react app :)
- In the same terminal window, enter "cd ..". This will nagivate your directory out of client and return to the root directory, spike.
- Enter "cd server". This will navigate to spike/server directory.
- Enter "npm install". This will install all dependencies to run your server. Server is ready to run now :)

Great! you've installed everything
To run the application, you must:
open 2 separate terminal windows. (ctrl + `)
  
  - In one terminal, run the following commands
    - cd server
    - run npm run dev
    This will run the server.

  - In the other terminal, run the following commands
    - run cd client
    - run npm start
    This will open your react program in the browser.


Recommended but not required:
- Install ES7+ React/Redux/React-Native snippets
    This makes react development a little easier by providing some auto complete snippets.
    For example, rfce + tab will create a react functional component with export statement. Pretty cool!
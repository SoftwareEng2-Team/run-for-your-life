## How To Build Software from Original Source
- Developers can clone the GitHub repo if they desire to test different files, learn how the game works, or for other purposes. Our code is open source!
- Before cloning, insure you have Git installed: https://git-scm.com/downloads
- Navigate to your desired workspace using your desired terminal. Enter "git clone git@github.com:SoftwareEng2-Team/run-for-your-life.git" to clone the repository to your workplace.
  - This will clone all of the files to your local machine. You can then use 'ls' and 'cd' to navigate to the desired directory.
  - Visual Studio Code or similar IDEs can be used to navigate the local repository and to view and edit code.
- If the developer would like to host the game locally they have multiple ways they can do so. One way is to use node and npm to host the project locally: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
  - When running locally make sure to download the run_local folder in the gamedev directory.
  - npm start will run the game locally on port 3000. You can then access the project here: 'http://localhost:3000/'
  - NOTE: you must change the server.js file to run locally. This file is stored in the /gamedev/run_local directory, along with a README explaining the process.
  - WARNING: this server.js file is NOT connected to our database. When running locally, the game will not save progress/log you in correctly. Navigate to 'http://localhost:3000/map.html' to use the game with limited functionality.

## Assumption
- Using Visual Studio Code or some Integrated Development Environment that the developer is comfortable in.
- They need JavaScript, HTML, C++ and have some understanding of the Google Map API.
- Additionally, extensions on Visual Studio Code, such as 'Live Server' can also be used to host the webpages for the game locally. If desired, download the extensions, and press the "Go Live" button in the bottom right of the IDE. Follow the instructions to host the webpage.

## Issue Tracking
If a bug or problem appears while a developer is working on our software they should navigate to REPORT_BUG.md inside the USER_DOCUMENTATION folder. They should check the KNOWN_BUGS.md first to see if it is a known issue that has a solution.

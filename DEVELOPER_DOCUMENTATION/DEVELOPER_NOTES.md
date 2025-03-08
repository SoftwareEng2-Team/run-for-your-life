# Developer Notes

## Obtain Source Code
Any developer seeking to obtain the source code for the Run For Your Life game can do so via our GitHub repository (https://github.com/SoftwareEng2-Team/run-for-your-life/).
- To download the source code, developers can use the command 'git clone git@github.com:SoftwareEng2-Team/run-for-your-life.git' in their local terminal.
- Ensure you are currently in the desired directory before running the command (i.e., cd desired_directory).
- The game files are stored in the /gamedev directory.
- Older files are saved in the /defunct directory. These are kept for reference only.
- Most of the frontend and backend are stored in /gamedev/public_html. Here you will find the HTML / CSS files for the front end and some of the JS files for the back end.

## Directories
This repository includes several directories to better categorize and store resources associated with our game.
- /database: This includes all information about connecting to our database, which stores user credentials and location updates.
- /defunctfiles: includes older files we keep for reference.
- /DEVELOPER_DOCUMENTATION: this current directory. Stores any documentation that might be useful to any developers.
- /gamedev: where our game files are stored. This includes files for both the frontend and backend. 
  - /controllers: contains controller files for our database, including queries.
  - /public_html: mostly frontend code, contains some backend connection. Main page HTML,CSS, and JS files are stored here.
  - /routes: database routes for routing database calls to the backend. 
  - /run_local: a server.js file and README instructions for running the program locally
- /living-doc-versions: older versions of our living document for this project are stored here.
- /reports: our weekly report will developing this game is stored here.
- /USER_DOCUMENTATION: stores any documentation that might be useful to any users/players. 
- /versions: contains published versions of our game. For example, beta release, alpha release, version 1.2, etc. 
- Other files: other files, such as our current living document and README file, are stored in the main repository.

## How To Build Software
- Developers can clone the GitHub repo if they desire to test different files, learn how the game works, or for other purposes. Our code is open source!
- Before cloning, insure you have Git installed: https://git-scm.com/downloads
- Navigate to your desired workspace using your desired terminal. Enter "git clone git@github.com:SoftwareEng2-Team/run-for-your-life.git" to clone the repository to your workplace.
  - This will clone all of the files to your local machine. You can then use 'ls' and 'cd' to navigate to the desired directory.
  - Visual Studio Code or similar IDEs can be used to navigate the local repository and to view and edit code.
- If the developer would like to host the game locally they have multiple ways they can do so. One way is to use node and npm to host the project locally: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
  - npm start will run the game locally on port 3000. You can then access the project here: 'http://localhost:3000/'
  - NOTE: you must change the server.js file to run locally. This file is stored in the /gamedev/run_local directory, along with a README explaining the process.
  - WARNING: this server.js file is NOT connected to our database. When running locally, the game will not save progress/log you in correctly. Navigate to 'http://localhost:3000/map.html' to use the game with limited functionality.
- Additionally, extensions on Visual Studio Code, such as 'Live Server' can also be used to host the webpages for the game locally. If desired, download the extensions, and press the "Go Live" button in the bottom right of the IDE. Follow the instructions to host the webpage. 

## Where To Find Our Hosted Game
Otherwise, to access our application that is hosted and updated, access the link: https://run-for-your-life.onrender.com/. This will redirect you to our game's login page. 

## How To Test The Software
This application's backend is tested using Selenium and Google ChromeDriver. Install Selenium using 'npm install selenium-webdriver' and download ChromeDriver from the link 'https://developer.chrome.com/docs/chromedriver/downloads'. You can run existing test scripts files in JavaScript by invoking 'node <path to testscript>/testscript.js'. Any future tests should be kept in a testing directory. 

## How To Add New Tests
New tests can be added by creating a new script or cloning an existing script and adding to that. All testing should be done in an async() function such that you can await driver to open and load the frontend. 

## How To Build A Release Of The Software
- After building the software the developer should have a new version with an updated ID number that correlates to that new version.
- They must update the version numbers in the code, documentation, and configuration files.
- They should place the new version files into a separate folder inside our versions folder to help keep track of our progress.
- Some basic sanity checks the developer should perform are:
  - Launch test: Ensuring the software does not crash on launch.
  - Game playtest: Playing through key features of the game to make sure it performs basic functionality.
  - File checking: Checking assets within files to ensure everything is included and referenced correctly.
  - Performance test: Ensuring the game runs smoothly.
  - Error Logging: Checking logs for unexpected errors or warnings.
  - Cross-Platform Testing: Checking to see to make sure it can build on mobile device as well as computers.

## REPORT BUGS Implementation Walkthrough
### Included files and tools
- bugreportpage.js
- Google Spreadsheets
- Google's App Script

### Setup Steps
- Create a Google Spreadsheet and locate "Sheet1" at the bottom of the spreadsheet renaming it to "BugReport"
- Locate Columns A through H, filling in row 1 with: Bug Title, Description, Steps, Expected Behavior, Actual Behavior, Device Details, Error Logs, and Timestamp.
- Locate 'Extensions' at the top of the spreadsheet and click on Apps Script.
- Locating the Editor tab on the left, create a new file, select script, and rename it to "bugreport" It should now create a bugreport.gs file.
- On GitHub access the file inside DEVELOPER_DOCUMENTATION called bugreport.gs.
- Copy the bugreport.gs and paste it into the new Apps Script bugreport.gs file.
- On the newly created Spreadsheet locate the ID in the URL. It will look something like this "https://docs.google.com/spreadsheets/d/SPREADSHEET-ID/edit?gid=0#gid=0"
- Copy the SPREADSHEET-ID and locate your created bugreport.gs and find SpreadsheetApp.openById("UniqueSpreadsheetID"); and paste in SPREADSHEET-ID inside the function.
- Save the file and locate the blue 'Deploy' button in the top right. Select "New deployment" Congifure it as a Web App that executes as 'Me' and gives access to 'Anyone' and hit 'Deploy'.
- It will produce a Web app URL Link that needs to be copied. It will look something like "https://script.google.com/macros/s/SCRIPTID/exec".
- Now locate the bugreportpage.js inside run-for-your-life/gamedev/public_html/bugreportpage.js
- At the top of the file you will see const BUG_API_URL = "Unique Script URL";
- Paste in the copied script URL and save.
- Test out the bug report inside the web game under the profile page. Look into the console on the web and the spreadsheet to see if there was any success/changes.
- Double-check all permissions to ensure the pathway is not blocked.

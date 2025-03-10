# Run For Your Life!
## James Nichols, Brian Munger, Keona Abad, Shi-Ru Huang, Connor Sun, Calvin Chen, Evan Albert

### Abstract: 
Competitive running game that simulates territory acquisition via a completed running route. Players compete by claiming the most space on a shared real-world map each week. To claim space one must create and complete a running circuit of any length. Upon completion of said circuit, players are rewarded with all map space within that circuit being claimed as their territory regardless of whether it is already claimed. The map displays currently existing territories and all in-progress routes by players. A leaderboard will also display the current square miles each player has claimed for that week. All scores and territories are reset every week and the top player is given a flair for the following week.

### Goal: 
Our team goal is to have a working game that takes in user location to track their movement. The game mechanics are based on the game Paper.io and allow users to compete against each other each day claiming land.

### Current practice: 
Similar applications exist to motivate users to engage in physical activity while progressing in-game. For example, Pokemon Go utilizes the user's location to catch Pokemon, access Pokestops, and battle other trainers. We aim to develop a game that encourages users to participate in healthy movements such as running and walking by creating friendly competition. Other mobile applications exist, such as Strava and Nike Run Club, that allow users to record their runs. However, creating a community-based game will motivate users to compete by running. 

### Novelty: 
We will use JavaScript to code the program with a location-tracking API. This allows the service to receive live updates and allows other users to compete for land. While other apps offer interactive maps that users can interact with, our game will enable people to compete over the land of the map in a territory-claiming style similar to paper.io.

### Effects: 
New and improved “.io game” genre for runners but with required real-time physical activities such as routes to run to claim plots of land. It will create friendly competition for local runners to compete with each other in terms of speed and distance.

### Use Cases: 
New players open the app and are shown a login page. The player will need to create a username and password to link to an account. If the player enters a username that isn’t already in use, the player will be able to login to that account and begin playing the game. The new player will be able to compete with current players. The new player will not be able to play the game until they have successfully made an account.

Returning players open the app and are shown a login page. The player will need to login to their account using their email and password. If the player enters an incorrect email that player will be prompted to try again. Once the player gets their email and password correct, the player will be able to play the game and continue with the score that they left off. If the player cannot remember their login information, they’ll have to create a new account and start over.

A top player of the week opens the app. The top player will have to log in using their email and password to access their account. Once logged in they will be able to go to the leader board and see their total score for the week at the top. They will see their name now has a flair effect (gold, silver, bronze) around it to signify that they’re a top player (top 3). The player score will be reset at the end of the week each Sunday.

The player will be required on the login page to create an account or login. Once the player is in and navigate to the map, they will be asked to shared their location in order for the player to start a run. If the player clicks don't allow, then the user will be unable to start a run until they click allow for sharing their location.

Old player lost their login information and are unable to access their account. When a player visits the site they will be required to enter their email and password if they already have an account. If the account is unable to be accessed by the player then the player will have to make a new account with a new email, username, and password. The old player will lose the current territory and points that they own but they will be able to access their old account as soon as they remember their login information.

The player decides to stop playing our game. When a player decides to stop playing the game all they have to do is close the tab on their screen. Doing this option will stop the location tracking and end any paths that they are making. If the user wishes to join again later, then they just need to login to the game again and their location will be tracked again. 

If a player has an unstable connection. When a player is playing our game they must be connected to the site at all times so that their location can be properly displayed. If a player disconnects from the game server they will be kicked out and will need to login again to continue playing. Any paths that they were currently working on will be removed, but their score will be saved.

Location tracking that maps the path the player runs. Involve friendly competition by allowing players to go against other players. This includes fighting to claim the most amount of land. Leaderboard will show the top 3 runners and largest land owners currently.

### Stretch goals:
Security access for IP address.
Expand the game map outside of the Corvallis OSU campus (completed).
Monetize the game to make money.
Stop cheating (using a car/bike).
Add new weekly achievements.

### Non-functional Requirements:
Scalability: The app will be able to handle one to two concurrent players during its initial phase and will be able to handle more players long term.

Usability: The app will provide interactive and engaging experiences and will be tested with individuals to help identify better accessibility and ease of use.

Security and Privacy: The user will be able to view and manage their data. The app will share information regarding their location, letting the user know when their location is used during their gameplay session.

### External Requirements:
It can be expected that the app will encounter location errors, to combat this we will ensure that the location during gameplay is constantly updated and will let the user know when the internet connection is lost. 

We will include a public URL on our GitHub that will allow potential users to download the app easily and will have instructions on how to start and play the game.

Included on our GitHub we will have a clear walkthrough on the development of our game and our thought processes behind the app. 

Communicating with our team, we will address strengths and weaknesses in ourselves understanding where it will be best to put numbers.

### Technical approach: 
Planning to use JavaScript/HTML for the app layout and general display features. Plan to use JavaScript for location grabbing and more technical back-end features. May experiment with Flutter to aid in the development process. 

### Risks: 
##### GPS location tracking:
Likelihood: Low; Impact: High
Evidence: Based on our team members' previous experience no one has done the location tracking, so it might be a challenge for us since if it not working, then basically the whole game will crash down. Also, we have to think about the GPS signal issues, and permission restrictions. 
Steps to reduce risk: We are using the Google Geolocation API, which combines GPS, Wifi, cell tower data, and IP address to increase the accuracy of tracking, and also reduce the location tracking issue. The geolocation helps us to improve the issue of accuracy, real-time speed, and reliability. 
Detecting the problem: We're going to test by taking our device and moving it around on the OSU campus once we finish implementing it, to check if the location tracking is accurate and functions without lacking it. Also, player have to allow permission for tracking on their device. 
Mitigation plan: If the Geolocation API fails, then we will recheck all the implementations we have done on the location tracking. I don't think we are going to re-implement a new location tracking since Geolocation API is one of the most accurate and easy to implement.

##### The speed limit for players to prevent cheating: 
Likelihood: High; Impact: High 
Evidence: Not only do our games face this kind of issue, but there are games that players use VPN, and other GPS apps to control the speed. 
Steps to reduce risk: Implement a speed limit function that detects once the plyer's speed exceeds the fast-walk speed limit, or detects user jump from one location to another location. 
Detecting the problem: Do some automatic checks that ascertain the speed of movement against set physical benchmarks. 
Mitigation plan: Modify and improve the logic of speed detection according to the behavioral patterns observed by the player.

##### Real-time multiplayer interaction: 
Likelihood: Medium; Impact: High 
Evidence: The multiplayer synchronization issue happens a lot in different real-time games nowadays, something like lacking, desynchronization, can cause a major problem with how the player's in-game sensitivity. 
Steps to reduce risk: It can be solved by implementing server-side conflict or interactive solutions by dealing with claiming routes or territory. 
Detecting the problem: Keep track of two players who claim the same route at the same time, and see if the server-side deals with the problem. 
Mitigation plan: The server side should be able to detect which user comes first, and be able to handle it without occuring any error.

##### Database performance: 
Likelihood: Medium Impact: High Evidence: 
Since this is a game that needs player login and allows recording player's data, it is important to have a reliable database to store all player's information and game record.
Steps to reduce risk: It can be solved by using MongoDB, it can fast reads/writes, flexible schema, and automatic indexing to improve MongoDB performance. This allows for rapid updates to the leaderboard and easy claiming of routes. MongoDB also ensures smooth real-time gameplay through its caching and scalability features. 
Detecting the problem: It can be detected by implementing functions such as monitoring, logging, and query optimization. 
Mitigation plan: If the database is not working or crashes, having a replica as a backup will be the best option to support it.

##### Server performance: 
Likelihood: Medium; Impact: High 
Evidence: When a small amount of users becomes a huge scale of users the server might crash due to not being able to handle multiple player logos at the same time. 
Steps to reduce risk: We are using Oregon State University's engineering server as our server, which can be securand e, be able to handle multiple user scenarios. 
Detecting the problem: it would be great to monitor OSU server resource usage. 
Mitigation plan: If the server crashes down then the best way is to contact OSU IT support.

### Team members and roles/responsibilities:
James Nichols - Project Manager  
Brian Munger - Implement User Interface; Assist In Back End 
Keona Abad - Quality Assurance
Shi-Ru Huang - Programmer & Tester
Connor Sun - Gameplay Design and Tester
Calvin Chen - Tester
Evan Albert - Quality Assurance

### Team process:
We will be using Visual Studio code for the main part of our programming as all of our team members have experience using it in past projects. We have yet to discover other possible alternatives and ways we want to implement API location gathering.

##### James Nichols, Project Manager: 
As the project manager my main job will be ensuring that the team stays on track of deadlines and members know their tasks. Since each member has so much going on it’ll be important for me to be on top of things and able to divide up work so member feels too overwhelmed. I was assigned this role by the staff (professor) but I believe I will be able to excel at this role and help guide our team to a successful project.

##### Brian Munger, Implement User Interface:
Per my role of implementing the user interface for our game, it is my job to design an interface where the user can effectively navigate the app, see their progress, and perform other necessary actions. In doing this, I will communicate closely with Connor to bring his design to life. I intend to use Flutter to implement the user interface for our game. 

##### Keona Abad, Quality Assurance:
As the quality assurance role for our team, I need to ensure that the project meets all functional and quality requirements. I will have to design and then implement test plans, execute the tests, and then document the results, this way we can identify any issues early. Working closely with the whole team, I will make sure that our software is reliable, bug-free, and user-friendly.

##### Shi-Ru Huang, Programmer & Tester:
Being a programmer and tester, it is my duty to stay on track every single week, making sure that all the programs that I’ve done are implemented correctly, also as a tester, I will have to check whether the program matches the requirements and specifications. In the meantime, is it extremely important to stay in contact and be proactive with all my team members, make sure we all are on the same page.

##### Connor Sun, Game Design/Programmer:
A game designer/programmer creates and implements game-related features. The role is vital as our entire project centers around a gameplay loop that will attract and keep users engaged. I am justifiable in this role as I came up with the project idea, made several improvements to the initial design, and have prior experience designing games and balancing existing features.

##### Calvin Chen, Tester:
The role of a tester is to ensure the quality, reliability, and functionality of the software being developed. It will be my duty to test the product for bugs, usability issues, and compliance with requirements. I will also create test plans, write test cases, and document the results. This role is essential for our project because testing ensures that the final product meets user expectations and minimizes costly errors. 

##### Evan Albert, Quality Assurance:
Being the quality assurance means that I have the responsibility to ensure that the app development is on track and meets the desired outcomes throughout production. I will ensure that any bugs or possible structure flaws are identified early on and addressed accordingly.

### Test Plans and Bugs:
We plan to test the key features, including geolocation tracking, server responsiveness, and the accuracy of claimed territory, along with the number of points the users get.

### Documentation Plan:
The README file will contain an overview, installation steps, and usage instructions. A USER_GUIDE.md file will provide gameplay instructions and key features. For developers, inline documentation and an API.md file will outline endpoints. A TESTING.md file will document our test plans, and a CHANGELOG.md will track updates. By the end of our development, if need be we will add some more documents such as a CONTRIBUTING.md file for coding standards and the Git workflow we used. Our goal is to make clear documents for not just users, but developers, and administrators as well. 

### Geolocation Tracking Location Tracking:
##### Unit testing: Each function will be tested as development goes on. The test will include different features such as how accurate the location tracking API is, also how the marker appears on the map. By testing each function in isolation we can tell quickly what the problem may be and make corrections or workarounds.

##### System testing: Test how the location tracking connects between the point calculation functions and the mapping API. By comparing the results that the system gives to the expected results we can determine if everything is working smoothly. 

##### Usability testing: Since our product is a game that many will use, usability testing will be the most important. Since the geolocation is not able to be interacted with by the player it shouldn't be a major concern. However, since our product involves location tracking we will have to have playerss test to see if they can use our app to track people. 

###### Example test suites: 
1) Enter random locations to see if the location marker properly tracks them.
2) Enter random location sizes to see if the points are accurately returned and calculated.
3) Have random friends or people run our website to determine if the user can understand the layout and whether they can use the app to track other users' data.

##### Server Responsiveness:
Unit testing: Each function will be tested as development goes on. The test will include different features such as how the server runs depending on the amount of players are currently on, also quickly the site can update itself to display new data. Testing each feature in isolation allows for obvious bugs to be found and corrected. 

##### System testing: Test how the server handles taking in data from multiple sources, such as the location tracking and the user database. Since the app will be running 24 hours a day, the server will need to be able to handle all the features and accurately update the information provided by the players.

##### Usability testing: Since our product is a game that many will use usability testing will be the most important. The server will need to be able to respond to users at a near-instant rate. The server will also need to be tested with different amounts of players online. Since the responsiveness will most likely change depending on the amount of users.

###### Example test suites: 
1) Have only one or two users on the server and test responsiveness.
2) Have many users on the server, most likely from class, and determine if the server can handle that or if it will need to implement multiple servers.
3) Have users enter the server on different levels of connection and test responsiveness; mobile data, Wi-Fi, and low mobile data (1-2 bars). 

##### Territory Claimed and Points Scored:
Unit testing: Each function will be tested as development goes on. The test will include different features such as how accurate the location tracking API is with creating territories, and that the points are accurately calculated based on territory. By testing each feature in isolation it will reveal if we need to change weights for points or alter how territories are created.

##### System testing: Test how the location tracking connects between the point calculation functions and the mapping API. By comparing the results that the system gives to the expected results we can determine if everything is working smoothly. 

##### Usability testing: Since our product is a game that many will use usability testing will be the most important. The most significant feature to be tested will be how the territories are displayed. These will be a key feature for the users to determine how other users are doing and what their territory looks like. Another major feature that will need a lot of testing and adjusting is the points calculations. Since some areas will be more difficult to claim the points for it will need to be adjusted to reflect that. 

##### Example test suites: 
1) Create random territories and ensure the points properly reflect the size.
2) Enter random weights for different map areas and make sure they are properly reflected in the point calculations.
3) Have multiple users at once claim territory to make sure the functions can handle multiple inputs at once.

## Test-Automation Infrastructure

### Tools Used: Jest
For our automated testing, we use Jest as the primary test framework for unit, validation, integration, and system tests. We selected Jest because it offers:

- Modern JavaScript Support: Works seamlessly with ES modules (ESM), which aligns with our project's structure.
- Fast Execution & Parallel Testing: Jest optimizes test execution by running tests in parallel, reducing total test time.
- Built-in Code Coverage Reporting: Allows us to track coverage and ensure we maintain 80%+ code coverage across all components.
- Strong Community & Ecosystem: Jest is one of the most widely adopted testing frameworks, providing robust documentation and plugins.
- CI/CD Compatibility: Jest integrates natively with GitHub Actions, ensuring that our tests run efficiently in our CI pipeline.

We also use **Puppeteer** for system tests, allowing us to simulate real user interactions with our web application in a controlled browser environment.

## Continuous Integration (CI)

### Service Used: GitHub Actions
Our project integrates with GitHub Actions, a powerful CI/CD tool that enables automated testing and deployment. The workflow file resides in `.github/workflows/ci.yml`.

### Why We Chose GitHub Actions

Features and Benefits

Seamless Integration: Built into GitHub, eliminating the need for external tools.
Matrix Builds: Supports testing across multiple Node.js versions and environments.
Cost: Free for public repositories and offers generous free-tier minutes for private projects.
Community Support: Strong documentation, examples, and troubleshooting support.

By using GitHub Actions, we ensure our tests are executed efficiently and consistently on every push, pull request, or merge.

## Pros and Cons Matrix for CI Services Considered

We evaluated multiple CI/CD services before selecting GitHub Actions. Below is a comparative analysis of the services considered:

CI Service Pros and Cons

GitHub Actions: 
Pros: Built into GitHub, no extra setup needed, Free for public repositories, Supports parallel/matrix builds.
Cons: Workflows can become complex and require careful management.

Travis CI: 
Pros: Simple configuration, Well-documented and widely adopted.
Cons: Limited free-tier minutes, Slower build times compared to competitors.

CircleCI: 
Pros: Fast and scalable, Allows highly customizable environments.
Cons: More complex pricing model Not as tightly integrated with GitHub as GitHub Actions.

Final Decision: We chose GitHub Actions because it provided the best balance of ease of use, integration, and cost-effectiveness for our project.

## Tests Executed in a CI Build

To ensure code quality and stability, our CI pipeline runs the following tests automatically:

Unit Tests – Tests isolated functions and components. (`__tests__/unit/`)  
Validation Tests – Checks from validation logic. (`__tests__/validation/`)  
Integration Tests – Verifies inter-module interactions. (`__tests__/integration/`)  
System Tests – Performs end-to-end testing using Puppeteer. (`__tests__/system/`)  

### Examples of Tests in Our Codebase

Profile to Bug Report Navigation Test (`integration.profile_bugreport.test.js`)  
Bug Report System Test (`system.bugreport.test.js`)  
Form Submission Test for Bug Reports (`bugreportpage.unit.test.js`)  
Validation Handling Test (`bugreportpage.validation.test.js`)  
Create Account Form Test (`createaccount.test.js`)  

These tests ensure our system remains robust and bug-free across all updates.

## Development Actions That Trigger a CI Build

Our CI pipeline is automatically triggered by the following actions:

Pushes to Any Branch:  
- Any commit pushed to a branch triggers a CI build.  
- Ensures that all committed changes are validated.

Pull Requests (PRs):  
- Opening or updating a PR to `main` triggers a full CI test suite run.  
- Helps detect breaking changes before merging.

Merges to `main`: 
- A final CI build and test run ensure the stability of the main branch before deployment.

These triggers are defined in `ci.yml`, ensuring every change undergoes automated validation.


## Enhancements & Best Practices

To further improve our CI/CD strategy, we implement:

Test Coverage Goals – Target 80%+ code coverage to maintain quality.  
Parallel Test Execution – Speed up CI builds using matrix testing across multiple Node.js versions.  
Error Handling – If a test fails, the CI system immediately flags the issue and prevents faulty code from merging.  

## Conclusion

Our test automation and CI/CD pipeline ensure that every change is validated, code remains stable, and regressions are caught early. By leveraging Jest for testing and GitHub Actions for CI, we maintain an efficient, cost-effective, and scalable testing environment.


### Timeline with milestones:
Week 3: Project Planning.
- Finalize project idea and scope, and present our project to the class.
- Develop the living document.
- Establish a GitHub repository and Trello board for task tracking.
- Assign initial roles and responsibilities.
- Begin researching Google Maps API and real-time updates.

Week 4: Technical planning and initial back-end setup.
- Figure out exactly what front-end and back-end services we will be using (like HTML and JavaScript), making sure they fit our project idea. 
- Communicate with the team to figure out member qualities and comfort levels. Allocate members that can work on front-end and back-end frameworks.
- Assign tasks depending on team member’s roles on the Trello board. Meet to ensure development can begin as soon as possible and all members understand their tasks.
              	
Week 5: Start development of the app. 
- Start implementing the user interface for the different web pages of our application. Start with designing the main page and footer for all pages. 
- Ensure Google Geolocation API works for our needs.
- Research database options and create a schema for what our database will look like.
- Prep for the mid-term presentation, create a presentation that includes what we have accomplished so far, and what will accomplish in the future. 

Week 6: Mid-term presentation. Share what we have so far, see results, and address any concerns.
- Continue working towards implementing the user interface. Focus on the leaderboard and profile pages (user authentication) this week.
- Choose a database service and start integrating it into our application. It will need to store player credentials, as well as their location data to show other users. 
- Figure out how to host our application with both front-end and back-end services covered.

Week 7: Full game logic and user interface navigation.
- Work to finish implementing the core features of our game. 
- Implement route validation (ensure closed-loop formations before territory claim).
- Implement cheating detection (speed validation and GPS consistency).
- Optimize real-time synchronization for multiple players through our SQL database.
- Begin testing with multiple simulated players.
- Create a general user interface, allowing them to easily navigate through the game. 

Week 8: UI refinement and mobile optimization.
- Improve UI/UX for the game map, leaderboard, and profile.
- Optimize mobile responsiveness (scaling maps for different screen sizes).
- Test GPS accuracy under different conditions (Wi-Fi, cellular, bad reception areas).
- Run beta testing with multiple team members to collect UI/UX feedback.

Week 9: Final feature testing and stress testing.
- Finalize and conduct playtesting to ensure features/game logic works to our expectations.
- Conduct stress testing with multiple simulated users (ensure real-time performance scales).
- Debug and finalize cut-off and land takeover mechanics.
- Identify edge cases for cheating prevention and refine algorithms.
- Implement final security measures (preventing unauthorized API access, improving database indexing).

Week 10: Final testing and project presentation.
- Prepare final project report and documentation (README, API docs, and contribution guide).
- Record gameplay demonstration video.
- Conduct final presentation rehearsals.

### Coding guideline: 

With our project, we are implementing our design to be accessible through a webpage. This way, it can be utilized on any device without installation. Additionally, all of the group members have experience with website development, making it a smart choice. We are using HTML to structure our web pages, CSS to style them, and JavaScript to handle the functionality of our project.

For HTML, we will always declare the document type at the beginning (for example, <!DOCTYPE html>). We will use lowercase element names, as this is the industry standard, and we will open and close all elements on different lines.
For CSS, we will find a style for the webpage that we all agree upon. If someone disagrees with a stylistic choice, we will find an alternative that we can agree on. Comments should be used in CSS documents to show what different style blocks affect.
Finally, for JavsScript, we will declare variables that have meaningful names that give us insight into what they store. Comments will be used to explain what different code blocks do, making it easy for other group members to understand. Spacing around operators and general indentation of code will be implemented to increase readability.

For all languages, using caution to periodically enter a new line if the current line gets too long will increase readability. Using 'camel case' for naming variables will keep the code consistent and easy to read.

### Software Architecture:
#### Client-Server Architecture Pattern
The two major entities for our Software architecture would be; the players and the database server. 
  - The player's create accounts that link to the server and as they do actions in the game those values are updated and returned to the database.
  - The database then responds back with the results of the player's action.
    ex: if a player completes a circuit the area that they captured would be sent to the database, then the server would respond by sending other players the visual showing what areas the
        player has captured.
    
#### Major Software Components and Their Functionality:
1. Frontend
    - The front end will be developed using HTML, CSS, and JavaScript and hosted using render.com.
    - It will be responsible for rendering the user interface, handling user interactions, and sending/receiving data from the backend.
2. Backend
    - The backend will be implemented using render.com. This allows for easy connection to our database and is free.
    - It will handle game logic, player authentication, and interactions with the database.
    - The backend will also serve API endpoints for data retrieval and updates.
3. Database
    - The system will use MySQL (Relational Database) for storing player data, including game statistics and leaderboard rankings.
    - The database will follow a structured relational schema with foreign key relationships.
4. Communication Between Frontend and Backend
    - The primary method of communication will be HTTP requests (REST API) for data retrieval and updates.
    - WebSockets may be used as an alternative for real-time updates, depending on feasibility and server constraints.

#### Interfaces Between Components:
1. Frontend to Backend
  - The front end will communicate with the backend using RESTful API requests (HTTP GET/POST/PUT/DELETE).
    - If WebSockets are implemented, the front end will establish a persistent connection for real-time updates.
2. Backend to Database
    - The backend will interact with the MySQL database using SQL queries or an ORM like Sequelize.
    - Queries will utilize joins and indexes for optimized performance.
3. Third-Party API Integration
    - The Google GeoLocation API will be used to retrieve and process location-based data.

#### Data Storage and Organization:
MySQL Schema (Relational Database)
Main Entities:
- Users Table
    - user_id: Primary key (serial)
    - username: Unique username
    - email: User email
    - total_distance: Total distance covered by the user
    - weekly_flair: Boolean indicating special achievements
- Runs Table
    - run_id: Primary key (serial)
    - user_id: Foreign key linking to Users
    - start_time: Timestamp marking the start of a run
    - end_time: Timestamp marking the end of a run
    - distance: Total distance covered in the run
    - route_coords: JSON or TEXT field storing route coordinates
- Territories Table
    - territory_id: Primary key (serial)
    - user_id: Foreign key linking to Users
    - run_id: Foreign key linking to Runs
    - polygon_coords: JSON or TEXT field representing the claimed area
    - claimed_at: Timestamp of territory acquisition
- Leaderboards Table
    - leaderboard_id: Primary key (serial)
    - user_id: Foreign key linking to Users
    - week_start: Start date of leaderboard cycle
    - total_distance: Distance recorded for the leaderboard
- Assumptions Underpinning the Architecture
    - Render.com will allow us to host both our front end and back end successfully. 
    - HTTP requests will be sufficient for most operations, but WebSockets may be needed for real-time features.
    - If real-time performance is required, the system can switch to WebSockets for efficiency.

#### Alternative Architectural Decisions:
Frontend Hosting
- Chosen Approach: Host the front end using render.com.
    - Pros: Free hosting, easy access, and no extra infrastructure needed.
    - Cons: Potential restrictions on what can be deployed.
- Alternative: Use a third-party hosting service like Render.com or AWS EC2.
    - Pros: More flexibility and fewer restrictions.
    - Cons: This may introduce additional costs and configuration overhead.
Backend Technology
- Chosen Approach: Use Node.js with MySQL for structured data storage.
    - Pros: Supports real-time interactions, efficient with relational data.
    - Cons: Requires structured queries and schema migrations.
- Alternative: Use PHP with MySQL for backend services.
    - Pros: More widely supported on school servers, good for fetching data.
    - Cons: Not ideal for real-time features, slower when handling large-scale data.
Data Communication
- Chosen Approach: Use REST API with HTTP requests for most interactions.
    - Pros: Simple, well-supported, and familiar to the team.
    - Cons: Slower than WebSockets for real-time updates.
- Alternative: Use WebSockets for real-time data transmission.
    - Pros: Faster and more efficient for continuous data updates.
    - Cons: More complex to implement, and may not be supported on the school's server.

#### Software Design: 
##### Front-End
- UI Package: The map view displays the map and user movement. The leaderboard view renders the current leaderboard. The profile view displays user-specific metrics and information.
- Networking package: Manages REST API requests and handles fetching user locations and game data.
- Game Logic package: Handles displaying claimed land and processes user GPS movement.

##### Back-End
- API Handlers: Manages core game logic such as updating position and claim territory.
- Game Logic: Computes areas enclosed by a completed run.
- Database Handlers: Handles user data and stores running route data.

#####Database
- The backbone for storing and managing game data.
- The schema includes key tables such as users, which store gameplay statistics, routes, which logs completed running circuits and territories, which track claimed land areas for each user.

##### Location Tracking API
- Uses Google Maps API to fetch and process real-time location data.
- Ensures routes are valid before allowing a claim.

### Coding guideline
With our project, we are implementing our design to be accessible through a webpage. This way, it can be utilized on any device without installation. Additionally, all of the group members have experience with website development, making it a smart choice. We are using HTML to structure our web pages, CSS to style them, and JavaScript to handle the functionality of our project. 

- For HTML, we will always declare the document type at the beginning (for example, <!DOCTYPE html>). We will use lowercase element names, as this is the industry standard, and we will open and close all elements on different lines.
- For CSS, we will find a style for the webpage that we all agree upon. If someone disagrees with a stylistic choice, we will find an alternative that we can agree on. Comments should be used in CSS documents to show what different style blocks affect.
- Finally, for JavsScript, we will declare variables that have meaningful names that give us insight into what they store. Comments will be used to explain what different code blocks do, making it easy for other group members to understand. Spacing around operators and general indentation of code will be implemented to increase readability.

For all languages, using caution to periodically enter a new line if the current line gets too long will increase readability. Using underscores for naming variables will keep the code consistent and easy to read. 

### Communication tools and rules:
Discord: https://discord.gg/fjCdaebj, respond within a day. 
Text Message (Group Chat), respond within half a day (in reasonable hours).
GitHub: Sync as often as possible to keep work up to date; contribute to weekly reports as necessary.

### API Keys and Additional Links

Google Geolocation API Key: AIzaSyBYPZyFFX2wm_TAr1haKfFJGMlDbHkF8TQ
Database URL: postgresql://run_for_your_life_user:8fFWEwEBpMPdijfG10sYt8p0UfMsT9Yo@dpg-cusf9fl6l47c7386ejjg-a.oregon-postgres.render.com/run_for_your_life

Trello board: https://trello.com/b/OsvSTA7E/pt1-run-for-your-life
Figma link: https://www.figma.com/design/SG1ROIIvWYSpmKm1g8WVZm/Untitled?node-id=0-1&t=ExN0nOSrw4YITC6Y-1
Project link: https://run-for-your-life.onrender.com/

#### Git Repo Link: 
Organization: https://github.com/SoftwareEng2-Team 
Repository: https://github.com/SoftwareEng2-Team/runio 

# Welcome to Run For Your Life!
## Developed by James Nichols, Brian Munger, Keona Abad, Shi-Ru Huang, Connor Sun, Calvin Chen, Evan Albert

### Access Our Game Here!
Game link: https://run-for-your-life.onrender.com/ 
- For information regarding running our game locally, navigate to /DEVELOPER_DOCUMENTATION.

### About Our Game
Run For Your Life is a competitive running game that simulates territory acquisition via a completed running route. Players compete by claiming the most space on a shared real-world map weekly. To claim space one must create and complete a running circuit of any length. Upon completion of said circuit, players are rewarded with all map space within that circuit being claimed as their territory regardless of whether it is already claimed. The map displays currently existing territories and all in-progress routes by players. A leaderboard will also display the current square miles each player has claimed for that week. All scores and territories are reset weekly, and the top player is given a flair for the following week.

*Using cellular data can make location tracking more accurate! Data rates may apply.*

#### How To Navigate Our Game
##### Leaderboard Page
Located on the left, this button takes you to the leaderboard page where you'll see weekly rankings, top players, and key statistics. Use this page to compare your performance with others and see where you stand.
##### Map Page
Found in the center, this button directs you to the map page. Here you can start your run, explore new areas, and plan your route. This is your primary interface for navigating the game world and claiming territory.
##### Profile Page
The rightmost button leads to your profile page. This page displays your personal stats, achievements, and current ranking. It serves as your personal hub to track progress and review your performance.

### How To Play
- Begin by exploring the map to familiarize yourself with the environment.
- Start your run from the map page, as you run, you'll claim territory.
- Your progress, including distance ran and territory claimed, will be recorded on your profile.
- Check the leaderboard frequently to see how you compare with other players and to set new goals.

### Format Of The Repo
- /database: includes all information about connecting to our database. The database is used for storing user credentials and location updates.
- /defunctfiles: files no longer used but kept for reference
- /DEVELOPER_DOCUMENTATION: stores any documentation that might be useful to any developers.
- /USER_DOCUMENTATION: stores any documentation that might be useful to any users/players. 
- /gamedev: where the source code for our game is stored.
  - /controllers: contains controller files for our database, including queries.
  - /public_html: mostly frontend code, contains some backend connection. Main page HTML, CSS, and JS files are stored here.
  - /routes: database routes for routing database calls to the backend.
  - /run_local: includes server.js file and README for running the game locally. 
- /living-doc-versions: older versions of our living document for this project are stored here.
- /reports: our weekly report on developing this game is stored here.
- /versions: includes different release versions of our game. 
- Other files: other files, such as our current living document and README file, are stored in the main repository.

### Where To Find Additional Information And Documentation
Additional information and documentation regarding our game, such as how to play and how to host the application locally, can be found in the documentation directories. 

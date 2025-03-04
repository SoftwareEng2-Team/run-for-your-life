# Welcome to Run For Your Life!
## Developed by James Nichols, Brian Munger, Keona Abad, Shi-Ru Huang, Connor Sun, Calvin Chen, Evan Albert

### About Our Game
Run For Your Life is a competitive running game that simulates territory acquisition via a completed running route. Players compete by claiming the most space on a shared real-world map weekly. To claim space one must create and complete a running circuit of any length. Upon completion of said circuit, players are rewarded with all map space within that circuit being claimed as their territory regardless of whether it is already claimed. The map displays currently existing territories and all in-progress routes by players. A leaderboard will also display the current square miles each player has claimed for that week. All scores and territories are reset weekly, and the top player is given a flair for the following week.

*Using cellular data can make location tracking more accurate! Data rates may apply.*

### Access Our Game Here!
Game link: https://run-for-your-life.onrender.com/ 
- For information regarding running our game locally, navigate to /DEVELOPER_DOCUMENTATION

### Format Of The Repo
- /database: includes all information about connecting to our database. The database is used for storing user credentials and location updates.
- /defunctfiles: files no longer used but kept for reference
- /DEVELOPER_DOCUMENTATION: stores any documentation that might be useful to any developers.
- /gamedev: where the source code for our game is stored.
  - /controllers: contains controller files for our database, including queries.
  - /public_html: mostly frontend code, contains some backend connection. Main page HTML, CSS, and JS files are stored here.
  - /routes: database routes for routing database calls to the backend.
  - /run_local: includes server.js file and README for running the game locally. 
- /living-doc-versions: older versions of our living document for this project are stored here.
- /reports: our weekly report on developing this game is stored here.
- /USER_DOCUMENTATION: stores any documentation that might be useful to any users/players. 
- /versions: includes different release versions of our game. 
- Other files: other files, such as our current living document and README file, are stored in the main repository.

### Where To Find Additional Information And Documentation
Additional information and documentation regarding our game, such as how to play and how to host the application locally, can be found in the documentation directories. 

#### Trello
Trello Board: https://trello.com/b/OsvSTA7E/pt1-run-for-your-life
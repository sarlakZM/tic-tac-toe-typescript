## Tic Tac Toe Game

This project was generated based on Typescript.


## Game rules and Process:
Tic-tac-toe​ ​is a game for two players, ​X and ​O, who take turns marking the spaces in a n×n grid. The player who succeeds in placing n of their marks in a horizontal, vertical, or diagonal row wins the game. X goes first. 

**First, let’s break down the user interface:**
- Title
- Daynamic grid 3×3 4×4 ... 
	- Using Async/Await for loading rapidly
    - The grid should be clickable
    - The grid cells should have the correct player sign displayed an Information display   
- Should display a message informing the current player it’s their turn 
  - Should show us who won the game
- Restart button
    - Will restart the entire game	
- Enter the number ( Size Grid) input and click on restart button to create new game
	
**Next, let’s break down the game flow for a cell click:**
- Needs to track any clicks that happen on our cells
- Needs to check if a valid turn has been made !!!!!!
    - Needs to make sure nothing happens if an already played cell has been clicked
- We should update our game state
- We should validate the game state
  - Check if a player has won
	

## For running the project

- npm start (default port 4000) => 127.0.0.1:4000
- npm run build
- npm lint
- npm lint-and-fix
- npm prettier-format
- npm test


Note : Coming soon => Improved games with a large number (above 40 * 40) without crashing the browser

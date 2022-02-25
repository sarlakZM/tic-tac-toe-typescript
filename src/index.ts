import { TicTacToe } from './ticTacToe'

// Create Dynamic Game based on Size of grid
const ticTacToe = new TicTacToe();

const loadGame = () => {
  //Get the grid size from input
  //Default value size to 3 
  ticTacToe.startGame();
}

//Call after loading the page
loadGame();

//Call after clicking on buttion restart
ticTacToe.getElement(ticTacToe.game_restart_button_class).onclick =async () => {

  const sizeGirdKeyboard = (<HTMLInputElement>document.getElementById(ticTacToe.sizeGrid_input_id));

  ticTacToe.getElement(ticTacToe.game_board_class, {style: 'display: none'});
  ticTacToe.getElement(ticTacToe.loader_class, {style: 'display: block'});
  
  ticTacToe.clearMessage(ticTacToe.game_status_class);

  ticTacToe.sizeGird =  sizeGirdKeyboard && Number(sizeGirdKeyboard.value)> 0 ? Number(sizeGirdKeyboard.value) : 3 ;
  
  setTimeout( () => ticTacToe.resetBoard(), 1000);
};


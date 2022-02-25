
import { IPlayer, IGameBoard } from './interfaces'


export class TicTacToe implements IGameBoard{
  
  /**
   * board - nxn multi-dimensional array of empty strings
   * players - Object representing the players
   * currentPlayer - Current player, initialized to x
   * lockedGame -  The player has wined
   * winningConditions - All conditions for winning any grid size
   */
  board: Array<string>
  players: IPlayer
  currentPlayer: string
  lockedGame : boolean
  sizeGird: number
  winningConditions: Array<Array<number>>
  winnerPlayer: string

  // DOM specification : classes of DOM elements
  winner_class= 'winner'
  loser_class = 'loser'
  cheked_class = 'cheked'
  game_status_class = '.game-status'
  game_board_class = '.game-board ul'
  loader_class = '.loader'
  game_restart_button_class = '.game-restart'
  sizeGrid_input_id = 'sizeGrid'
  
  constructor(sizeGird = 3){
    this.sizeGird = sizeGird;
    this.board = this.createDefaultValuesBoard();
    this.players = { x: 'X', o: 'O' }
    this.currentPlayer = this.players.x
    this.lockedGame = false;
    this.winningConditions =  this.winConditions();
    this.winnerPlayer = ''  
  }


  startGame = async () => {
     this.waitLoadingGameBoard();
     await this.bindHandler(this.clickCell)
  }


  waitLoadingGameBoard = async () => {
		const result = await this.renderGameBoard(); 
		if(result){   
      this.getElement(this.game_board_class, {style:`grid-template-columns: repeat(${this.sizeGird}, auto)`});
      this.getElement(this.loader_class, {style: 'display: none'});
		}
	}


  /**
   * Create the game board view ( nxn multi-dimensional array of (empty) strings ) and render it to the DOM
  */
  renderGameBoard = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      const gameBoardDoument = this.getElement(this.game_board_class);
      if(gameBoardDoument){
        gameBoardDoument.innerHTML = '';
        this.board.forEach((player: string, index) => {
          // gameBoardDoument.innerHTML  += `<div data-cell-index="${index}" class="cell">${player} </div>`;
          gameBoardDoument.innerHTML  += `<li data-cell-index="${index}" class="cell">${player} </li>`;
        });
        resolve(true);
      }else{
        resolve(false);
      }
    
    });
  
  }

   
  /**
   * Click a cell in the game board and determine if its a win, a lose, or
   * the game continues. Game over or switch player.
   * @param {number} indexCell
   */
  clickCell= (indexCell: number): void => {
    const canContinue = this.board[indexCell] === ''
    if (!this.lockedGame && canContinue && !this.isBoradFilled()) {
      this.updateBoard(indexCell);
      
      this.checkWinPlayer();    
      this.turnPlayer();

    }
    this.printFinalMessage();
  }


  /**
 * Bind document click to the game if clicked element is a cell
 * @param {requestCallback} clickHandler
 */
  bindHandler = async (clickHandler: ( indexCell:number ) => void): Promise<boolean> =>{
    return new Promise((resolve) => {
      [...document.querySelectorAll('.cell')].forEach(function(item) {
        item.addEventListener('click', (event: Event) => {
            event.preventDefault();event.stopPropagation()
            const clicked = <HTMLElement>event.target
            const cellIndex = clicked.getAttribute('data-cell-index')        
            clickHandler(Number(cellIndex))
        });
      });
      resolve(true)
    });

  }


   /**
   * Update the board by appending a player token to a cell
   * @param {number} indexCell
   */
  updateBoard = (indexCell: number): void => {
    this.board[indexCell] = this.currentPlayer;
    this.getElement(`[data-cell-index="${indexCell}"]`, 
                    {classList: this.cheked_class, innerHTML:  this.currentPlayer});

  }
 

  /**
   * Check for getting win player 
   * Change style of screen ( one condition => winner ) based on win conditions 
   */
  checkWinPlayer = (): boolean => {
    for (let i = 0; i < this.winningConditions.length ; i++) {
      const condition: Array<number> = this.winningConditions[i];
      const getValuesbyAnyCondittion: Array<string>= [];
      for(let j=0; j < this.sizeGird; j++){
        if (condition != undefined && this.board[condition[j]] != ""){
          getValuesbyAnyCondittion.push(this.board[condition[j]]);
        }
      }
      if(  getValuesbyAnyCondittion.length == this.sizeGird && 
            getValuesbyAnyCondittion.every(item => item && item === getValuesbyAnyCondittion[0])){         
        for(let j=0; j < condition.length; j++){
            this.getElement(`[data-cell-index="${condition[j]}"]`, {classList: this.winner_class});
        }
        this.winnerPlayer =  getValuesbyAnyCondittion[0];
        this.lockedGame = true;
        return true;
      }
    }
    return false
  }


  resetBoard = (): void => {
    this.board = this.createDefaultValuesBoard();
    this.currentPlayer = this.players.x
    this.lockedGame = false;
    this.winningConditions =  this.winConditions();
    this.winnerPlayer = ''  
    this.startGame(); 
  }


  turnPlayer = (): void => {
    this.currentPlayer = this.currentPlayer === this.players.x ? this.players.o : this.players.x
    this.getElement(this.game_status_class, {innerHTML:`It's ${this.currentPlayer}'s turn`});
  }


  /**
  * Get the win conditions based on Grid's size
  * Fill win conditions by index
  */
  winConditions =  (): Array<Array<number>> => {
    const winningConditions =[]
    const basedDiagonal = []
    const reversedDiagonal = []

    for(let row = 0; row < this.sizeGird; row++){
      const selectedHorizontal = []
      const selectedVertical = []
      for (let col = 0; col < this.sizeGird; col++) {
        if (row === col) {
          basedDiagonal.push((row + col) + (this.sizeGird-1) * row)
        }
        if (row + col === this.sizeGird -1 ) {
          reversedDiagonal.push((row + col) + (row * this.sizeGird) - row)
        }
        selectedHorizontal.push(col + row * this.sizeGird)
        selectedVertical.push(row + col * this.sizeGird)
      }
      winningConditions.push(selectedHorizontal)
      winningConditions.push(selectedVertical)
    }   

    winningConditions.push(basedDiagonal)
    winningConditions.push(reversedDiagonal)
    return winningConditions;
  }

  calculateCountWinConditionbySizeGrid = (sizeGird: number): number => sizeGird * 2 + 2;

  /**
  * All board cells have been filled by players. 
  */
  isBoradFilled = (): boolean => !this.board.includes("");


  /**
   * Create a new empty board
   * @return { Array<string> } nxn multi-dimensional array of empty strings
   */
  createDefaultValuesBoard = (): Array<string> => [...Array(this.sizeGird * this.sizeGird)].map((_) =>"");
  
  
  /**
   * Retrieve an existing element in the DOM
   * @param {string} selector
   * @param {string} propertyObject
   * @return {HTMLElement}
   */
  getElement = (selector: string, propertyObject?: any): HTMLElement => {
    const element = <HTMLElement>document.querySelector(selector);
    if (propertyObject) {
      for (const property in propertyObject) {
        if( property == 'innerHTML'){
          element.innerHTML = propertyObject[property];
        }else if ( property == 'classList'){
          element.classList.add(propertyObject[property])
        } else{
          element.setAttribute(property, propertyObject[property]);
        }
      }     
    }
    return element
  }
  

  /**
   * Retrieve all elements by selector from the DOM
   * @param {string} selector
   * @return {NodeList}
   */
  getAllElements = (selector: string) => document.querySelectorAll(selector);
  
  
  /**
   * Clear message and its classes from the screen
   * @param {string} selector
   * @return {void}
   */
  clearMessage = (selector: string): void => {
    this.getElement(selector, {innerHTML: ''});
    this.getElement(this.game_status_class).classList.remove(this.winner_class);
    this.getElement(this.game_status_class).classList.remove(this.loser_class);
  }

  
  /**
 * Print the win, lose, or finished message
 */
  printFinalMessage = (): void => {
    if(this.winnerPlayer != "" && this.winnerPlayer != undefined){
        this.getElement(this.game_status_class, {classList: this.winner_class, innerHTML:`Player ${this.winnerPlayer} has won!`});

      }else{
        if (this.lockedGame || this.isBoradFilled()){
          this.getElement(this.game_status_class, {classList:this.loser_class, innerHTML:`The game is Over, nobody has won!`});
          this.getAllElements(`[data-cell-index]`).forEach(el => el.classList.add(this.loser_class));
        } 
      }
  }
  
}


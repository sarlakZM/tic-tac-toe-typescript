import { TicTacToe } from '../src/ticTacToe'

describe("TicTacToe Game", () => {
    let ticTacToe: TicTacToe;

    beforeEach(() => {
         ticTacToe = new TicTacToe();

         //To simulates a DOM environment
         document.body.innerHTML = `
              <section>
              <div class="box">
                <button class="game-restart" onclick="restartGame()">Restart Game</button>
                <input type="number" id="sizeGrid" name="sizeGrid"
                    min="2" max="15" placeholder="Size Grid = 3" >
              </div>
              <h2 class="game-status"></h2>
              <div class="box2 game-board"><ul></ul></div>
                  
              <div class="loader">
                <div class="loader-wheel"></div>
                <div class="loader-text"></div>
              </div>  
        
            </section>
         `;
    });

    test('Check the value sizeGrid', () => {
        expect(ticTacToe.sizeGird).toEqual(3);
    });

    test('Check winConditions base on value sizeGrid (default = 3)', () => {
      expect(ticTacToe.winConditions().length).toEqual(8);
    });

    test('Check winConditions base on different sizeGrid ', () => {
      ticTacToe.sizeGird = 5;
      expect(ticTacToe.winConditions().length).toEqual(ticTacToe.calculateCountWinConditionbySizeGrid(5));//12
      
      ticTacToe.sizeGird = 2;
      expect(ticTacToe.winConditions().length).toEqual(6);
      expect(ticTacToe.calculateCountWinConditionbySizeGrid(2)).toEqual(6);

      ticTacToe.sizeGird = 10;
      expect(ticTacToe.winConditions().length).toEqual(22);
      expect(ticTacToe.calculateCountWinConditionbySizeGrid(10)).toEqual(22);

      ticTacToe.sizeGird = 20;
      expect(ticTacToe.winConditions().length).toEqual(42);
      expect(ticTacToe.calculateCountWinConditionbySizeGrid(20)).toEqual(42);

      ticTacToe.sizeGird = 30;
      expect(ticTacToe.winConditions().length).toEqual(62);
      expect(ticTacToe.calculateCountWinConditionbySizeGrid(30)).toEqual(62);


    });


    test('Check Turn Player', () => {
      expect(ticTacToe.currentPlayer).toEqual(ticTacToe.players.x);

      TicTacToe.prototype.turnPlayer = jest.fn()
      const spy = jest.spyOn(TicTacToe.prototype, "turnPlayer");

      ticTacToe.turnPlayer();
      // expect(spy).toHaveBeenCalledTimes(1);
      expect(ticTacToe.currentPlayer).toEqual(ticTacToe.players.o);
    
      spy.mockReset();
      spy.mockRestore();

    });

    
    test('Check to render Game Board',async () => {
      const result = await ticTacToe.renderGameBoard();
      expect(result).toBeTruthy();
    });

    test('Click on a specific index cell', async () => {

      const render = await ticTacToe.renderGameBoard();
      expect(render).toBeTruthy();

      const result = await ticTacToe.bindHandler(ticTacToe.clickCell);
      expect(result).toBeTruthy();

      TicTacToe.prototype.clickCell = jest.fn()
      const spy = jest.spyOn(TicTacToe.prototype, "clickCell");
      ticTacToe.clickCell(0);
      // expect(spy).toHaveBeenCalledTimes(1);
      expect(ticTacToe.board[0]).toEqual(ticTacToe.players.x);
    
      spy.mockReset();
      spy.mockRestore();

    });

    
    test('Check updateBoard', async () => {
      const render = await ticTacToe.renderGameBoard();
      expect(render).toBeTruthy();

      expect(ticTacToe.board[1]).toEqual('');
      ticTacToe.updateBoard(1);
      expect(ticTacToe.board[1]).toEqual(ticTacToe.players.x);

    });
    
    test('Check checkWinPlayer', async () => {
      const render = await ticTacToe.renderGameBoard();
      expect(render).toBeTruthy();

      TicTacToe.prototype.clickCell = jest.fn()
      const spy = jest.spyOn(TicTacToe.prototype, "clickCell");

      ticTacToe.clickCell(0)
      expect(ticTacToe.board[0]).toEqual(ticTacToe.players.x);
      
      ticTacToe.clickCell(3)
      expect(ticTacToe.board[3]).toEqual(ticTacToe.players.o);

      ticTacToe.clickCell(1)
      expect(ticTacToe.board[1]).toEqual(ticTacToe.players.x);

      ticTacToe.clickCell(4)
      expect(ticTacToe.board[4]).toEqual(ticTacToe.players.o);

      ticTacToe.clickCell(2)
      expect(ticTacToe.board[2]).toEqual(ticTacToe.players.x);


      ticTacToe.checkWinPlayer();
      expect(ticTacToe.checkWinPlayer()).toBeTruthy();

      spy.mockReset();
      spy.mockRestore();

    });
    
    
});
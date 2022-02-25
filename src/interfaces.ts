
export interface IPlayer{
    x: string
    o: string
  }
  
export interface IGameBoard {
    renderGameBoard(): Promise<boolean>
    clickCell(indexCell: number): void
    bindHandler(clickHandler: ( indexCell: number ) => void): Promise<boolean> 
    updateBoard(indexCell: number): void
    resetBoard(): void
    checkWinPlayer(): boolean
    turnPlayer(): void
    winConditions(): Array<Array<number>>
    startGame():void
    isBoradFilled():boolean
    createDefaultValuesBoard(): Array<string> 
    getElement(selector: string, propertyObject?: any): HTMLElement
    getAllElements(selector: string): NodeList
    clearMessage(selector: string): void
    printFinalMessage(): void
  }

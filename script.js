

function GameBoard(){
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++)
        {
            board[i].push(Cell())
        }
    }

    const getBoard = () => board;

    const putToken = (row,col,player)=>{
        if(board[row][col].getValue() === 0){
            board[row][col].addToken(player);
        }
        else{
            console.log('not valid cell');
            
        }
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    return{getBoard,putToken,printBoard}

}


function GameController(player1 = 'P1', player2 = 'P2'){
    const board = GameBoard();

    const players = [
        {
            name:player1,
            token: 'X'
        },
        {
            name:player2,
            token:'O'
        }
    ];

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row,col)=>{
        if(board.getBoard()[row][col] === 0)
        {
             console.log(
            `Dropping ${getActivePlayer().name}'s token into row ${row} and column ${col}...`  //i need to write logic to make sure we can't put token in cells that already has token --done
            );
            board.getBoard()[row][col].addToken(activePlayer.token);
            switchPlayerTurn();
            printNewRound();
        }
        else {
            console.log('Token already exists in this cell, choose another.');
        }
       
    }
    printNewRound();
    return {
        playRound,
        getActivePlayer
    };
    
}

const game = GameController();

function Cell(){
    let value = 0;

    const addToken = (token)=>{
        value = token
    }

    const getValue = ()=> value;

    return {addToken, getValue};
}

function ScreenController(){

}

function UpdateScreen(){

}
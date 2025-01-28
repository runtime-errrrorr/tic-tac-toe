

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
        if(board[row][col].getValue() === ''){
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

    const resetBoard = ()=>{

        for(let i = 0; i < rows; i++){
            board[i] = [];
            for(let j = 0; j < columns; j++)
            {
                board[i].push(Cell())
            }
        }

    }

    return{getBoard,putToken,printBoard,resetBoard}

}


function GameController(player1 = 'P1', player2 = 'P2'){
    const board = GameBoard();
    let round = 0;
    let winner = '';
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

    const checkWinner = () => {
        const gameBoard = board.getBoard();
    
        // Row-wise checking
        for (let i = 0; i < 3; i++) {
            if (
                gameBoard[i][0].getValue() !== '' && 
                gameBoard[i][0].getValue() === gameBoard[i][1].getValue() && 
                gameBoard[i][1].getValue() === gameBoard[i][2].getValue()
            ) {
                return true;
            }
        }
    
        // Column-wise checking
        for (let i = 0; i < 3; i++) {
            if (
                gameBoard[0][i].getValue() !== '' && 
                gameBoard[0][i].getValue() === gameBoard[1][i].getValue() && 
                gameBoard[1][i].getValue() === gameBoard[2][i].getValue()
            ) {
                return true;
            }
        }
    
        // Diagonal checking
        if (
            gameBoard[0][0].getValue() !== '' &&
            gameBoard[0][0].getValue() === gameBoard[1][1].getValue() &&
            gameBoard[1][1].getValue() === gameBoard[2][2].getValue()
        ) {
            return true;
        }
    
        // Anti-diagonal checking
        if (
            gameBoard[0][2].getValue() !== '' &&
            gameBoard[0][2].getValue() === gameBoard[1][1].getValue() &&
            gameBoard[1][1].getValue() === gameBoard[2][0].getValue()
        ) {
            return true;
        }
    
        return false;
    };
    
    const playRound = (row,col)=>{
        if(board.getBoard()[row][col].getValue() === '')
        {
            round++;
             console.log(
            `Dropping ${getActivePlayer().name}'s token into row ${row} and column ${col}...`  //i need to write logic to make sure we can't put token in cells that already has token --done
            );

            board.getBoard()[row][col].addToken(activePlayer.token);
            if((row === col) || (row === 0 && col === 2 ) || (row === 3 && col === 0))
            {

            }
            // console.log(checkWinner());
            
            if(checkWinner()){
                console.log(`the winner is ${getActivePlayer().name}`);
                round = 0;
                return activePlayer.name
                
            }
            if(round === 9)
            {
                return 'tie';
            }
            switchPlayerTurn();
            //printNewRound();
        }
        else {
            console.log('Token already exists in this cell, choose another.');
        }
       
    }
    //printNewRound();
    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard,
        resetBoard: board.resetBoard
    };
    
}


function Cell(){
    let value = '';

    const addToken = (token)=>{
        value = token
    }

    const getValue = ()=> value;

    return {addToken, getValue};
}

function ScreenController(){
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const player1 = document.querySelector('.p1');
    const player2 = document.querySelector('.p2');
    
    
    const resetBtn = document.querySelector('.reset')

 

    const UpdateScreen = ()=>{
        
        boardDiv.textContent = '';
       
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer().name;

        playerTurnDiv.textContent = `The current active player is ${activePlayer}`;

        board.forEach((row,rowIndex) => {
            row.forEach((cell,colIndex)=>{
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');

                // Create a data attribute to identify the column and row
                // This makes it easier to pass into our `playRound` function 
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = colIndex;

                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            });
        });
    }
    const resetScreen = () =>
    {
        game.resetBoard();
        UpdateScreen();
        player1.textContent = 'Player One';
        player2.textContent = 'player Two';
    }

    const UpdateWinner = (winner)=>{
        // console.log(winner);
        if(winner === 'P1'){
            player1.textContent = 'You have won';
        }
        if(winner === 'P2'){
            player2.textContent = 'You have won';
            console.log(winner);
        }

        if(winner === 'tie')
        {
            player1.textContent =  'Tie';
            player2.textContent = 'Tie';

        }



    }

    function clickHandler(e)
    {
        
        const row = e.target.dataset.row;
        const col = e.target.dataset.column;

        if(!row || !col) return;

        let value = game.playRound(row,col);
        if(value)
        {
            UpdateWinner(value);
        }
        UpdateScreen();
    }


    boardDiv.addEventListener('click',clickHandler);
    resetBtn.addEventListener('click',resetScreen);
    UpdateScreen();
}

ScreenController();
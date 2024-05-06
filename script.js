let turns = 0; 

function Cell() {
    let symbol = "";
    let row = 0;
    let col = 0;

    const updateSymbol = (player) => symbol = player;
    const getSymbol = () => symbol;
    const updateRow = (newIndex) => row = newIndex;
    const updateCol = (newIndex) => col = newIndex;
    const getRow = () => row;
    const getCol = () => col;

    return { 
        getSymbol, 
        updateSymbol, 
        updateRow, 
        updateCol, 
        getRow, 
        getCol
    }
}

function GameBoard() {
    let board = [];

    const initialiseGameBoard = () => {
        for (let i = 0; i < 3; i++) {
            board.push([]);
            for (let j = 0; j < 3; j++) {
                cell = Cell()
                cell.updateRow(i)
                cell.updateCol(j)
                board[i].push(cell);
            }
        }
    }

    const resetGameBoard = () => {
        board = [];
        console.log(board)
        initialiseGameBoard()
        console.log(board)
    }

    function updateCell(row, col, symbol) {
        board[row][col].updateSymbol(symbol);
    }

    function checkIfGameWon(board, symbol) {

        function checkSquares(arrays, symbol) {
            for (const row of arrays) {
                let squaresMarked = 0;
                for (const square of row) {
                    if (square.getSymbol() == symbol) {
                        squaresMarked += 1;
                    }
                }
                
                if (squaresMarked == 3) {
                    return true
                }
            }   
    
            return false
        }
    
        function convertRowsToColumns() {
            let columns = [[], [], []]
    
            for (let row = 0; row < board.length; row++) {
                columns.push([])
                for (let col = 0; col < board[0].length; col++) {
                    columns[col].push(board[row][col]);
                }
            } 
    
            return columns
        }
    
        function giveTopLeftDiagonal() {
            let topLeftDiagonal = []
            for (let rowCol = 0; rowCol < board.length; rowCol++) {
                topLeftDiagonal.push(board[rowCol][rowCol]);
            } return topLeftDiagonal
        } 
    
        function giveBottomLeftDiagonal() {
            let bottomLeftDiagonal = []
            for (let row = 3; row < board.length; row--) {
                for (let col = 0; col < board.length; col++) {
                    bottomLeftDiagonal.push(board[row][col]);
                }
            } return bottomLeftDiagonal
        }   
    
        function checkRows() {
            return checkSquares(board, symbol)
        }
    
        function checkColumns() {
            const reversedBoard = convertRowsToColumns(board)
            return checkSquares(reversedBoard, symbol)
        }
    
        function checkDiagonals() {
            const diagonals = []
            diagonals.push(giveTopLeftDiagonal());
            diagonals.push(giveBottomLeftDiagonal());
    
            return checkSquares(diagonals, symbol)
        }
    
        if (checkRows() == true) {
            return true
        }
    
        if (checkColumns() == true) {
            return true
        }
    
        if (checkDiagonals() == true) {
            return true
        }
    
        return false
        
    }  

    // // Have another function that does this, but attached to the board
    // function checkIfSquareFilled(board, row, column) {
    //     if (board[row][column] != 0) {
    //         alert("Square already filled! Please choose a new one.");
    //         return false
    //     } else return true
    // }

    const getBoard = () => board;

    return { 
        initialiseGameBoard, 
        resetGameBoard,
        getBoard, 
        checkIfGameWon,
        updateCell
    };
}

function GamePlayer() {

    const gameBoard = GameBoard()
    gameBoard.initialiseGameBoard()
    const board = gameBoard.getBoard()

    let playerOneName = "Player One";
    let playerTwoName = "Player Two";
    
    const players = [
        {
            name: playerOneName,
            symbol: "X",
            wins: 0
        },
        {
            name: playerTwoName,
            symbol: "O",
            wins: 0
        }
    ];

    currentPlayer = players[0];

    const getPlayers = () => players;
    const getCurrentPlayer = () => currentPlayer;
    const changeTurn = () => currentPlayer === players[0] ? currentPlayer = players[1] : currentPlayer = players[0];
    const resetWins = () => {
        players[0].wins = 0;
        players[1].wins = 0;
    }

    const playTurn = (row, col) => {
        gameBoard.updateCell(row, col, currentPlayer.symbol);

        if (gameBoard.checkIfGameWon(gameBoard.getBoard(), currentPlayer.symbol)) {
            currentPlayer.wins += 1;
            currentPlayer = players[1];
        } else {
            changeTurn();
        }
    }

    return { 
        getCurrentPlayer, 
        getPlayers, 
        playTurn, 
        resetWins,
        getBoard: gameBoard.getBoard,
        resetGameBoard: gameBoard.resetGameBoard
     }
}

function RenderObjects() {

    const game = GamePlayer();
    const boardDiv = document.querySelector('.board');
    const playerTurnDiv = document.querySelector('div.turn');
    const newGameButton = document.querySelector('.new-game');
    const newRoundButton = document.querySelector('.new-round');

    function generateSquare(cell, row, col) {
        const button = document.createElement('button');

        button.textContent = cell.getSymbol();
        button.classList.add('square-button');
        button.dataset.row = row;
        button.dataset.col = col;

        return button
    }

    const updateBoard = () => {
        const board = game.getBoard();
        const currentPlayer = game.getCurrentPlayer();

        boardDiv.textContent = "";
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                square = generateSquare(cell, rowIndex, colIndex);
                boardDiv.appendChild(square);
            }) 
        })
        
        playerTurnDiv.textContent = `Current turn: ${currentPlayer.name}. Symbol: ${currentPlayer.symbol}. Wins: ${currentPlayer.wins}`;
    }

    const resetBoard = () => {
        game.resetGameBoard();
        updateBoard();
    } 

    const newGame = () => {
        resetBoard();
        game.resetWins();
    }

    const clickHandlerBoard = (e) => {
        if (e.target.textContent != "") {
            alert("Please select a square that hasn't been clicked yet!")
        } else {
            const clickedSquareRow = e.target.dataset.row;
            const clickedSquareCol = e.target.dataset.col;
            game.playTurn(clickedSquareRow, clickedSquareCol);
            updateBoard()
        }
    }

    updateBoard()

    newGameButton.addEventListener("click", newGame)
    newRoundButton.addEventListener("click", resetBoard)
    boardDiv.addEventListener("click", clickHandlerBoard);
}

RenderObjects()



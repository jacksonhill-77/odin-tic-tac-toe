let turns = 0; 

function Cell() {
    let symbol = "";
    let index = 0;

    const updateSymbol = (player) => symbol = player;
    const getSymbol = () => symbol;
    const updateIndex = (newIndex) => index = newIndex
    const getIndex = () => index;

    return { getSymbol, updateSymbol, updateIndex, getIndex}
}

function GameBoard() {
    let board = [];

    const initialiseGameBoard = () => {
        for (let i = 0; i < 3; i++) {
            board.push([]);
            for (let j = 0; j < 3; j++) {
                board[i].push(Cell());
            }
        }
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

    // Have another function that does this, but attached to the board
    function checkIfSquareFilled(board, row, column) {
        if (board[row][column] != 0) {
            alert("Square already filled! Please choose a new one.");
            return false
        } else return true
    }

    const getBoard = () => board;

    return { initialiseGameBoard, getBoard, checkIfGameWon };
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

    const playTurn = (cell) => {
        cell.updateSymbol(currentPlayer.symbol)

        if (gameBoard.checkIfGameWon(board, currentPlayer.symbol)) {
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
        getBoard: gameBoard.getBoard }
}

function RenderObjects() {

    function generateSquare(cell) {
        const square = document.createElement('div');
        const button = document.createElement('button');

        square.textContent = cell.getSymbol();
        square.classList.add('square');

        square.appendChild(button);
        return square
    }

    const game = GamePlayer();
    const body = document.querySelector('body');
    const boardDiv = document.querySelector('.board');
    const playerTurnDiv = document.querySelector('div.turn');

    const updateBoard = () => {
        const board = game.getBoard();
        board.forEach(row => {
            row.forEach((cell, index) => {
                square = generateSquare(cell);
                boardDiv.appendChild(square);
            }) 
        })
        boardDiv.textContent = "";
        const currentPlayer = game.getCurrentPlayer();
        playerTurnDiv.textContent = `${currentPlayer.name} | ${currentPlayer.symbol} | Wins: ${currentPlayer.wins}`;

        for (let row of board) {
            for (let cell of row) {
                square = generateSquare(cell)
                boardDiv.appendChild(square);
            }
        }
    }

    button.addEventListener('click', function() {
        game.playTurn(cell)
    })

    const clickHandlerBoard = (e) => {
        const selectedSquare = e.target.
        game.playTurn(selectedSquare)
        updateBoard()
    }

    boardDiv.addEventListener(click, clickHandlerBoard);
}

RenderObjects()



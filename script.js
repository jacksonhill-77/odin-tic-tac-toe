let turns = 0; 

function Cell() {
    let symbol = "";

    const updateSymbol = (player) => {
        symbol = player;
    }
    const getSymbol = () => symbol;

    return { getSymbol, updateSymbol}
}

function GameBoard() {
    let board = [];

    for (let i = 0; i < 3; i++) {
        board.push([]);
        for (let j = 0; j < 3; j++) {
            board[i].push(Cell);
        }
    }

    function checkIfGameWon(board, symbol) {

        function checkSquares(arrays, symbol) {
            for (const row of arrays) {
                let squaresMarked = 0;
                for (const square of row) {
                    if (square == symbol) {
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

    return { getBoard, checkIfGameWon };
}

const renderObjects = function() {

    const createBoard = function(board) {
        const body = document.querySelector('body');

        if (document.querySelector('.game-board-container')) {
            document.querySelector('.game-board-container').remove();
        }
        const gameBoardContainer = document.createElement('div');
        gameBoardContainer.classList.add('game-board-container');

        for (let row of board) {
            for (let i of row) {
                const square = document.createElement('div');
                const button = document.createElement('button');
                const symbol = i.toString();

                square.textContent = symbol;
                square.classList.add('square');

                button.addEventListener('click', (e) => {
                    let mark = "";
                    
                    (turns % 2 == 0) ? mark = "X" : mark = "O";
                    const target = e.currentTarget;
                    target.parentNode.textContent = mark;
                    board[row][i] = mark;
                    turns += 1;
                })

                square.appendChild(button);
                gameBoardContainer.appendChild(square);
            }
        }

        body.appendChild(gameBoardContainer);
        return board
    }

    return createBoard
}

function gamePlayer() {
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

    const playGame = function() {

        const updateWins = function(winnerName) {
            if (winnerName == playerOneName) {
                players[0].wins += 1
                alert(`Player 1 has won! Player 1 has won ${players[0].wins} times.`)
            } else {
                players[1].wins += 1
                alert(`Player 2 has won! Player 2 has won ${players[1].wins} times.`)
            }
        }

        // Creates new game 
        // Allows users to select their symbols
        // Creates a new board, returns the board and players
        const setUpNewGame = function() {

            return board
        }

        const playOneRound = function() {

            const gameBoard = GameBoard()
            const board = gameBoard.getBoard()

            currentPlayer = players[0];

            createBoard = renderObjects(board);

            const changeTurn = () => currentPlayer === players[0] ? currentPlayer = players[1] : currentPlayer = players[0];

            const playTurn = function playTurn(cell) {
                if (board.checkIfGameWon(board.board, currentPlayer.symbol)) {
                    updateWins(currentPlayer.name)
                } currentPlayer = players[1];
                
                cell.updateSymbol(currentPlayer.symbol);
                changeTurn();
            }
        }

        return playOneRound()


    }

    return playGame()


}

const gamePlayerInstance = gamePlayer();
const playGame = gamePlayerInstance.playGame();
const playOneRound = gamePlayerInstance.playOneRound();

const newGameButton = document.querySelector('.new-game');
newGameButton.addEventListener('click', playGame());

const newRoundButton = document.querySelector('.new-round');
newRoundButton.addEventListener('click', playOneRound());



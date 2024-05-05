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

function GamePlayer() {

    const gameBoard = GameBoard()
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

    const updateWins = function(winnerName) {
        if (winnerName == playerOneName) {
            players[0].wins += 1
            alert(`Player 1 has won! Player 1 has won ${players[0].wins} times.`)
        } else {
            players[1].wins += 1
            alert(`Player 2 has won! Player 2 has won ${players[1].wins} times.`)
        }
    }

    const playOneRound = function() {

        function playTurn(cell) {
            if (board.checkIfGameWon(board.board, currentPlayer.symbol)) {
                updateWins(currentPlayer.name)
            } currentPlayer = players[1];
            
            cell.updateSymbol(currentPlayer.symbol);
            changeTurn();
        }
    }

    return { 
        getCurrentPlayer, 
        getPlayers, 
        playOneRound, 
        getBoard: gameBoard.getBoard }
}

function RenderObjects() {

    function markSquare(e, row, cell) {
        const target = e.currentTarget;
        const currentSymbol = game.getCurrentPlayer().symbol
        target.parentNode.textContent = currentSymbol;
        board[row][cell].updateSymbol(currentSymbol)
    }

    function generateSquare(row, cell) {
        const square = document.createElement('div');
        const button = document.createElement('button');
        cell = cell.toString();

        square.textContent = cell;
        square.classList.add('square');

        button.addEventListener('click', function(e) {
            markSquare(e, row, cell)
        })

        square.appendChild(button);
        return square
    }

    const game = GamePlayer();
    const body = document.querySelector('body');
    const boardDiv = document.querySelector('.board');
    const playerTurnDiv = document.querySelector('div.turn');
    const board = game.getBoard();

    const updateBoard = (board) => {
        boardDiv.textContent = "";
        const currentPlayer = game.getCurrentPlayer();
        playerTurnDiv.textContent = `${currentPlayer.name} | ${currentPlayer.symbol} | Wins: ${currentPlayer.wins}`;

        for (let row of board) {
            for (let cell of row) {
                square = generateSquare(row, cell)
                boardDiv.appendChild(square);
            }
        }

        body.appendChild(gameBoardContainer);
    }

    updateBoard(board)
}

RenderObjects()

const newGameButton = document.querySelector('.new-game');
newGameButton.addEventListener('click', playGame());

const newRoundButton = document.querySelector('.new-round');
newRoundButton.addEventListener('click', playOneRound());



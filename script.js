let userTurn = '';

const gameBoard = function gameBoard() {
    let board = [["", "", ""], ["", "", ""], ["", "", ""]];

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

    return { board, checkIfGameWon };
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
                    const target = e.currentTarget;
                    target.parentNode.textContent = userTurn;
                })

                square.appendChild(button);
                gameBoardContainer.appendChild(square);
            }
        }

        body.appendChild(gameBoardContainer);
    }

    return createBoard
}

const gamePlayer = function gamePlayer() {
    let player1Wins = 0;
    let player2Wins = 0;

    const updateWins = function(winner) {
        if (winner == 'player1') {
            player1Wins += 1
            alert(`Player 1 has won! Player 1 has won ${player1Wins} times.`)
        } else {
            player2Wins += 1
            alert(`Player 2 has won! Player 2 has won ${player2Wins} times.`)
        }
    }

    const playGame = function() {

        // Creates new game 
        // Allows users to select their symbols
        // Creates a new board, returns the board and players
        const setUpNewGame = function() {
            const board = gameBoard()

            // Key line for transferring logic to the DOM
            createBoard(board.board);

            let player1Symbol = prompt('Player 1, please choose whether you want to play as noughts (O) or crosses (X):');
            let player2Symbol = '';
            player1Symbol == 'O' ? player2Symbol = 'X' : player2Symbol = 'O';
            alert(`Player 1 has chosen '${player1Symbol}'. Player 2 has been automatically assigned '${player2Symbol}'.`)

            return [board, player1Symbol, player2Symbol]
        }

        const playOneRound = function() {

            // Key line for transferring logic to the DOM
            createBoard = renderObjects();

            userTurn = '';

            [board, player1Symbol, player2Symbol] = setUpNewGame();

            // This entire loop needs to be removed. Instead it goes back and forth between each person, 
            // counting the amount of times any button has been clicked in total

            // add a new function (on gameboard?) which acts as a click, and carry out this same logic with it - 
            // i.e. check if the game is won, update the wins accordingly
            for (let turns = 0; turns < 9; turns++) {

                if (turns == 9) {
                    alert("It's a tie!");
                    break
                } 
                if (turns % 2 == 0) {
                    userTurn = 'X'
                    if (board.checkIfGameWon(board.board, player1Symbol)) {
                        updateWins('player1');
                        break
                    };
                } else {
                    userTurn = 'O'
                    if (board.checkIfGameWon(board.board, player2Symbol)) {
                        updateWins('player2');
                        break
                    };
                }
            }
        }

        const newRoundButton = document.querySelector('.new-round');
        newRoundButton.addEventListener('click', playOneRound());
    }

    const newGameButton = document.querySelector('.new-game');
    newGameButton.addEventListener('click', playGame());
}


gamePlayer()

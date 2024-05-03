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

    function checkIfSquareFilled(board, row, column) {
        if (board[row][column] != 0) {
            alert("Square already filled! Please choose a new one.");
            return false
        } else return true
    }


    function player(symbol, playerName) {
    }

    return { board, player, checkIfGameWon };
}

const renderObjects = function() {

    const createBoard = function(board) {
        const body = document.querySelector('body');
        
        if (document.querySelector('.game-board-container')) {
            document.querySelector('.game-board-container').remove()
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

        const setUpNewGame = function() {
            const board = gameBoard()

            // Key line for transferring logic to the DOM
            createBoard(board.board);

            let player1Symbol = prompt('Player 1, please choose whether you want to play as noughts (O) or crosses (X):');
            let player2Symbol = '';
            player1Symbol == 'O' ? player2Symbol = 'X' : player2Symbol = 'O';
            alert(`Player 1 has chosen '${player1Symbol}'. Player 2 has been automatically assigned '${player2Symbol}'.`)
        
            const player1 = board.player(player1Symbol, "Player 1");
            const player2 = board.player(player2Symbol, "Player 2");

            return [board, player1, player2, player1Symbol, player2Symbol]
        }

        const playOneRound = function() {

            // Key line for transferring logic to the DOM
            createBoard = renderObjects();

            userTurn = '';

            [board, player1, player2, player1Symbol, player2Symbol] = setUpNewGame();

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

        // This logic should be on a button, so the user can choose when they want to play
        playOneRound()
    }

    // This logic should be on a button
    const checkUserWantsToPlay = function() {
        doesUserWantToPlay = prompt('Do you want to play a game? Press y for yes, or n for no.')
        if (doesUserWantToPlay == 'y') {
            return true
        }
        return false
    }   

    // The loop can be removed - playGame() when user clicks button
    while (true){
        if (checkUserWantsToPlay() == true) {
            playGame()
        } else {
            break
        }
    }
}


gamePlayer()

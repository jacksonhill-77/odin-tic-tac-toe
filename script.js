// const renderObjects = function() {

//     const gameBoardContainer = document.querySelector('.game-board')

//     const renderBoard = function(board) {
//         for (let row of board) {
//             for (let i of row) {
//                 let square = document.createElement('div');
//                 square.textContent = i.toString();
//                 square.classList.add('square');
//                 gameBoardContainer.appendChild(square);
//             }
//         }
//     }

//     return [renderBoard]
// }

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

        function chooseSquareToMark() {
            let row = prompt(`${playerName}, please enter the row of the square you want to mark: `);
            let column = prompt(`${playerName}, please enter the column of the square you want to mark: `);
            row = +row - 1;
            column = +column - 1;
            return [row, column]
        }

        const markSquare = function() {
            let isSquareFilled = false;
            let row;
            let column;
            while (isSquareFilled == false) {
                [row, column] = chooseSquareToMark();
                isSquareFilled = checkIfSquareFilled(board, row, column);
            }
            board[row][column] = symbol;
        }

        return { markSquare }
    }

    return { board, player, checkIfGameWon };
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

            let player1Symbol = prompt('Player 1, please choose whether you want to play as noughts (O) or crosses (X):');
            let player2Symbol = '';
            player1Symbol == 'O' ? player2Symbol = 'X' : player2Symbol = 'O';
            alert(`Player 1 has chosen '${player1Symbol}'. Player 2 has been automatically assigned '${player2Symbol}'.`)
        
            const player1 = board.player(player1Symbol, "Player 1");
            const player2 = board.player(player2Symbol, "Player 2");

            return [board, player1, player2, player1Symbol, player2Symbol]
        }

        const playOneRound = function() {

            [board, player1, player2, player1Symbol, player2Symbol] = setUpNewGame();
            [renderBoard] = renderObjects();

            for (let turns = 0; turns < 9; turns++) {
                renderBoard(board.board)
                if (turns == 9) {
                    alert("It's a tie!");
                    break
                } 
                if (turns % 2 == 0) {
                    player1.markSquare()
                    if (board.checkIfGameWon(board.board, player1Symbol)) {
                        updateWins('player1');
                        break
                    };
                } else {
                    player2.markSquare()
                    if (board.checkIfGameWon(board.board, player2Symbol)) {
                        updateWins('player2');
                        break
                    };
                }
            }
        }

        playOneRound()
    }

    const checkUserWantsToPlay = function() {
        doesUserWantToPlay = prompt('Do you want to play a game? Press y for yes, or n for no.')
        if (doesUserWantToPlay == 'y') {
            return true
        }
        return false
    }   

    while (true){
        if (checkUserWantsToPlay() == true) {
            playGame()
        } else {
            break
        }
    }
}


gamePlayer()

const gameBoard = function gameBoard() {
    let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    const markSquare = function(row, column, symbol) {
        board[row][column] = symbol;
    }



    function checkIfGameWon(board, symbol) {

        function checkSquares(board, symbol) {
            for (const row of board) {
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

        function checkRows() {
            return checkSquares(board, symbol)
        }

        function checkColumns() {
            reversedBoard = convertRowsToColumns(board)
            return checkSquares(reversedBoard, symbol)
        }

        // function checkDiagonals() {

        // }

        if (checkRows() == true) {
            return true
        }

        if (checkColumns() == true) {
            return true
        }

        return false
        
    }   


    function player() {
        // const promptPlayerName = prompt('Please type your player name: ');
        let symbol = prompt('Please choose whether you want to play as noughts or crosses by entering n or c: ');
        symbol == 'n' ? symbol = 1 : symbol = 2; 
    
        const chooseSquareToMark = function() {
            let row = prompt('Please enter the row of the square you want to mark: ');
            let column = prompt('Please enter the column of the square you want to mark: ');
            row = +row - 1;
            column = +column - 1;
            markSquare(row, column, symbol);
            console.log(checkIfGameWon(board, symbol));
            console.log(board);
        }

        return { chooseSquareToMark }
    }

    return { board, player };
}


const game = gameBoard();
const player1 = game.player();
player1.chooseSquareToMark();
player1.chooseSquareToMark();
player1.chooseSquareToMark();
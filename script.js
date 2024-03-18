const gameBoard = function gameBoard() {
    let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    const markSquare = function(row, column, symbol) {
        board[row][column] = symbol;
    }



    checkIfGameWon = function checkIfGameWon(board, symbol) {
        function checkRows() {
            for (const row of board) {
                for (const square of row) {
                    if (square != symbol) {
                        return false
                    }
                }

                return true
            }   
        }

        // function checkColumns() {
        //     let columns = []

        //     for (let row = 0; row < board.length; row++) {
        //         columns.push([])
        //         for (let col = 0; col < board[0].length; col++) {
        //             columns[row].push(board[col][row]);
        //         }
        //     } 

        //     console.log(columns)
        // }

        // checkColumns();

        if (checkRows() == true) {
            return true
        }
        
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
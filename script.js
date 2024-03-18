const gameBoard = function gameBoard() {
    let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    const markSquare = function(row, column, symbol) {
        board[row][column] = symbol;
    }

    // function checkIfGameWon(squareMarked, symbol) {
    //     for (const i in board) {
            
    //     }
    // }

    function player() {
        const promptPlayerName = prompt('Please type your player name: ');
        let symbol = prompt('Please choose whether you want to play as noughts or crosses by entering n or c: ');
        symbol == 'n' ? symbol = 1 : symbol = 2; 
    
    
        const chooseSquareToMark = function() {
            let row = prompt('Please enter the row of the square you want to mark: ');
            let column = prompt('Please enter the column of the square you want to mark: ');
            row = +row - 1;
            column = +column - 1;
            markSquare(row, column, symbol);
            console.log(board);
        }

        return { chooseSquareToMark }
    }

    return { board, player };
}


const game = gameBoard();
const player1 = game.player();
player1.chooseSquareToMark()
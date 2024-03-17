const gameBoard = function gameBoard() {
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const markSquare = function(squareToMark, symbol) {
        board[squareToMark] = symbol;
    }

    function player() {
        const promptPlayerName = prompt('Please type your player name: ');
        let symbol = prompt('Please choose whether you want to play as noughts or crosses by entering n or c: ');
        symbol == 'n' ? symbol = 1 : symbol = 2; 
    
    
        const chooseSquareToMark = function() {
            let squareToMark = prompt('Please choose which square you want to mark (top left = 1, bottom right = 9): ');
            squareToMark = +squareToMark - 1;
            markSquare(squareToMark, symbol);
            console.log(board);
        }

        return { chooseSquareToMark }
    }

    return { board, player };
}


const game = gameBoard();
const player1 = game.player();
player1.chooseSquareToMark()
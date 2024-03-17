const gameBoard = function gameBoard() {
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const markSquare = function(squareToMark, marking) {
        board[squareToMark] = marking;
    }

    return { board, markSquare };
}


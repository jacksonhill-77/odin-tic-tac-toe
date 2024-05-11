let turns = 0; 

function Cell() {
    let symbol = "";
    let row = 0;
    let col = 0;

    const updateSymbol = (player) => symbol = player;
    const getSymbol = () => symbol;
    const updateRow = (newIndex) => row = newIndex;
    const updateCol = (newIndex) => col = newIndex;
    const getRow = () => row;
    const getCol = () => col;

    return { 
        getSymbol, 
        updateSymbol, 
        updateRow, 
        updateCol, 
        getRow, 
        getCol
    }
}

function GameBoard() {
    let board = [];

    const initialiseGameBoard = () => {
        for (let i = 0; i < 3; i++) {
            board.push([]);
            for (let j = 0; j < 3; j++) {
                cell = Cell()
                cell.updateRow(i)
                cell.updateCol(j)
                board[i].push(cell);
            }
        }
    }

    const printBoard = () => {
        let printedBoard = []
        board.forEach(row => {
            let printedRow = []
            row.forEach(cell => {
                let symbol = cell.getSymbol()
                printedRow.push(symbol)
            })
            printedBoard.push(printedRow)
        })
        console.log(printedBoard)
    }

    const resetGameBoard = () => {
        board = [];
        initialiseGameBoard()
    }

    function updateCell(row, col, symbol) {
        board[row][col].updateSymbol(symbol);
    }

    function checkIfGameWon(board, symbol) {

        function checkSquares(arrays, symbol) {
            for (const row of arrays) {
                let cellsMarked = 0;
                for (const cell of row) {
                    if (cell.getSymbol() == symbol) {
                        cellsMarked += 1;
                    }
                }
                
                if (cellsMarked == 3) {
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
            let col = 0;
            for (let row = 2; row > -1; row--) {
                bottomLeftDiagonal.push(board[row][col]);
                col += 1
                }
            return bottomLeftDiagonal
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
            const topleft = giveTopLeftDiagonal();
            const bottomLeft = giveBottomLeftDiagonal();
            topleft.forEach(cell => {
                console.log(cell.getSymbol())
            })
            bottomLeft.forEach(cell => {
                console.log(cell.getSymbol())
            })
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

    const getBoard = () => board;

    return { 
        initialiseGameBoard, 
        resetGameBoard,
        getBoard, 
        checkIfGameWon,
        updateCell,
        printBoard
    };
}

function GamePlayer() {

    const gameBoard = GameBoard()
    gameBoard.initialiseGameBoard()
    const board = gameBoard.getBoard()

    let playerOneName = "Player One";
    let playerTwoName = "Player Two";
    
    const players = [
        {
            name: playerOneName,
            symbol: "X",
            wins: 0,
            number: 1
        },
        {
            name: playerTwoName,
            symbol: "O",
            wins: 0,
            number: 2
        }
    ];

    currentPlayer = players[0];

    const getPlayers = () => players;
    const getCurrentPlayer = () => currentPlayer;
    const changeTurn = () => currentPlayer === players[0] ? currentPlayer = players[1] : currentPlayer = players[0];
    const resetWins = () => {
        players[0].wins = 0;
        players[1].wins = 0;
    }
    const updatePlayerNames = (player1Name, player2Name) => {
        players[0].name = player1Name;
        players[1].name = player2Name;
    }

    const playTurn = (row, col) => {
        gameBoard.updateCell(row, col, currentPlayer.symbol);
    }

    return { 
        getCurrentPlayer, 
        changeTurn,
        getPlayers, 
        updatePlayerNames,
        playTurn, 
        resetWins,
        getBoard: gameBoard.getBoard,
        resetGameBoard: gameBoard.resetGameBoard,
        checkIfGameWon: gameBoard.checkIfGameWon,
        printBoard: gameBoard.printBoard
     }
}

function RenderObjects() {

    const game = GamePlayer();
    const players = game.getPlayers();
    const boardDiv = document.querySelector('.board');
    const newGameButton = document.querySelector('.new-game');
    const newRoundButton = document.querySelector('.new-round');
    const winnerDiv = document.querySelector('#winner');
    const enterNamesButton = document.querySelector('#enter-names');
    const closeButton = document.querySelector('#close');
    const dialog = document.querySelector('#dialog');
    const form = document.querySelector('form');

    const player1Name = document.querySelector('.player-parent#one>.player-name');
    const player2Name = document.querySelector('.player-parent#two>.player-name');
    const player1Wins = document.querySelector('.player-parent#one>.player-wins');
    const player2Wins = document.querySelector('.player-parent#two>.player-wins');
    const player1Symbol = document.querySelector('.player-parent#one>.symbol');
    const player2Symbol = document.querySelector('.player-parent#two>.symbol');
    const player1Parent = document.querySelector('.player-parent#one');
    const player2Parent = document.querySelector('.player-parent#two');

    player1Wins.textContent = 'Wins: 0'
    player2Wins.textContent = 'Wins: 0'
    player1Name.textContent = players[0].name;
    player2Name.textContent = players[1].name;
    player1Symbol.textContent = players[0].symbol;
    player2Symbol.textContent = players[1].symbol;

    const generateSquare = (cell, row, col) => {
        const button = document.createElement('button');

        button.textContent = cell.getSymbol();
        button.classList.add('square-button');
        button.dataset.row = row;
        button.dataset.col = col;

        return button
    }

    const renderPlayerNames = () => {
        const players = game.getPlayers();

        player1Name.textContent = players[0].name;
        player2Name.textContent = players[1].name;
    }

    const highlightCurrentPlayerDiv = () => {
        const playerDivs = document.querySelectorAll('.player-parent');
        const currentPlayer = game.getCurrentPlayer();

        playerDivs.forEach((div) => div.classList.remove('player-parent-active'));

        if (currentPlayer.number === 1) {
            player1Parent.classList.add('player-parent-active');
        } else {
            player2Parent.classList.add('player-parent-active');
        }
    }

    const renderWins = () => {
        currentPlayers = game.getPlayers()
        player1Wins.textContent = `Wins: ${currentPlayers[0].wins}`
        player2Wins.textContent = `Wins: ${currentPlayers[1].wins}`
    }

    const updateGameInformation = () => {
        highlightCurrentPlayerDiv()
        renderWins()
    }

    const updateBoard = () => {
        const board = game.getBoard();

        boardDiv.textContent = "";
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                square = generateSquare(cell, rowIndex, colIndex);
                boardDiv.appendChild(square);
            }) 
        })
        
        updateGameInformation()
        
    }

    const resetBoard = () => {
        game.resetGameBoard();
        updateBoard();
    } 

    const newGame = () => {
        game.resetWins();
        resetBoard();
    }

    const isGameWon = () => {
        const currentPlayer = game.getCurrentPlayer();
        if (game.checkIfGameWon(game.getBoard(), currentPlayer.symbol)) {
            return true
        } else {
            return false
        }
    }

    const updateWins = () => {

        const currentPlayer = game.getCurrentPlayer();

        if (isGameWon()) {

            currentPlayer.wins += 1;

            renderWins()
            
            winnerDiv.textContent = `${currentPlayer.name} wins!`
            
            resetBoard()
        };
    }

    const clickHandlerBoard = (e) => {

        if (e.target.textContent != "") {
            alert("Please select a square that hasn't been clicked yet!")
        } else {
            const clickedSquareRow = e.target.dataset.row;
            const clickedSquareCol = e.target.dataset.col;

            game.playTurn(clickedSquareRow, clickedSquareCol);
             
            if (isGameWon()) {
                updateWins()
            } else {
                game.changeTurn()
            }

            updateBoard()
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name1 = document.querySelector('#name1').value;
        const name2 = document.querySelector('#name2').value;

        game.updatePlayerNames(name1, name2);

        renderPlayerNames()

        dialog.close()
    })
    enterNamesButton.addEventListener('click', () => {
        dialog.showModal();
    })
    closeButton.addEventListener('click', () => {
        dialog.close()
    })
    newGameButton.addEventListener("click", newGame)
    newRoundButton.addEventListener("click", resetBoard)
    boardDiv.addEventListener("click", clickHandlerBoard);

    updateBoard()
}

RenderObjects()



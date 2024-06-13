function Gameboard() {
    const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const winningCondition = [
                                [0, 1, 2],
                                [3, 4, 5],
                                [6, 7, 8],
                                [0, 3, 6],
                                [1, 4, 7],
                                [2, 5, 8],
                                [2, 4, 6],
                                [0, 4, 8]
                            ];

    const addMarker = (marker, index) => {
        board[index] = marker;
    }

    const printBoard = () => {
        let line = '';
        for(let i = 0; i <= board.length; i++) {
            if( i !== 0 && i % 3 === 0) {
                console.log(line)
                line = '';
            }
            line +=  " " + board[i];
        }
    }

    return {board, addMarker, printBoard, winningCondition};
}

function gameControl() {
    const board = Gameboard();
    let canvas = board.board;
    const players = [{name: 'Player 1', marker: 'X'},
                     {name: 'Player 2', marker: 'O'}]
    
    let activePlayer = players[0];
    let count = 0;
    const playerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer; 

    function hasWon() {
        for(let i=0; i<8; i++) {
            for(let j=0; j<1; j++) {
                //let index = board.winningCondition[i][j];

                if(canvas[board.winningCondition[i][j]] === canvas[board.winningCondition[i][j+1]] && 
                    canvas[board.winningCondition[i][j]] === canvas[board.winningCondition[i][j+2]])
                {
                    console.log('We have a winner');
                    console.log(getActivePlayer().name);
                }    
            }
        }
    }
    
    const playRound = (marker, index) => {
        console.log(getActivePlayer().name, 'turn');
        marker = getActivePlayer().marker;
        index = prompt('select index to place your marker');
    
        board.addMarker(marker, index);
        board.printBoard();
        hasWon();

        /*
        game tie logic 
        there's a total of 9 moves to play in this game. If the game has
        tied, it means player 1 has played `5` moves and player 2 has played
        '4' moves. So here, if player 1 move count reaches `5` we display
        ```game tied``` message. 
        */
        if(getActivePlayer() === players[0]) count++;
        if(count === 5) console.log('***Game tied***');

        playerTurn();
    }

    return {playRound};
}

const test = gameControl();
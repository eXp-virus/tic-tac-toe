let board = ["", "", "", "", "", "", "", "", ""];
function Gameboard() {
    // let board = ["", "", "", "", "", "", "", ""];

    const WINNING_CONDITIONS = [
                                [0, 1, 2],
                                [3, 4, 5],
                                [6, 7, 8],
                                [0, 4, 8],
                                [2, 4, 6],
                                [0, 3, 6],
                                [1, 4, 7],
                                [2, 5, 8]
                            ];

    const addMarker = (index, marker) => board[index] = marker;
    
    function checkWin() {
        return WINNING_CONDITIONS.some(condition => {
            let [a, b, c] = condition;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function checkDraw() {
        return board.every(value => value !== '');
    }

    return {addMarker, checkWin, checkDraw}
}

function PlayGame() {
    let gameActive = true;
    const players = [{name: 'Player X', marker: 'X'}, {name: 'Player O', marker: 'O'}];
    let activePlayer = players[0];

    const switchTurn = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];

    const cells = document.querySelectorAll('#box');
    const p = document.querySelector('p');
    const result = document.querySelector('#gameResult');

    cells.forEach(cell => cell.addEventListener('click', playRound))

    function playRound(e) {
        if(!gameActive) {
            return;
        }
        let cell = e.target;
        let index = cell.dataset.index;
        let marker = activePlayer.marker;

        if(cell.textContent === '') cell.textContent = marker;

        Gameboard().addMarker(index, marker);
        
        if(Gameboard().checkWin()) {
            p.textContent = activePlayer.name + ' won';
            gameActive = false;
            const button = getButton();
            result.appendChild(button);
            return;
        }

        if(Gameboard().checkDraw()) {
            p.textContent = 'Game tied'
            gameActive = false;
            const button = getButton();
            result.appendChild(button);
            return;
        }

        switchTurn();
    }
    result.addEventListener('click', resetGame)
   
    function resetGame(e) {
        cells.forEach(cell => cell.textContent = "");
        gameActive = true;
        board.fill("");
        p.textContent = "";
        activePlayer = players[0];
        // remove play again button
        if(e.target.closest('button')) {
            e.target.closest('button').remove();
        }
    }
}

function getButton() {
    const button = document.createElement('button');
    button.textContent = "Play Again";
    return button;
}

PlayGame();
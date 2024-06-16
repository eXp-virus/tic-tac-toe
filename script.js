const Gameboard = (() => {
     let board = ["", "", "", "", "", "", "", "", ""];

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

    return {addMarker, checkWin, checkDraw, board}
})()

function PlayGame() {
    let gameActive = true;
    const players = [{name: 'Player X', marker: 'X'}, {name: 'Player O', marker: 'O'}];
    let activePlayer = players[0];

    const switchTurn = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];

    const cells = document.querySelectorAll('#box');
    const showResult = document.querySelector('p');
    const addPlayAgainButton = document.querySelector('#gameResult');

    cells.forEach(cell => cell.addEventListener('click', playRound))

    function playRound(e) {
        if(!gameActive) {
            return;
        }
        let cell = e.target;
        let index = cell.dataset.index;
        let marker = activePlayer.marker;

        if(cell.textContent === '') cell.textContent = marker;

        Gameboard.addMarker(index, marker);
        
        if(Gameboard.checkWin()) {
            showResult.textContent = activePlayer.name + ' won';
            gameActive = false;
            const button = getButton();
            addPlayAgainButton.appendChild(button);
            return;
        }

        if(Gameboard.checkDraw()) {
            showResult.textContent = 'Game tied'
            gameActive = false;
            const button = getButton(); // add a play again button after game ends
            addPlayAgainButton.appendChild(button);
            return;
        }

        switchTurn();
    }
    addPlayAgainButton.addEventListener('click', resetGame)
   
    function resetGame(e) {
        if(e.target.matches('button')) {
            e.target.closest('button').remove();
            cells.forEach(cell => cell.textContent = "");
            gameActive = true;
            Gameboard.board.fill("");
            showResult.textContent = "";
            activePlayer = players[0];
        }
    }
}

function getButton() {
    const button = document.createElement('button');
    button.textContent = "Play Again";
    return button;
}

PlayGame();
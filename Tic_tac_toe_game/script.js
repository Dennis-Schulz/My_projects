const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const newGameButton = document.querySelector(".new-game");
const winMessage = document.createElement("div");
const player1 = "✖️";
const player2 = "⭕";
let currentPlayer = player1;
let win = false;

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        if (cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent && cells[a].textContent !== "") {
            cells[a].style.background = "#35d935";
            cells[b].style.background = "#35d935";
            cells[c].style.background = "#35d935";
            renderWin();
            return win = true;
        }
    }
    return false;
};

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (win) {
            return;
        }
        if (cell.textContent === "") {
            cell.textContent = currentPlayer;
            if (currentPlayer === player1) {
                currentPlayer = player2;
                checkWin();
                cell.style.color = "red";
            } else {
                currentPlayer = player1;
                checkWin();
                cell.style.color = "blue";
            }
        }
    });
});

newGameButton.addEventListener("click", () => {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.color = "black";
        cell.style.background = "white";
        winMessage.textContent = "";
    });
    currentPlayer = player1;
    win = false;
});

function renderWin() {
    winMessage.textContent = `Player ${currentPlayer} wins!`;
    winMessage.style.fontSize = "2rem";
    winMessage.style.fontWeight = "bold";
    winMessage.style.color = "green";
    document.body.appendChild(winMessage);
}
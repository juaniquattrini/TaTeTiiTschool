let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

function makeMove(index) {
    if (board[index] === '') {
        board[index] = currentPlayer;
        updateBoard();
        let winner = checkWinner();
        if (winner) {
            saveGame(winner);
            showModal(winner);
            resetBoard();
        } else if (isBoardFull()) {
            saveGame(null);
            showModal('Empate');
            resetBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
        cell.className = `cell ${board[index].toLowerCase()}`;
    });
}

function checkWinner() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical
        [0, 4, 8], [2, 4, 6]  // Diagonal
    ];

    const winningCombo = winCombos.find(combo => 
        combo.every(index => board[index] === currentPlayer)
    );

    return winningCombo ? currentPlayer : null;
}

function isBoardFull() {
    return board.every(cell => cell !== '');
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    updateBoard();
    currentPlayer = 'X';
}

function saveGame(winner) {
    fetch('/game/save_game/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: `board=${JSON.stringify(board)}&winner=${winner || ''}`
    });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function showModal(result) {
    const modal = document.getElementById('modal');
    const winnerText = document.getElementById('winner-text');
    
    if (result === 'Empate') {
        winnerText.textContent = '¡Empate!';
    } else {
        winnerText.textContent = `¡Ganador: ${result}!`;
    }
    
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
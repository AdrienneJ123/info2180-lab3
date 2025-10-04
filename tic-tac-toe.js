window.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const squares = board.querySelectorAll('div');
  const statusDiv = document.getElementById('status');
  const newGameButton = document.querySelector('.btn');
  
  // Initialize game state
  let currentPlayer = 'X';
  let gameState = Array(9).fill(null);
  let gameActive = true;

  // Add the "square" class and event listeners
  squares.forEach((square, index) => {
    square.classList.add('square');

    // Hover effects
    square.addEventListener('mouseover', () => {
      if (gameActive && !gameState[index]) {
        square.classList.add('hover');
      }
    });

    square.addEventListener('mouseout', () => {
      square.classList.remove('hover');
    });

    // Click event to play move
    square.addEventListener('click', () => {
      if (gameActive && !gameState[index]) {
        gameState[index] = currentPlayer;
        square.textContent = currentPlayer;
        square.classList.add(currentPlayer);

        // Check winner after each move
        if (checkWinner()) {
          statusDiv.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
          statusDiv.classList.add('you-won');
          gameActive = false;
        } 
        // Check for draw if no winner
        else if (checkDraw()) {
          statusDiv.textContent = "It's a draw! Try again.";
          statusDiv.classList.remove('you-won');
          gameActive = false;
        } 
        else {
          // Switch player
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
      }
    });
  });

  // Function to check for winner
  function checkWinner() {
    const winningCombos = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    return winningCombos.some(combo => {
      const [a, b, c] = combo;
      return (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      );
    });
  }

  // Function to check for draw
  function checkDraw() {
    return gameState.every(cell => cell !== null);
  }

  // "New Game" button functionality
  newGameButton.addEventListener('click', () => {
    // Reset all variables
    gameState = Array(9).fill(null);
    gameActive = true;
    currentPlayer = 'X';

    // Clear all squares
    squares.forEach(square => {
      square.textContent = '';
      square.classList.remove('X', 'O', 'hover');
    });

    // Reset status message to original
    statusDiv.textContent = 'Move your mouse over a square and click to play an X or an O.';
    statusDiv.classList.remove('you-won');
  });
});

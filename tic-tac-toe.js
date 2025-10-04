window.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const squares = board.querySelectorAll('div');
  let currentPlayer = 'X';
  const gameState = Array(9).fill(null);

  squares.forEach((square, index) => {
    square.classList.add('square');

square.addEventListener('click', () => {
  if (!gameState[index]) {
    gameState[index] = currentPlayer;
    square.textContent = currentPlayer;
    square.classList.add(currentPlayer);
    if (!checkWinner()) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
});

    const statusDiv = document.getElementById('status');

function checkWinner() {
  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      statusDiv.textContent = `Congratulations! ${gameState[a]} is the Winner!`;
      statusDiv.classList.add('you-won');
      return true;
    }
  }
  return false;
}

    
    square.addEventListener('mouseover', () => {
  square.classList.add('hover');
});
square.addEventListener('mouseout', () => {
  square.classList.remove('hover');
});

  });
});

// eslint-disable-next-line no-undef
const socket = io();

const colCount = 7;
const rowCount = 6;
let turn = 1;

// create and initialize the board
const board = new Array(colCount);
for (let i = 0; i < colCount; i += 1) {
  board[i] = new Array(rowCount);
  board[i].fill(0);
}

function createChecker(player) {
  const checker = document.createElement('div');
  const colorClass = player === 1 ? 'p1-color' : 'p2-color';
  checker.classList.add('checker', 'rounded-circle', colorClass);
  return checker;
}

function addChecker(checker, colNumber) {
  // find a free cell
  const freeCellIndex = board[colNumber].findIndex((e) => e === 0);
  if (freeCellIndex === -1) {
    return false;
  }
  // mark the cell as filled
  board[colNumber][freeCellIndex] = 1;
  // fill the cell
  const column = document.getElementById(`col-no-${colNumber}`);
  const freeCell = column.children[rowCount - freeCellIndex - 1];
  freeCell.appendChild(checker);
  return true;
}

const columns = document.getElementsByClassName('column');

Array.from(columns).forEach((col) => {
  const colNumber = Number(col.id.at(7));
  col.addEventListener('click', () => {
    if (turn === 1) {
      turn = 2;
      socket.emit('play', colNumber, (response) => {
        const { aiMove, error } = response;
        if (error) {
          return;
        }
        const checker = createChecker(2);
        addChecker(checker, aiMove);
        turn = 1;
      });
      const checker = createChecker(1);
      addChecker(checker, colNumber);
    }
  });
});

socket.on('game over', (winner) => {
  turn = -1;
  console.log('game over, winner: ', winner);
  const modal = document.getElementById('game-over-modal');
  const dialog = document.getElementById('modal-text');
  dialog.innerHTML = `${winner === 1 ? 'You' : 'AI'} Won The Game!`;
  // eslint-disable-next-line no-undef
  const myModal = new bootstrap.Modal(modal);
  myModal.show();
});

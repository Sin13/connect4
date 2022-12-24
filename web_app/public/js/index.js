// eslint-disable-next-line no-undef
const socket = io();

const colCount = 7;
const rowCount = 6;

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
  // const colNumber = Number(column.id.at(7));
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
    socket.emit('play', colNumber, (response) => {
      const { aiMove } = response;
      const checker = createChecker(2);
      addChecker(checker, aiMove);
    });
    const checker = createChecker(1);
    addChecker(checker, colNumber);
  });
});

socket.on('game over', (winner) => {
  console.log('game over, winner: ', winner);
});

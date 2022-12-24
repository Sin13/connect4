const colCount = 7;
const rowCount = 6;
// handling this in client side may allow cheating. TODO: handle this on server side.
let isHumanTurn = true;

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
    if (isHumanTurn) {
      isHumanTurn = false;
      socket.emit('human play', colNumber);
      const checker = createChecker(1);
      addChecker(checker, colNumber);
    }
  });
});

console.log('csid: ', socket.id);

socket.on('ai play', (aiMove) => {
  console.log('received aiMove: ', aiMove);
  isHumanTurn = true;
  // place ai's checker
  const checker = createChecker(2);
  addChecker(checker, aiMove);
});

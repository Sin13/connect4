const colCount = 7;
const rowCount = 6;

// create and initialize the board
const board = new Array(colCount);
for (let i = 0; i < colCount; i += 1) {
  board[i] = new Array(rowCount);
  board[i].fill(0);
}

function createChecker() {
  const checker = document.createElement('div');
  checker.classList.add('checker', 'rounded-circle');
  return checker;
}

function addChecker(column) {
  // find a free cell
  const colNumber = Number(column.id.at(7));
  const freeCellIndex = board[colNumber].findIndex((e) => e === 0);
  if (freeCellIndex === -1) {
    return false;
  }
  // mark the cell as filled
  board[colNumber][freeCellIndex] = 1;
  // fill the cell
  const checker = createChecker();
  const freeCell = column.children[rowCount - freeCellIndex - 1];
  freeCell.appendChild(checker);
  return true;
}

const columns = document.getElementsByClassName('column');

Array.from(columns).forEach((col) => {
  col.addEventListener('click', () => {
    addChecker(col);
  });
});

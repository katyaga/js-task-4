const chessboard = document.querySelector('.main');
const moves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];

// eslint-disable-next-line no-use-before-define
createChessCells();

chessboard.onclick = function (event) {
  const { target } = event;
  document.querySelectorAll('.cell').forEach((element) => {
    element.classList.remove('blue');
    element.classList.remove('green');
  });
  // eslint-disable-next-line no-use-before-define
  showPossibleMoves(target);
};

function createChessCells() {
  // создание доски из строк и ячеек
  for (let i = 0; i < 10; i += 1) {
    const elementString = document.createElement('div');
    elementString.classList.add('row');
    chessboard.appendChild(elementString);
    for (let j = 0; j < 10; j += 1) {
      const elementColumn = document.createElement('div');
      elementColumn.classList.add('cell');
      elementString.appendChild(elementColumn);
    }
  }

  const rows = document.querySelectorAll('.row');

  // раскраска ячеек на чёрные-белые
  for (let i = 1; i < 9; i += 1) {
    const cells = rows[i].querySelectorAll('.cell');
    let black = i % 2 === 0;
    for (let j = 1; j < 9; j += 1) {
      if (black) {
        cells[j].classList.add('black');
      }
      black = !black;
    }
  }

  // нумерация строк от A до H
  const bottomRow = rows[9].querySelectorAll('.cell');
  const topRow = rows[0].querySelectorAll('.cell');
  for (let i = 1; i < 9; i += 1) {
    bottomRow[i].textContent = String.fromCharCode(64 + i);
    topRow[i].textContent = String.fromCharCode(64 + i);
  }

  // нумерация столбцов от 1 до 8
  const leftColumn = document.querySelectorAll('.row .cell:first-child');
  const rightColumn = document.querySelectorAll('.row .cell:last-child');
  for (let i = 8; i > 0; i -= 1) {
    leftColumn[i].textContent = 9 - i;
    rightColumn[i].textContent = 9 - i;
  }
}

function showPossibleMoves(target) {
  const clickedCell = target.parentNode;
  const clickedRow = clickedCell.parentNode;
  const indexX = Array.prototype.indexOf.call(clickedRow.children, clickedCell);
  const indexY = Array.prototype.indexOf.call(clickedCell.children, target);
  const rows = document.querySelectorAll('.row');

  // Нажали на чёрно-белую ячейку (не крайнюю с наименованием поля)
  if (indexX > 0 && indexX < 9 && indexY > 0 && indexY < 9) {
    target.classList.add('blue');
    const possibleCoordinates = [];

    for (let i = 0; i < moves.length; i += 1) {
      const possibleCoordinate = [];

      // Координаты ячеек после хода
      const x = moves[i][0] + indexX;
      const y = moves[i][1] + indexY;

      // Проверка на то, что фигура не вышла за пределы поля
      if (x >= 1 && x <= 8 && y >= 1 && y <= 8) {
        possibleCoordinate.push(x, y);
      }

      if (possibleCoordinate.length > 0) {
        possibleCoordinates.push(possibleCoordinate);
      }
    }

    // Окрасить возможные варианты ходов в зелёный
    possibleCoordinates.forEach((element) => {
      const possibleX = rows[element[0]];
      const possibleY = possibleX.childNodes[element[1]];
      possibleY.classList.add('green');
    });
  }
}

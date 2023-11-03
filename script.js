var board_state = [
  [9, 11, 10, 8, 7, 10, 11, 9],
  [12, 12, 12, 12, 12, 12, 12, 12],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [6, 6, 6, 6, 6, 6, 6, 6],
  [3, 5, 4, 2, 1, 4, 5, 3]
];
var prev_state = board_state
const chessboard = document.getElementById('chessboard');

var TURN = 1
//TURN 1 means white, TURN 0 means black
const chars = {
  'a': 0,
  'b': 1,
  'c': 2,
  'd': 3,
  'e': 4,
  'f': 5,
  'g': 6,
  'h': 7
};

const nums = {
  0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
  4: 'e',
  5: 'f',
  6: 'g',
  7: 'h'
}


//Functions!
function intToChar(int) {
  const code = 'a'.charCodeAt(0);
  return String.fromCharCode(code + int);
}

function draw(){
  var cur = 0
  for (let row = 0; row < 8; row++) {
    //Number notation
    let square = document.createElement('div'), note = document.createElement('div');
    note.style.padding = '15px', square.className = 'notation'
    square.appendChild(note), note.textContent = String(8 - row), chessboard.appendChild(square), note.style.fontSize = '25px'

    for (let col = 0; col < 8; col++) {
        let rowClass = (row % 2 === col % 2) ? 'even' : 'odd';
        let square = document.createElement('div');
        square.className = 'square ' + rowClass;

        if (board_state[row][col] !== 0) {
          let piece = document.createElement("img");
          piece.className = 'piece';
          piece.width = 70;
          piece.height = 70;
          piece.src = getPieceSymbol(board_state[row][col]);
          square.appendChild(piece);
        }
  
        chessboard.appendChild(square);
    }
  }

  for (let col = 0; col < 9; col++){
    let square = document.createElement('div'), notes = document.createElement('div')
    notes.style.fontSize = '25px', notes.style.textAlign = 'center', square.className = 'notation'
    
    if (col != 0){
      notes.textContent = intToChar(cur - 1)
    }
    ++cur;
    square.appendChild(notes)
    chessboard.appendChild(square);
  }
}
draw() //Draw the board

function Eraser(){
  document.querySelectorAll('.notation').forEach(e => e.remove());
  document.querySelectorAll('.square').forEach(e => e.remove());
  document.querySelectorAll('.square.even').forEach(e => e.remove());
  document.querySelectorAll('.square.odd').forEach(e => e.remove());
}

function getPieceSymbol(pieceCode) {
  // Replace this function with your logic to map piece codes to their symbols
  const pieceSymbols = {
    1: 'pieces/whiteking.png', // White King
    2: 'pieces/whitequeen.png', // White Queen
    3: 'pieces/whiterook.png', // White Rook
    4: 'pieces/whitebishop.png', // White Bishop
    5: 'pieces/whiteknight.png', // White Knight
    6: 'pieces/whitepawn.png', // White Pawn
    7: 'pieces/blackking.png', // Black King
    8: 'pieces/blackqueen.png', // Black Queen
    9: 'pieces/blackrook.png', // Black Rook
    10: 'pieces/blackbishop.png', // Black Bishop
    11: 'pieces/blackknight.png', // Black Knight
    12: 'pieces/blackpawn.png'  // Black Pawn
  };

  return pieceSymbols[pieceCode] || '';
}

function Destroy(){
  for (let r = 0; r<8; ++r){
    for (let c = 0; c<8; ++c){
      board_state[r][c] = 0
    }
  }
  Eraser(), draw()
}

function inputer() {
  let s = document.getElementById("inputs").value;
  s = String(s)
  if (s.length == 4 && (s[0] == 'W' || s[0] == 'B') && 'a' <= s[2] && s[2] <= 'h' && '1' <= s[3] && s[3] <= '8'){
    black = (s[0] == 'B') ? 6 : 0
    pos = 0

    if (s[1] == 'K'){
      board_state[7 - (s[3] - '1')][chars[s[2]]] = 1 + black
    }else if (s[1] == 'Q'){
      board_state[7 - (s[3] - '1')][chars[s[2]]] = 2 + black
    }else if (s[1] == 'R'){
      board_state[7 - (s[3] - '1')][chars[s[2]]] = 3 + black
    }else if (s[1] == 'B'){
      board_state[7 - (s[3] - '1')][chars[s[2]]] = 4 + black
    }else if (s[1] == 'N'){
      board_state[7 - (s[3] - '1')][chars[s[2]]] = 5 + black
    }else if (s[1] == 'P'){
      board_state[7 - (s[3] - '1')][chars[s[2]]] = 6 + black
    }else{
      alert("Invalid Entry!")
      return
    }
    Eraser()
    draw()
  }else{
    alert("Invalid entry!")
    return
  }
}

function switcheroo(){
  //Switch whose turn it is
  TURN = 1 - TURN
  document.getElementById("turner").innerHTML  = (TURN == 1) ? "White" : "Black";
}

function getrid(){
  //erase a piece from the board
  let s = document.getElementById("erasing").value
  if (s.length == 2 && 'a' <= s[0] && s[0] <= 'h' && '1' <= s[1] && s[1] <= '9'){
    board_state[7 - (s[1] - '1')][chars[s[0]]] = 0
    Eraser(), draw()
  }else{
    alert("Invalid notation")
  }
}

function Reseter(){
  board_state = [
    [9, 11, 10, 8, 7, 10, 11, 9],
    [12, 12, 12, 12, 12, 12, 12, 12],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [6, 6, 6, 6, 6, 6, 6, 6],
    [3, 5, 4, 2, 1, 4, 5, 3]
  ];
  Eraser(), draw()
}

function validate_char(c){
  //validate that 'c' is within the range of the board

  return ('a' <= c && c <= 'h')
}

function validate_num(n){
  //validate that 'n' is within the range of the board

  return ('1' <= n && n <= '8')
}

/*
  Everything below this is the logic
*/

function check_diagonals(ii, jj, type, black){
  var inc_x, inc_y
  //1 -> pawn can reach, 2 -> bishop or queen can reach, 3 -> king can reach
  //Types of diagonals
  if (type == 1){
    inc_x = -1, inc_y = -1
  }else if (type == 2){
    inc_x = -1, inc_y = 1
  }else if (type == 3){
    inc_x = 1, inc_y = -1
  }else if (type == 4){
    inc_x = 1, inc_y = 1
  }

  for (let i = ii + inc_y, j = jj + inc_x, k = 0; 0 <= i && 0 <= j && i <= 7 && j <= 7; i += inc_y, j += inc_x, k += 1){
    if (board_state[i][j] == 6 + black){
      //attacked by black pawn
      if (k == 0 && black == 6 && (type == 1 || type == 3)){
        return 1
      }else if (k == 0 && black == 0 && (type == 2 || type == 4)){
        return 1
      }else{
        break
      }
    }else if (board_state[i][j] == 4 + black || board_state[i][j] == 2 + black){
      //attacked by black bishop or black queen
      return 2
    }else if (board_state[i][j] == 1 + black){
      if (k == 0){
        return 3
      }else{
        return 0
      }
    }else if (board_state[i][j] != 0){
      //path blocked
      break
    }
  }

  //King is safe from this diagonal!
  return 0
}

function check_straights(ii, jj, black){
  //1 -> rook can reach, 2 -> queen can reach, 3 -> king can reach, 0 -> none can reach
  for (let i = ii, j = jj, k = 0; 0 <= i && i <= 7 && 0 <= j && j <= 7; ++i, ++k){
    if (board_state[i][j] == 3 + black){
      return 1
    }else if (board_state[i][j] == 2 + black){
      return 2
    }else if (board_state[i][j] == 1 + black){
      if (k == 0){
        return 3
      }else{
        break
      }
    }else if (board_state[i][j] != 0 && board_state[i][j] != 1 + (6 - black)){
      break
    }
  }for (let i = ii, j = jj, k = 0; 0 <= i && i <= 7 && 0 <= j && j <= 7; --i, ++k){
    if (board_state[i][j] == 3 + black){
      return 1
    }else if (board_state[i][j] == 2 + black){
      return 2
    }else if (board_state[i][j] == 1 + black){
      if (k == 1){
        return 3
      }else{
        break
      }
    }else if (board_state[i][j] != 0 && board_state[i][j] != 1 + (6 - black)){
      break
    }
  }for (let i = ii, j = jj, k = 0; 0 <= i && i <= 7 && 0 <= j && j <= 7; ++j, ++k){
    if (board_state[i][j] == 3 + black){
      return 1
    }else if (board_state[i][j] == 2 + black){
      return 2
    }else if (board_state[i][j] == 1 + black){
      if (k == 1){
        return 3
      }else{
        break
      }
    }else if (board_state[i][j] != 0 && board_state[i][j] != 1 + (6 - black)){
      break
    }
  }for (let i = ii, j = jj, k = 0; 0 <= i && i <= 7 && 0 <= j && j <= 7; --j, ++k){
    if (board_state[i][j] == 3 + black){
      return 1
    }else if (board_state[i][j] == 2 + black){
      return 2
    }else if (board_state[i][j] == 1 + black){
      if (k == 1){
        return 3
      }else{
        break
      }
    }else if (board_state[i][j] != 0 && board_state[i][j] != 1 + (6 - black)){
      break
    }
  }

  return 0
}

function check_knights(ii, jj, black){
  //0 -> knight with colour black cannot reach, 1 -> knight with colour black can reach

  if (0 <= ii - 2 && jj + 1 <= 7 && board_state[ii - 2][jj + 1] == 5 + black){
    return 1
  }if (7 >= ii + 2 && jj + 1 <= 7 && board_state[ii + 2][jj + 1] == 5 + black){
    return 1
  }if (0 <= ii - 1 && jj + 2 <= 7 && board_state[ii - 1][jj + 2] == 5 + black){
    return 1
  }if (7 >= ii + 1 && jj + 2 <= 7 && board_state[ii + 1][jj + 2] == 5 + black){
    return 1
  }if (0 <= ii - 1 && jj - 2 >= 0 && board_state[ii - 1][jj - 2] == 5 + black){
    return 1
  }if (0 <= ii - 2 && jj - 1 >= 0 && board_state[ii - 2][jj - 1] == 5 + black){
    return 1
  }if (7 >= ii + 2 && jj - 1 >= 0 && board_state[ii + 2][jj - 1] == 5 + black){
    return 1
  }if (7 >= ii + 1 && jj - 2 >= 0 && board_state[ii + 1][jj - 2] == 5 + black){
    return 1
  }
  return 0
}

function pawn_move(pos_y, pos_x){
  //Return -2 if its an illegal move, -1 if the king would be under attack, 1 if the move is valid
  if (TURN == 1){
    //White pawn moves up
    if (pos_y + 1 <= 7 && board_state[pos_y + 1][pos_x] == 6 && board_state[pos_y][pos_x] == 0){
      if (king_safe(pos_y + 1, pos_x, pos_y, pos_x, 6) != 0){
        alert("King is under attack if the pawn moves!")
        return -1
      }
    }else if (pos_y + 2 <= 7 && board_state[pos_y + 2][pos_x] == 6 && board_state[pos_y + 1][pos_x] == 0 && board_state[pos_y][pos_x] == 0 && pos_y == 4){
      //Pawn jump two squares
      if (king_safe(pos_y + 2, pos_x, pos_y, pos_x, 6) != 0){
        alert("King is under attack if the pawn moves!")
        return -1
      }
    }else{
      //Pawn is not there
      alert("Invalid Move")
      return -2
    }
  }else{
    //Black pawn moves up
    if (pos_y - 1 >= 0 && board_state[pos_y - 1][pos_x] == 12 && board_state[pos_y][pos_x] == 0){
      if (king_safe(pos_y - 1, pos_x, pos_y, pos_x, 12) != 0){
        alert("King is under attack if the pawn moves!")
        return -1
      }
    }else if (pos_y - 2 >= 0 && board_state[pos_y - 2][pos_x] == 12 && board_state[pos_y - 1][pos_x] == 0 && board_state[pos_y][pos_x] == 0 && pos_y == 3){
      //Pawn jump two squares
      if (king_safe(pos_y - 2, pos_x, pos_y, pos_x, 12) != 0){
        alert("King is under attack if the pawn moves!")
        return -1
      }
    }else{
      //Pawn is not there
      alert("Invalid Move")
      return -2
    }
  }
  return 1
}

function king_castle(){
  //return -2 if invalid move, -1 if king would be under attack, 1 if the move is valid
  if (TURN == 1){
    //White king castle
    if (board_state[7][4] == 1 && board_state[7][5] == 0 && board_state[7][6] == 0 && board_state[7][7] == 3){
      board_state[7][5] = 1, board_state[7][4] = 0
      if (check_king(0) != 0){
        board_state[7][5] = 0, board_state[7][4] = 1
        alert("King is under attack!")
        return -1
      }

      board_state[7][5] = 3, board_state[7][6] = 1, board_state[7][7] = 0
      if(check_king(0) != 0){
        board_state[7][4] = 1, board_state[7][5] = 0, board_state[7][6] = 0, board_state[7][7] = 3
        alert("King is under attack!")
        return -1
      }
      Eraser(), draw()
    }else{
      alert("Invalid move")
      return -2
    }
  }else{
    //White king castle
    if (board_state[0][4] == 7 && board_state[0][5] == 0 && board_state[0][6] == 0 && board_state[0][7] == 9){
      board_state[0][5] = 7, board_state[0][4] = 0
      if (check_king(1) != 0){
        board_state[0][5] = 0, board_state[0][4] = 7
        alert("King is under attack!")
        return -1
      }

      board_state[0][5] = 9, board_state[0][6] = 7, board_state[0][7] = 0
      if(check_king(1) != 0){
        board_state[0][4] = 7, board_state[0][5] = 0, board_state[0][6] = 0, board_state[0][7] = 9
        alert("King is under attack!")
        return -1
      }
      Eraser(), draw()
    }else{
      alert("Invalid move")
      return -2
    }
  }
  return 1
}

function queen_castle(){
  //return -2 if invalid move, -1 if king would be under attack, 1 if the move is valid
  if (TURN == 1){
    //White's turn
    if (board_state[7][0] == 3 && board_state[7][1] == 0 && board_state[7][2] == 0 && board_state[7][3] == 0 && board_state[7][4] == 1){
      board_state[7][3] = 1, board_state[7][4] = 0
      if (check_king(0) != 0){
        //One of the squares don't work
        board_state[7][3] = 0, board_state[7][4] = 1
        alert("King would be attacked")
        return -1
      }

      board_state[7][3] = 0, board_state[7][2] = 1
      if (check_king(0) != 0){
        //One of the squares don't work
        board_state[7][3] = 0, board_state[7][4] = 1
        alert("King would be attacked")
        return -1
      }

      board_state[7][3] = 3, board_state[7][0] = 0
      Eraser(), draw()
      return 1
    }else{
      alert("King cannot castle")
      return -2
    }
  }else{
    //Black turn
    if (board_state[0][0] == 9 && board_state[0][1] == 0 && board_state[0][2] == 0 && board_state[0][3] == 0 && board_state[0][4] == 7){
      board_state[0][3] = 7, board_state[0][4] = 0
      if (check_king(1) != 0){
        //One of the squares don't work
        board_state[0][3] = 0, board_state[0][4] = 7
        alert("King would be attacked")
        return -1
      }

      board_state[0][3] = 0, board_state[0][2] = 7
      if (check_king(1) != 0){
        //One of the squares don't work
        board_state[0][3] = 0, board_state[0][4] = 7
        alert("King would be attacked")
        return -1
      }

      board_state[0][3] = 9, board_state[0][0] = 0
      Eraser(), draw()
      return 1
    }else{
      alert("King cannot castle")
      return -2
    }
  }
}

//Finding the position of certain pieces
function knight_position(ii, jj, black){
  //Return the position of the knight with the color black 

  //Search for black if black == 1
  black *= 6

  if (board_state[ii][jj] != 0 && ((black == 6 && board_state[ii][jj] > 6) || (black == 0 && board_state[ii][jj] <= 6))){
    //Checking if knight is attacking ally piece
    return [-2, -2]
  }

  if (0 <= ii - 2 && jj + 1 <= 7 && board_state[ii - 2][jj + 1] == 5 + black){
    return [ii - 2, jj + 1]
  }if (7 >= ii + 2 && jj + 1 <= 7 && board_state[ii + 2][jj + 1] == 5 + black){
    return [ii + 2, jj + 1]
  }if (0 <= ii - 1 && jj + 2 <= 7 && board_state[ii - 1][jj + 2] == 5 + black){
    return [ii - 1, jj + 2]
  }if (7 >= ii + 1 && jj + 2 <= 7 && board_state[ii + 1][jj + 2] == 5 + black){
    return [ii + 1, jj + 2]
  }if (0 <= ii - 1 && jj - 2 >= 0 && board_state[ii - 1][jj - 2] == 5 + black){
    return [ii - 1, jj - 2]
  }if (0 <= ii - 2 && jj - 1 >= 0 && board_state[ii - 2][jj - 1] == 5 + black){
    return [ii - 2, jj - 1]
  }if (7 >= ii + 2 && jj - 1 >= 0 && board_state[ii + 2][jj - 1] == 5 + black){
    return [ii + 2, jj - 1]
  }if (7 >= ii + 1 && jj - 2 >= 0 && board_state[ii + 1][jj - 2] == 5 + black){
    return [ii + 1, jj - 2]
  }
  return [-1, -1]
}

function bishop_position(ii, jj, black){
  //Return the position of the bishop with the color black 

  //Search for black if bishop == 1
  black *= 6

  if (board_state[ii][jj] != 0 && ((black == 6 && board_state[ii][jj] > 6) || (black == 0 && board_state[ii][jj] <= 6))){
    //Checking if bishop is attacking ally piece
    return [-2, -2]
  }
  
  let inc_x, inc_y
  let lst = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
  for (let tmp = 0; tmp<4; ++tmp){
    inc_x = lst[tmp][0], inc_y = lst[tmp][1]
    for (let i = ii + inc_y, j = jj + inc_x; 0 <= i && 0 <= j && i <= 7 && j <= 7; i += inc_y, j += inc_x){
      if (board_state[i][j] == 4 + black){
        return [i, j]
      }else if (board_state[i][j] != 0){
        break
      }
    }
  }

  return [-1, -1]
}

function king_position(ii, jj, black){
  //return the position of the king that can go to this square
  black *= 6
  if (board_state[ii][jj] != 0 && ((black == 6 && board_state[ii][jj] > 6) || (black == 0 && board_state[ii][jj] <= 6))){
    //Checking if king is attacking ally piece
    return [-2, -2]
  }

  if (0 <= ii - 1 && board_state[ii - 1][jj] == 1 + black){
    return [ii - 1, jj]
  }else if (0 <= jj - 1 && board_state[ii][jj - 1] == 1 + black){
    return [ii, jj - 1]
  }else if (0 <= ii - 1 && 0 <= jj - 1 && board_state[ii - 1][jj - 1] == 1 + black){
    return [ii - 1, jj - 1]
  }else if (ii + 1 <= 7 && board_state[ii + 1][jj] == 1 + black){
    return [ii + 1, jj]
  }else if (jj + 1 <= 7 && board_state[ii][jj + 1] == 1 + black){
    return [ii, jj + 1]
  }else if (ii + 1 <= 7 && jj + 1 <= 7 && board_state[ii + 1][jj + 1] == 1 + black){
    return [ii + 1, jj + 1]
  }else if (ii + 1 <= 7 && jj - 1 >= 0 && board_state[ii + 1][jj - 1] == 1 + black){
    return [ii + 1, jj - 1]
  }else if (ii - 1 >= 0 && jj + 1 <= 7 && board_state[ii - 1][jj + 1] == 1 + black){
    return [ii - 1, jj + 1]
  }


  return [-1, -1]
}

function rook_position(ii, jj, black){
  //Find the position of the rook that can come to this square
  black *= 6
  if (board_state[ii][jj] != 0 && ((black == 6 && board_state[ii][jj] > 6) || (black == 0 && board_state[ii][jj] <= 6))){
    //Checking if rook is attacking ally piece
    return [-2, -2]
  }

  //Small list for increments
  let tmp = [-1, 1]

  for (let inc = 0; inc < 2; ++inc){
    let nw = tmp[inc]
    //Vertical
    for (let i = ii + nw; 0 <= i && i <= 7; i += nw){
      if (board_state[i][jj] == 3 + black){
        return [i, jj]
      }else if (board_state[i][jj] != 0){
        break
      }
    }
    //Horizontal
    for (let j = jj + nw; 0 <= j && j <= 7; j += nw){
      if (board_state[ii][j] == 3 + black){
        return [ii, j]
      }else if (board_state[ii][j] != 0){
        break
      }
    }
  }
  return [-1, -1]
}

function queen_position(ii, jj, black){
  //Find the position of the queen that can come to this square
  black *= 6
  if (board_state[ii][jj] != 0 && ((black == 6 && board_state[ii][jj] > 6) || (black == 0 && board_state[ii][jj] <= 6))){
    //Checking if queen is attacking ally piece
    return [-2, -2]
  }

  let inc_x, inc_y
  let lst = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
  for (let tmp = 0; tmp<4; ++tmp){
    inc_x = lst[tmp][0], inc_y = lst[tmp][1]
    for (let i = ii + inc_y, j = jj + inc_x; 0 <= i && 0 <= j && i <= 7 && j <= 7; i += inc_y, j += inc_x){
      if (board_state[i][j] == 2 + black){
        return [i, j]
      }else if (board_state[i][j] != 0){
        break
      }
    }
  }

  for (let inc = 0; inc < 2; ++inc){
    let nw = lst[inc][1]
    //Vertical
    for (let i = ii + nw; 0 <= i && i <= 7; i += nw){
      if (board_state[i][jj] == 2 + black){
        return [i, jj]
      }else if (board_state[i][jj] != 0){
        break
      }
    }
    //Horizontal
    for (let j = jj + nw; 0 <= j && j <= 7; j += nw){
      if (board_state[ii][j] == 2 + black){
        return [ii, j]
      }else if (board_state[ii][jj] != 0){
        break
      }
    }
  }
  return [-1, -1]
}

function check_king(black){
  /*
  Checks the black king if black == 1 
  
  Checks the white king if black == 0

  Outputs:
  1 means king is attacked
  0 means king is safe
  -1 means colour king does not exist
  -2 means there are multiple of the same kind of kings
  */

  pos_x = -1, pos_y = -1;
  for (let i = 0; i<8; ++i){
    for (let j = 0; j<8; ++j){
      if (board_state[i][j] == 1 + (6 * black)){
        if (pos_x != -1 && pos_y != -1){
          return -2
        }else{
          pos_x = j, pos_y = i
        }
      }
    }
  }

  if (pos_x == -1 && pos_y == -1){
    return -1
  }

  //black in function means that you are looking for the enemy black pieces
  if (check_diagonals(pos_y, pos_x, 1, 6 * (1 - black)) != 0 || check_diagonals(pos_y, pos_x, 2, 6 * (1 - black)) != 0 || check_diagonals(pos_y, pos_x, 3, 6 * (1 - black)) != 0 || check_diagonals(pos_y, pos_x, 4, 6 * (1 - black)) != 0){
    //king is attacked on a diagonal!
    return 1
  }else if (check_straights(pos_y, pos_x, 6 * (1 - black)) != 0){
    return 2
  }else if (check_knights(pos_y, pos_x, 6 * (1 - black)) != 0){
    return 3
  }
  return 0;
} 

function king_safe(i1, j1, i2, j2, piece){
  //return 1 if invalid move
  board_state[i1][j1] = 0, board_state[i2][j2] = piece

  if (check_king(1 - (piece < 7)) != 0){
    board_state[i1][j1] = piece, board_state[i2][j2] = 0
    return 1
  }
  return 0
}

function knight_attack(i1, j1, i2, j2, black){
  black *= 6
  //Return 1 if the knight is valid
  if (board_state[i2][j2] != 0 && ((black == 6 && board_state[i2][j2] > 6) || (black == 0 && board_state[i2][j2] <= 6))){
    //Checking if knight is attacking ally piece
    return -2
  }

  let nw1 = i1 - i2, nw2 = j1 - j2
  if (nw1 < 0)
    nw1 *= -1
  if (nw2 < 0)
    nw2 *= -1

  if (nw1 < nw2){
    let nw3 = nw1
    nw1 = nw2, nw2 = nw3
  }
  //If the piece moves 1 and 2 tiles away, it is a valid knight move
  console.log(nw1, nw2)
  if (nw1 == 2 && nw2 == 1){
    return 1
  }else{
    return -1
  }
}

function bishop_attack(i1, j1, i2, j2, black){
  //Returns 1 if bishop can attack this piece
  black *= 6
  if (board_state[i2][j2] != 0 && ((black == 6 && board_state[i2][j2] > 6) || (black == 0 && board_state[i2][j2] <= 6))){
    //Checking if bishop is attacking ally piece
    return -2
  }
  
  let inc_x, inc_y
  let lst = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
  for (let tmp = 0; tmp<4; ++tmp){
    inc_x = lst[tmp][0], inc_y = lst[tmp][1]
    for (let i = i1 + inc_y, j = j1 + inc_x; 0 <= i && 0 <= j && i <= 7 && j <= 7; i += inc_y, j += inc_x){
      if (i == i2 && j == j2){
        return 1
      }else if (board_state[i][j] != 0){
        break
      }
    }
  }

  return -1
}

function rook_attack(i1, j1, i2, j2, black){
  black *= 6
  //Return 1 if the rook can attack
  if (board_state[i2][j2] != 0 && ((black == 6 && board_state[i2][j2] > 6) || (black == 0 && board_state[i2][j2] <= 6))){
    //Checking if rook is attacking ally piece
    return -2
  }

  //Small list for increments
  let tmp = [-1, 1]

  for (let inc = 0; inc < 2; ++inc){
    let nw = tmp[inc]
    //Vertical
    for (let i = i1 + nw; 0 <= i && i <= 7; i += nw){
      if (i == i2 && j1 == j2){
        return 1
      }else if (board_state[i][j2] != 0){
        break
      }
    }
    //Horizontal
    for (let j = j1 + nw; 0 <= j && j <= 7; j += nw){
      if (j == j2 && i1 == i2){
        return 1
      }else if (board_state[i2][j] != 0){
        break
      }
    }
  }
  return -1
}

function pawn_attack(i1, j1, i2, j2, black){
  black *= 6
  //return 1 if the pawn can attack
  if (board_state[i2][j2] != 0 && ((black == 6 && board_state[i2][j2] > 6) || (black == 0 && board_state[i2][j2] <= 6))){
    //Checking if rook is attacking ally piece
    return -2
  }

  if (black == 6 && i2 - i1 == 1 && (j2 - j1 == 1 || j1 - j2 == 1)){
    //This is black pawn
    return 1
  }else if (black == 0 && i1 - i2 == 1 && (j2 - j1 == 1 || j1 - j2 == 1)){
    //This is white pawn
    return 1
  }

  return -1
}

function waitingKeypress() {
  return new Promise((resolve) => {
    document.addEventListener('keydown', onKeyHandler);
    function onKeyHandler(e) {
      if (e.keyCode === 39) {
        document.removeEventListener('keydown', onKeyHandler);
        resolve();
      }
    }
  });
}

async function mover(){
  let s = document.getElementById("moving").value
  s += " "
  let cur = ""
  //Turn 1 means white turn
  for (let i = 0; i<s.length; ++i){
    //Waiting for the arrow keys

    if (s[i] == ' '){
      await waitingKeypress()
      if (cur.length == 2){
        //pawn move
        if (!(validate_char(cur[0]) == 1 && validate_num(cur[1]) == 1)){
          alert("Invalid notation")
          break
        }

        let pos_y = 7 - (cur[1] - '1'), pos_x = chars[cur[0]]
        //Must be a pawn move
        if (pawn_move(pos_y, pos_x) != 1){
          //Failure
          break
        }

      }else if (cur.length == 3){
        
        //King side castling and piece moving are possible, this is the edge-case
        if (cur == 'O-O'){
          if (king_castle() != 1){
            //King side castle is invalid
            break
          }
          continue
        }else if (validate_char(cur[1]) == 0 || validate_num(cur[2]) == 0){
          alert("Invalid notation")
          break
        }
        //The rest of the normal moves
        let pos_y = 7 - (cur[2] - '1'), pos_x = chars[cur[1]]
        if (cur[0] == 'N'){
          //This is knight
          const checker = knight_position(pos_y, pos_x, 1 - TURN)
          if (checker[0] == -1){
            alert("Knight cannot be found")
            break
          }else if (checker[0] == -2){
            alert("Knight cannot attack ally piece")
            break
          }
          
          if (king_safe(checker[0], checker[1], pos_y, pos_x, 5 + (6 * (1 - TURN))) != 0){
            alert("King is attacked if knight moves")
            break
          }
          
        }else if (cur[0] == 'B'){
          //This is bishop
          const checker = bishop_position(pos_y, pos_x, 1 - TURN)

          if (checker[0] == -1){
            alert("Bishop cannot be found")
            break
          }else if (checker[0] == -2){
            alert("Bishop cannot attack ally piece")
            break
          }

          if (king_safe(checker[0], checker[1], pos_y, pos_x, 4 + (6 * (1 - TURN))) != 0){
            alert("King is attacked if bishop moves")
            break
          }
        }else if (cur[0] == 'K'){
          //This is king
          const checker = king_position(pos_y, pos_x, 1 - TURN)
          if (checker[0] == -1){
            alert("King cannot be found")
            break
          }else if (checker[0] == -2){
            alert("King cannot attack ally piece")
            break
          }

          if (king_safe(checker[0], checker[1], pos_y, pos_x, 1 + (6 * (1 - TURN))) != 0){
            alert("King is attacked if he moves")
            break
          }
        }else if (cur[0] == 'R'){
          //This is rook
          const checker = rook_position(pos_y, pos_x, 1 - TURN)
          if (checker[0] == -1){
            alert("Rook cannot be found")
            break
          }else if (checker[0] == -2){
            alert("Rook cannot attack ally piece")
            break
          }

          if (king_safe(checker[0], checker[1], pos_y, pos_x, 3 + (6 * (1 - TURN))) != 0){
            alert("King is attacked if Rook moves")
            break
          }
        }else if (cur[0] == 'Q'){
          //This is queen
          const checker = queen_position(pos_y, pos_x, 1 - TURN)
          if (checker[0] == -1){
            alert("Queen cannot be found")
            break
          }else if (checker[0] == -2){
            alert("Queen cannot attack ally piece")
            break
          }

          if (king_safe(checker[0], checker[1], pos_y, pos_x, 2 + (6 * (1 - TURN))) != 0){
            alert("King is attacked if Queen moves")
            break
          }
        }else if (validate_char(cur[0]) == 1){
          col = chars[cur[0]], pos_y = 7 - (cur[2] - '1'), pos_x = chars[cur[1]]
          let found = 0
          for (let i = 0; i<8; ++i){
            if (board_state[i][col] == 6 + (1 - TURN) * 6){
              //Found a potential pawn
              if (pawn_attack(i, col, pos_y, pos_x, 1 - TURN) == 1 && king_safe(i, col, pos_y, pos_x, 6 + (6 * (1 - TURN))) == 0){
                //Pawn works!
                found = 1
                break
              }
            }
          }

          if (found == 0){
            //We couldn't find a pawn
            alert("Pawn not found or invalid pawn move")
            break
          }
        }
      }else if (cur.length == 4){
        //Piece name followed by row, then new square. For example: Nbd3
        if (validate_char(cur[1]) == 0 || validate_char(cur[2]) == 0 || validate_num(cur[3]) == 0){
          alert("Invalid notation")
          break
        }
        col = chars[cur[1]], pos_y = 7 - (cur[3] - '1'), pos_x = chars[cur[2]]
        if (cur[0] == 'N'){
          let found = 0
          for (let i = 0; i<8; ++i){
            if (board_state[i][col] == 5 + (1 - TURN) * 6){
              //Found a Knight piece
              if (knight_attack(i, col, pos_y, pos_x, 1 - TURN) == 1 && king_safe(i, col, pos_y, pos_x, 5 + (6 * (1 - TURN))) == 0){
                //Knight works!
                found = 1
                break
              }
            }
          }

          if (found == 0){
            //We couldn't find a knight
            alert("Knight not found or invalid knight move")
            break
          }
        }else if (cur[0] == 'B'){
          let found = 0
          for (let i = 0; i<8; ++i){
            if (board_state[i][col] == 4 + (1 - TURN) * 6){
              //Found a Bishop piece
              if (bishop_attack(i, col, pos_y, pos_x, 1 - TURN) == 1 && king_safe(i, col, pos_y, pos_x, 4 + (6 * (1 - TURN))) == 0){
                //Bishop works!
                found = 1
                break
              }
            }
          }

          if (found == 0){
            //We couldn't find a bishop
            alert("Bishop not found or invalid Bishop move")
            break
          }
        }else if (cur[0] == 'R'){
          let found = 0
          for (let i = 0; i<8; ++i){
            if (board_state[i][col] == 3 + (1 - TURN) * 6){
              //Found a Rook piece
              if (rook_attack(i, col, pos_y, pos_x, 1 - TURN) == 1 && king_safe(i, col, pos_y, pos_x, 3 + (6 * (1 - TURN))) == 0){
                //Rook works!
                found = 1
                break
              }
            }
          }
          if (found == 0){
            //We couldn't find a Rook
            alert("Rook not found or invalid Rook move")
            break
          }
        }else if (cur[0] == 'Q'){
          let found = 0
          for (let i = 0; i<8; ++i){
            if (board_state[i][col] == 2 + (1 - TURN) * 6){
              //Since a queen is a rook and a bishop, you can check if it fulfills one of the two conditions
              if ((rook_attack(i, col, pos_y, pos_x, 1 - TURN) == 1 || bishop_attack(i, col, pos_y, pos_x, 1 - TURN) == 1) && king_safe(i, col, pos_y, pos_x, 2 + (6 * (1 - TURN))) == 0){
                //Queen works!
                found = 1
                break
              }
            }
          }
          if (found == 0){
            //We couldn't find a Queen
            alert("Queen not found or invalid Queen move")
            break
          }
        }//King and pawn are not necessary, there will always be one king
      }else if (cur.length == 5){
        //piece name followed by current square, then new square, ex: Nf3d4
        if (cur == "O-O-O"){
          //Queen side castling
          if (queen_castle() != 1){
            break
          }
          continue
        }else if (validate_char(cur[1]) == 0 || validate_num(cur[2]) == 0 || validate_char(cur[3]) == 0 || validate_num(cur[4]) == 0){
          alert("Invalid notation")
          break
        }

        col = chars[cur[1]], row = 7 - (cur[2] - '1'), pos_y = 7 - (cur[4] - '1'), pos_x = chars[cur[3]]
        if (cur[0] == 'N'){
          if (board_state[row][col] == 5 + (6 * (1 - TURN)) && knight_attack(row, col, pos_y, pos_x, 1 - TURN) == 1 && king_safe(row, col, pos_y, pos_x, 5 + (6 * (1 - TURN))) == 0){
            //Success!
          }else{
            alert("Knight not found or invalid knight move")
            break
          }
        }else if (cur[0] == 'B'){
          if (board_state[row][col] == 4 + (6 * (1 - TURN)) && bishop_attack(row, col, pos_y, pos_x, 1 - TURN) == 1 && king_safe(row, col, pos_y, pos_x, 4 + (6 * (1 - TURN))) == 0){
            //Success!
          }else{
            alert("Bishop not found or invalid bishop move")
            break
          }
        }else if (cur[0] == 'R'){
          if (board_state[row][col] == 3 + (6 * (1 - TURN)) && rook_attack(row, col, pos_y, pos_x, 1 - TURN) == 1 && king_safe(row, col, pos_y, pos_x, 3 + (6 * (1 - TURN))) == 0){
            //Success!
          }else{
            alert("Rook not found or invalid rook move")
            break            
          }
        }else if (cur[0] == 'Q'){
          if (board_state[row][col] == 2 + (6 * (1 - TURN)) && (rook_attack(row, col, pos_y, pos_x, 1 - TURN) == 1 || bishop_attack(row, col, pos_y, pos_x, 1 - TURN) == 1) && king_safe(row, col, pos_y, pos_x, 2 + (6 * (1 - TURN))) == 0){
            //Success
          }else{
            alert("Queen not found or invalid queen move")
          }
        }else{
          alert("Invalid 5 character entry")
        }
      }

      //Debugging console.log(board_state)
      switcheroo()
      Eraser(), draw()
      //Switch the turns
      cur = ""
    }else{
      if (s[i] != 'x' && s[i] != '+' && s[i] != '#'){
        cur += s[i];
      }
    }
  }
}
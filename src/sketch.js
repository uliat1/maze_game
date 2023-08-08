let cols, rows;
let w = 75; //размер ячейки в пикселях
let grid = []; 
let current1; //бегает
let current; //текущая яячейка
let finish;
let life=5;
let stack = []; //history 
let indexDraw = 0;




function setup() {  
  createCanvas(600, 600);
  cols = Math.floor(width / w);
  rows = Math.floor(height / w);
  frameRate(120); //спид частота кадра....

  for (let j = 0; j < rows; j++) {  //создаем объекты ячеек и сохр в грид
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j); 
      grid.push(cell);
    }
  }
 
  current = grid[0]; //нач поз трактора в левом верхнем углу
  finish = grid[grid.length-1]; 
  current1=grid[0]; 
  
  
}

function draw() {
  console.log(indexDraw++);
  background(51);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
    
  }

  current.visited = true;
  current.highlight();
  current1.highlight1();
  finish.highlight();
  // STEP 1
  let next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    // STEP 2
    stack.push(current); //отметить текущую ячейку как посещенную

    // STEP 3
    removeWalls(current, next);

    // STEP 4
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop(); //pop - dostat sverhy 
    
  }
  
  
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}


function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}


function keyboardClick(event) {
i1 = current1.i;
j1 =current1.j;
    
  let top = grid[index(i1, j1 - 1)];
  let right = grid[index(i1 + 1, j1)];
  let bottom = grid[index(i1, j1 + 1)];
  let left = grid[index(i1 - 1, j1)];
  switch (event.key) {
    case 'w':
    case 'ц':
      game(0, top);
    break
        
    case 'a':
    case 'ф':
      game(3, left);
      break
    
    case 'd':
    case 'в':
      game(1, right);
    break
    case 's':
    case 'ы':
      game(2, bottom);

    break
  
    default:
        break;
}
}

function game(wallIndex, newCurrent) {

  if (!current1.walls[wallIndex]){
    current1=newCurrent;
  current1.highlight1(); 
  if (isWon()){
    whenWon();
  } 
    }
  else {
    life--;
    if (isDead()) {
    whenLost();
    }
  
   }


}


function isDead() {
  if (life <= 0) {
      return true;
  } 
}

function whenLost() {
  console.log ("You lost!");
  document.removeEventListener('keydown', keyboardClick);
}

function whenWon(){
  console.log ("You Won!");
  document.removeEventListener('keydown', keyboardClick);
}

function isWon() {
  if (current1==finish) {
      return true;
  } 
}
function mazegen() {
  location.reload();
}

function clicks() {
document.addEventListener('keydown', keyboardClick);
btn = document.getElementById('gener');
btn.addEventListener('click', mazegen);


}

document.addEventListener('DOMContentLoaded', clicks);
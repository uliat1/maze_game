function Cell(i, j) { 
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true]; //вверх, право, вниз, лево
    this.visited = false; //посещали ли трактором ячейку
  
    this.checkNeighbors = function() { //4 soseda
      let neighbors = [];
  
      let top    = grid[index(i, j - 1)]; 
      let right  = grid[index(i + 1, j)];
      let bottom = grid[index(i, j + 1)];
      let left   = grid[index(i - 1, j)];
  
      if (top && !top.visited) { //если не была посещена, то добавляем в массив
        neighbors.push(top);
      }
      if (right && !right.visited) {
        neighbors.push(right);
      }
      if (bottom && !bottom.visited) {
        neighbors.push(bottom);
      }
      if (left && !left.visited) {
        neighbors.push(left);
      }
  
      if (neighbors.length > 0) { //ix vseh sosedey vybiraem 1 random  i tyda poydem
        let r = floor(random(0, neighbors.length));
        return neighbors[r];
      } else {
        return undefined;
      }}

      
    
    
  
    
    this.highlight = function() {
      let x = this.i * w;
      let y = this.j * w;
      noStroke();
      fill(0, 0, 255);
      rect(x, y, w, w);
  
    }
    this.highlight1 = function () {
      let a = this.i * w;
      let b = this.j * w;
      noStroke();
      fill(255, 0, 0);
      rect(a, b, w, w);

  };
  
    this.show = function() {
      let x = this.i * w;  
      let y = this.j * w; //x and y up left corner
      stroke(255);
      if (this.walls[0]) {
        line(x, y, x + w, y);
      }
      if (this.walls[1]) {
        line(x + w, y, x + w, y + w);
      }
      if (this.walls[2]) {
        line(x + w, y + w, x, y + w);
      }
      if (this.walls[3]) {
        line(x, y + w, x, y);
      }
  
      if (this.visited) {
        noStroke();
        fill(255, 0, 255, 100);
        rect(x, y, w, w);
      }
    }
  }


  //есть ли  утекущей ячейки соседи, которых не посещали
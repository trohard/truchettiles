var tileSize = 50;
var tiles = [];
v

function setup() {
  createCanvas(windowWidth, windowHeight);
  var index = 0;
  for (var y = 0; y < height / tileSize; y++) {
    for (var x = 0; x < width / tileSize; x++) {
      tiles[index] = new Tile(x * tileSize, y * tileSize, tileSize, index);
      println("tile "+index+": "+tiles[index].quarterTurns);
      index++;
    }
  }
}

function draw() {
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].display();
  }
}

function mouseClicked() {
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].isOver()) {
      tiles[i].turn();
      // Add these to lines to change tiles before and after:
      // if (i>0) tiles[i-1].turn();
      // if (i<tiles.length-2) tiles[i+1].turn();
      //println("tile "+i+": "+tiles[i].quarterTurns);
      return;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function Tile(x, y, size, qt) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.quarterTurns = qt%4;  //set to 0-3

  this.display = function() {
    push();
    translate(this.x + size / 2, this.y + size / 2);
    rotate(TWO_PI / 4 * this.quarterTurns);
    translate(-this.size / 2, -this.size / 2);
    fill(255);
    //noStroke();
    stroke(240);
    strokeWeight(1)
    rect(0, 0, this.size, this.size);
    stroke(0);
    //fill(81,40,136)
    strokeWeight(5)
    //triangle(0, 0, this.size, 0, 0, this.size);
    line(0,0,this.size,this.size)
    strokeWeight(1);

    if (this.isOver()) {
      fill(0, 30); //draw slight transparent rect over tile to create roll over effect
      rect(0, 0, this.size, this.size);
    }
    pop()
  }

  //Increase quarter turn by 1 up to 3 then back to 0
  this.turn = function() {
    this.quarterTurns = (this.quarterTurns + 1)%4;
  }

  this.isOver = function() {
    if (mouseX > this.x && mouseX < this.x + this.size && mouseY > this.y && mouseY < this.y + this.size) {
      return true;
    }
    return false;
  }
}

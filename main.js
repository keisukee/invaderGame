let invaders = document.getElementsByClassName('invader');

let invader1 = invaders[0];

let posY = 0;
let posX = 0;
let distance = 0;

timeout();

function timeout() {
  setTimeout(function () {
    distance += 10;
    move(distance);
    timeout();
  }, 50);
}

function move(newPosY) {
  posY = newPosY;
  document.getElementById("invader").style.left = posX;
  document.getElementById("invader").style.top  = posY;
}


let invaders = document.getElementsByClassName('invader');

// let invader1 = invaders[0];

let posY = 0;
let posX = 0;
let distance = 0;

let invader1 = document.getElementById('invader1');
let invader2 = document.getElementById('invader2');

invaderMove();

function invaderMove() {
  setTimeout(function () {
    distance += 10;
    move(invader1, distance, 0);
    move(invader2, distance, 30);
    // move('invader2', distance, 50);
    // move('invader1', distance, 0);
    // move('invader2', distance, 50);
    invaderMove();
  }, 300);
}

function bulletMove(element, d) {
  setTimeout(function () {
    d += 30;
    move(element, d, 100);
    // move('invader2', distance, 50);
    bulletMove(element, d);
  }, 1000);
}

function move(element, newPosY, newPosX) {
  posY = newPosY;
  posX = newPosX;
  element.style.left = posX;
  element.style.top  = posY;
}

function shoot(id) {
  let bullet = '<i class="fas fa-grip-lines-vertical bullets">' + '</i>';
  document.getElementById(id).insertAdjacentHTML('beforeend', bullet);
}

document.onkeydown = function (e){
	if(!e) e = window.event; // レガシー
  let key_code = e.keyCode;
  
  // スペースキーで発射
  if (key_code === 32) {
    shoot('starship');
    let bullets = document.getElementsByClassName('bullets');
    let bulletCount = bullets.length;
    console.log(bulletCount);
    let movingBullet = bullets[bulletCount - 1];
    // console.log(movingBullet);
    bulletMove(movingBullet, 10);
  }
};
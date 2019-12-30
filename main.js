let invaders = document.getElementsByClassName('invader');

let posY = 0;
let posX = 0;
let distance = 0;

let invader1 = document.getElementById('invader1');
let invader2 = document.getElementById('invader2');

invaderMove();

function invaderMove() {
  setTimeout(function () {
    distance += 10;
    move(invader1, 0, distance);
    move(invader2, 30, distance);
    invaderMove();
  }, 300);
}

function bulletMove(element, x, y) {
  setTimeout(function () {
    y -= 1;
    move(element, x, y);
    let bulletLocation = detectMomentLocation(element);
    let invaderLocation = detectMomentLocation(invader1);
    let distanceOfBulletAndInvaderX = Math.abs(bulletLocation[0] - invaderLocation[0]);
    let distanceOfBulletAndInvaderY = Math.abs(bulletLocation[1] - invaderLocation[1]);
    if (distanceOfBulletAndInvaderX < 20 && distanceOfBulletAndInvaderY < 20) {
      element.parentNode.removeChild(element);
      invader1.parentNode.removeChild(invader1);
    }
    bulletMove(element, x, y);
  }, 1);
}

// 要素を動かす
function move(element, newPosX, newPosY) {
  posY = newPosY;
  posX = newPosX;
  element.style.left = posX;
  element.style.top  = posY;
}

// 弾丸を発射
function shoot(id) {
  let bullet = '<i class="fas fa-grip-lines-vertical bullets">' + '</i>';
  document.getElementById(id).insertAdjacentHTML('beforeend', bullet);
}

document.onkeydown = function (e){
	if(!e) e = window.event; // レガシー
  let keyCode = e.keyCode;

  // console.log(keyCode);

  // スペースキー: 32, s: 83 スペースキーだと、打鍵するときに画面が動く可能性あり
  if (keyCode === 83) {
    shoot('starship');
    let bullets = document.getElementsByClassName('bullets');
    let bulletCount = bullets.length;
    let movingBullet = bullets[bulletCount - 1];
    // detectLocation(movingBullet);
    bulletMove(movingBullet, 10, 300);
  }
};

// let targetElement = document.getElementById('invader1');
// detectLocation(targetElement);
function detectLocation(targetElement) {
  setInterval( function() {
    let clientRect = targetElement.getBoundingClientRect();
  
    // 画面内の位置
    let x = clientRect.left;
    let y = clientRect.top;
  
    // ページ内の位置
    let px = window.pageXOffset + clientRect.left;
    let py = window.pageYOffset + clientRect.top;
    let location = [px, py];

    console.log('location', location);
    return location;
  }, 10);
}

function detectMomentLocation(targetElement) {
  let clientRect = targetElement.getBoundingClientRect();

  // 画面内の位置
  let x = clientRect.left;
  let y = clientRect.top;

  // ページ内の位置
  let px = window.pageXOffset + clientRect.left;
  let py = window.pageYOffset + clientRect.top;
  let location = [px, py];
  console.log('targetElement', targetElement);
  console.log('location', location);
  return location;
}
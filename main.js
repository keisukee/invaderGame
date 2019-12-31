let posY = 0;
let posX = 0;
let distance = 0;

let invader1 = document.getElementById('invader1');
let invader2 = document.getElementById('invader2');

let starship = document.getElementById('starship');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function invaderPopup() {
  let invaders = document.getElementById('invaders');
  let newInvader = document.createElement("li");
  let newInvaderImg = document.createElement("img");

  newInvaderImg.setAttribute("src", "invader.svg");
  newInvaderImg.setAttribute("class", "invader");
  newInvader.style.position = 'absolute';

  newInvader.style.top = 0;
  newInvader.style.left = getRandomInt(100) * 10;

  newInvader.appendChild(newInvaderImg);
  invaders.appendChild(newInvader);
}

function generateInvaders() {
  setTimeout(function () {
    invaderPopup();
    generateInvaders();
  }, 1000);
}

// generateInvaders();

for (let i = 0; i < 10; i++) {
  invaderPopup();
}

let invaders = document.getElementsByClassName('invader');

for (let i = 0; i < invaders.length; i++) {
  invaderMove(invaders[i].parentNode);
}

function invaderMove(element) {
  setTimeout(function () {
    distance += 1;
    move(element, element.style.left, distance);
    invaderMove(element);
  }, 1000);
}

function bulletMove(bullet, x, y) {
  setTimeout(function () {
    y -= 3;
    move(bullet, x, y);
    // let bulletLocation = detectMomentLocation(bullet);
    // let invaderLocation = detectMomentLocation(invader1);
    // let distanceOfBulletAndInvaderX = Math.abs(bulletLocation[0] - invaderLocation[0]);
    // let distanceOfBulletAndInvaderY = Math.abs(bulletLocation[1] - invaderLocation[1]);
    // if (distanceOfBulletAndInvaderX < 15 && distanceOfBulletAndInvaderY < 15) {
    //   bullet.parentNode.removeChild(bullet); // 弾丸が消滅
    //   invader1.parentNode.removeChild(invader1); // インベーダーが消滅
    // }
    bulletMove(bullet, x, y);
  }, 30);
}

function detectCollision(bullet, invader) {
  let bulletLocation = detectMomentLocation(bullet);
  let invaderLocation = detectMomentLocation(invader);
  let distanceOfBulletAndInvaderX = Math.abs(bulletLocation[0] - invaderLocation[0]);
  let distanceOfBulletAndInvaderY = Math.abs(bulletLocation[1] - invaderLocation[1]);
  // console.log('location', bulletLocation);
  if (distanceOfBulletAndInvaderX < 15 && distanceOfBulletAndInvaderY < 15) {
    // console.log('detectCollision');
    bullet.parentNode.removeChild(bullet); // 弾丸が消滅
    invader.parentNode.removeChild(invader); // インベーダーが消滅
  }
}

function autoCollisionDetection(bullet, invader) {
  setTimeout(function() {
    // console.log("hogehoge");
    detectCollision(bullet, invader);
    autoCollisionDetection(bullet, invader);
  }, 50);
}

// 要素を動かす
function move(element, newPosX, newPosY) {
  posY = newPosY;
  posX = newPosX;
  element.style.left = posX;
  element.style.top  = posY;
}

// 弾丸を発射
function shoot(insertId, uniqueId) {
  let bullet = `<i id="bullet-${uniqueId}" class="fas fa-grip-lines-vertical bullets"></i>`;
  document.getElementById(insertId).insertAdjacentHTML('afterend', bullet);
}

document.onkeydown = function (e){
	if(!e) e = window.event; // レガシー
  let keyCode = e.keyCode;

  let starshipCor = detectMomentLocation(starship);
  // console.log(keyCode);

  // スペースキー: 32, s: 83 スペースキーだと、打鍵するときに画面が動く可能性あり
  if (keyCode === 83) {
    let bullets = document.getElementsByClassName('bullets');
    let bulletCount = bullets.length;

    shoot('starship', bulletCount);
    let launchedBullet = bullets[0];

    bulletMove(launchedBullet, starshipCor[0], starshipCor[1]);

    let invaders = document.getElementsByClassName('invader');
    for (let i = 0; i < invaders.length; i++) {
      autoCollisionDetection(launchedBullet, invaders[i]);
    }
  } else if (keyCode === 37) { // ←のとき
    move(starship, starshipCor[0] - 10, starshipCor[1]);
  } else if (keyCode === 39) { // →のとき
    move(starship, starshipCor[0] + 10, starshipCor[1]);
  }
};

function detectLocation(targetElement) {
  setInterval(function() {
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
  return location;
}
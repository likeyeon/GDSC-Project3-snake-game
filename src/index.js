// 초기 설정을 세팅
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const pixelSize = 20;
const snakeBody = [];
let snakeLength = 2;

let positionX = (canvas.width - pixelSize) / 2;
let positionY = (canvas.height - pixelSize) / 2;

let directionX = 0;
let directionY = 0;

let appleX = (Math.floor(Math.random() * (canvas.width / pixelSize -1 )) + 1) * 20; 
let appleY = (Math.floor(Math.random() * (canvas.height / pixelSize -1 )) + 1) * 20; 

let score = 0;

// 점수 반영 함수
function scoring(){
  document.getElementById("score").innerHTML = `점수 : ${score}`;
}

// 사과를 생성하는 함수
function makeApple(){
  if (appleX === positionX && appleY === positionY){
    appleX = (Math.floor(Math.random() * canvas.width / pixelSize) + 1) * 20; 
    appleY = (Math.floor(Math.random() * canvas.height / pixelSize) + 1) * 20; 
    score += 1;
    snakeLength += 1;
    scoring();
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(appleX, appleY, pixelSize, pixelSize);
}

// 키보드가 눌렸을 때 일어나는 함수
function keyDownHandler(e) {
  switch(e.keyCode){
    case 37: // 왼쪽
      directionX = -10;
      directionY = 0;
      break;
    case 39: // 오른쪽
      directionX = 10;
      directionY = 0;
      break;
    case 38: // 위
      directionX = 0;
      directionY = -10;
      break;
    case 40: // 아래
      directionX = 0;
      directionY = 10;
      break;
    default:
      break;
    }
  }

// 게임 진행 함수
function game() {
  positionX += directionX;
  positionY += directionY;

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  makeApple();

  ctx.fillStyle = 'yellow';
  for(let i=0; i<snakeBody.length; i++)
    ctx.fillRect(snakeBody[i].x, snakeBody[i].y, pixelSize, pixelSize);
  
  snakeBody.push({x:positionX, y:positionY});

  if (snakeBody.length > snakeLength)
    snakeBody.shift();

  // 게임 오버  
  if (snakeBody[0].x <= 0 || snakeBody[0].x + pixelSize >= canvas.width || snakeBody[0].y <= 0 || snakeBody[0].y + pixelSize >= canvas.height)
    confirm('☠️Game Over☠️');
  // else if (snakeBody[0].x === snakeBody[snakeBody.length-1].x && snakeBody[0].y === snakeBody[snakeBody.length-1].y)
  //   confirm('☠️Game Over☠️');
}

// 게임을 진행하는 함수
function playGame() {
  setInterval(game, 40);
}

// 게임을 시작하는 함수
function startGame() {
  document.addEventListener("keydown", keyDownHandler, false); 
  const btn = document.getElementById('startBtn');
  btn.addEventListener('click', playGame);
}

startGame();

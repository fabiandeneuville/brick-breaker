const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
const scoreDisplay = document.querySelector('.score');
const colors = ['#F25AB0', '#F53501', '#5D7FFC'];
const ballRadius = 10;
const rodHeight = 10;
const rodWidth = 75;
const colNumber = 8;
const rowNumber = 5;
const brickWidth = 75;
const brickHeight = 20;

let color = colors[Math.floor(Math.random() * colors.length)]
let end = false;
let x = canvas.width/2;
let y = canvas.height - 30;
let rodX = (canvas.width - rodWidth)/2;
let speedX = 5;
let speedY = -5;
let score = 0;

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.closePath();
}

function drawRod(){
    ctx.beginPath();
    ctx.rect(rodX, canvas.height - rodHeight -2, rodWidth, rodHeight );
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.closePath();
}

const bricks = [];
for(let i = 0; i < rowNumber; i++){
    bricks[i] = [];
    for(let j = 0; j < colNumber; j++){
        bricks[i][j] = {x: 0, y: 0, status: 1}
    }
}

function drawBricks(){
    for(let i = 0; i < rowNumber; i++){
        for(let j = 0; j < colNumber; j++){
            if(bricks[i][j].status === 1){
                let brickX = (j * (brickWidth + 10) + 35);
                let brickY = (i * (brickHeight + 10) + 30);
                
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.closePath;
            }
        }
    }
}

function draw(){
    if(end === false){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawRod();
        collisionDetection();

        if(x + speedX > canvas.width - ballRadius || x + speedX < ballRadius){
            speedX = -speedX;
        }

        if(y + speedY < ballRadius){
            speedY = -speedY
        }

        if(y + speedY > canvas.height - ballRadius){

            if(x > rodX && x < rodX + rodWidth){
                speedX = speedX + 0.1;
                speedY = speedY + 0.1;
                speedY = -speedY;
            } else {
                end = true;
                scoreDisplay.innerHTML = `You loose ! <br> Click on screen to retry !`
            }
        }

        x += speedX;
        y += speedY;

        requestAnimationFrame(draw);
    }
}

draw()

function collisionDetection(){
    for(let i = 0; i < rowNumber; i++){
        for(let j = 0; j < colNumber; j++){
            let b = bricks[i][j];
            if(b.status === 1){
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    speedY = -speedY;
                    b.status = 0;

                    score ++;
                    scoreDisplay.innerHTML = `Score : ${score}`;

                    if(score === colNumber * rowNumber){
                        scoreDisplay.innerHTML = `You win ! <br> Click on screen to retry !`;
                        end = true;
                    }
                }
            }
        }
    }
}

document.addEventListener('mousemove', movemouse);

function movemouse(e){
    let posXrod = e.clientX - canvas.offsetLeft;

    if(posXrod > 35 && posXrod < canvas.width - 35){
        rodX = posXrod - rodWidth/2;
    }
}

canvas.addEventListener('click', () => {
    end = false;
    document.location.reload();
})
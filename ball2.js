function drawLine(x0, y0, x1, y1, color, dash, ctx){
    ctx.strokeStyle=color;
    ctx.setLineDash(dash);
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

function drawBall(x, y, radius, color, ctx) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2*Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

function drawPaddle(x, y, color, ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(x-5, y-15, 10, 30);
}

var x = 150, y = 150;
var vx = 4, vy = 3;

var myScore=0;
var otherScore=0;

function draw() {
    var canvas = document.getElementById("room");
    var ctx = canvas.getContext("2d");
    var score = document.getElementById("score");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLine(canvas.width/2, 0, canvas.width/2, canvas.height, "black", [], ctx); 
    x = x + vx;
    y = y + vy;
    
    if (vx > 0) {
        var yt = y+((canvas.width-x)/vx*vy);
        drawLine(x, y, canvas.width, yt, "red", [36, 9, 9, 9], ctx);
    } else
    if (vx < 0){
        var yt = y-((x*vy)/vx);
        drawLine(x, y, 0, yt, "red", [36, 9, 9, 9], ctx);
    }
    
    drawBall(x, y, 7, "red", ctx);

     if ((myPaddleY-15)<=y && (myPaddleY+15)>=y && x<=22){
        vx = -vx;
        x = 22;
    } else
    if ((otherPaddleY-15)<=y && (otherPaddleY+15)>=y && x>=canvas.width-22){
        vx = -vx;
        x = canvas.width-22;
    } else    
    if (x <= 7) {
        vx = -vx;
        otherScore += 1;
        score.textContent = `${myScore}:${otherScore}`;
    } else
    if (x >= canvas.width-7) {
        vx = -vx;
        myScore += 1;
        score.textContent = `${myScore}:${otherScore}`;
    }
    if (y <= 7 || y >= canvas.height-7) {
        vy = -vy;
    }
    var targetY = y+vy*((canvas.width-22-x)/vx);
    if (targetY < otherPaddleY-15){
        otherPaddleY = otherPaddleY - otherPaddleVY;
    }else
    if (targetY > otherPaddleY+15){
        otherPaddleY = otherPaddleY + otherPaddleVY;
    }
    if (otherPaddleY < 20) {
        otherPaddleY = 20;
    } 
    if (otherPaddleY > canvas.height - 20) {
        otherPaddleY = canvas.height-20;
    }
    drawPaddle(10, myPaddleY, 'black', ctx);
    drawPaddle(canvas.width-10, otherPaddleY, 'black', ctx);
    window.requestAnimationFrame(draw);
}

var myPaddleY = 150;
var otherPaddleY = 150;
var otherPaddleVY = 3;

function main() {
    var canvas = document.getElementById("room");
    canvas.addEventListener('mousemove', function(e){
        var canvas = document.getElementById("room");
        var rect = canvas.getBoundingClientRect();
        myPaddleY = e.clientY - rect.top;
        if (myPaddleY < 20) {
            myPaddleY = 20;
        } 
        if (myPaddleY > canvas.height - 20) {
            myPaddleY = canvas.height-20;
        }
    });
    draw();
}
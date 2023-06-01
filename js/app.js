const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

class Particule {
    constructor(x, y, radius, directionX, directionY, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.directionX = directionX;
        this.directionY = directionY;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {

        if(this.x < 0 || this.x + this.radius > window.innerWidth) {
            this.directionX = -this.directionX;
        }
        if(this.y < 0 || this.y + this.radius > window.innerHeight) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}

class Mouse {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "yellow";
        ctx.fill()
    }
}


const bulle = new Particule(50, 50, 20, 1, 1, "white");
function init() {
    
    bulle.draw();
}


function animateParticule() {
    requestAnimationFrame(animateParticule);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bulle.update()
}

init();
animateParticule();


let timeoutVariable;

function resizeWindow() {
    init();
    animateParticule();
}

window.addEventListener('resize', () => {
    window.clearTimeout(timeoutVariable);
    timeoutVariable = setTimeout(resizeWindow, 100);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
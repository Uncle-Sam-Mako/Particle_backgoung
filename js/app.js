const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const particuleArray = [];

class Particule {
    constructor(x, y, radius, directionX, directionY, color, mouseObject){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.directionX = directionX;
        this.directionY = directionY;
        this.color = color;
        this.mouseObject = mouseObject;
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
        if(detectCollision(this, this.mouseObject)) {
            this.directionX = -this.directionX;
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
        ctx.fillStyle = this.color;
        ctx.fill()
    }

    update() {
        document.addEventListener('mousemove', e => {
            this.x = e.clientX;
            this.y = e.clientY;
        })

        this.draw();
    }
}

const mouseObject = new Mouse(100, 100, 25, "rgba(250, 255, 233, 0.2)");
const bulle = new Particule(50, 50, 20, 1, 1, "white", mouseObject);


function init() {
    mouseObject.draw()
    for(let i = 0; i < 150; i++) {
        let radius = (Math.random() + 0.01) * 20;
        let x = Math.random() * (window.innerWidth - (radius * 2))
        let y = Math.random() * (window.innerHeight - (radius * 2));
        let dx = (Math.random() * 2) - 1;
        let dy = (Math.random() * 2) - 1;
        let color = "rgba(250, 255, 233, 0.7)";

        particuleArray.push(new Particule(x, y, radius, dx, dy, color, mouseObject));
    }
}


function animateParticule() {
    requestAnimationFrame(animateParticule);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mouseObject.update()
    
    for(let i = 0; i < particuleArray.length; i++) {
        particuleArray[i].update();
    }
}

init();
animateParticule();


let timeoutVariable;

function resizeWindow() {
    init();
    animateParticule();
}

function detectCollision(circle1, circle2) {
    const distX = circle1.x - circle2.x;
    const distY = circle1.y - circle2.y;
    const pythagore_distance = Math.sqrt((distX * distX) + (distY * distY));

    return (pythagore_distance <= (circle1.radius + circle2.radius));

}


window.addEventListener('resize', () => {
    window.clearTimeout(timeoutVariable);
    timeoutVariable = setTimeout(resizeWindow, 100);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
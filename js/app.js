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
}